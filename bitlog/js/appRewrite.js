var bitlog = bitlog || {};

bitlog.app = (function($, window, document) {

  // Functions
  var init,
      addTransactionRowSubmitHandler,
      loadExchangeRateClickHandler,
      currencyInputHandler;

  // Cached DOM variables
  var $exchangeRateLoader,
      $exchangeRate,
      $exchangeRateUsd,
      $exchangeRateRefreshButton,
      $fundsAmountBtc,
      $fundsAmountUsd,
      $form,
      $logInputAll,
      $logInputBtc,
      $logInputUsd,
      $templateTransactionRow,
      $transactionsTable,
      $transactionTableBtc,
      $transactionTableDate,
      $bitcoinChart;

  init = function() {
    cacheDomVariables();
    assignEventHandlers();
    getExchangeRate();
    displayChart();
  };

  cacheDomVariables = function() {
    $exchangeRateLoader = $(".info-exchange-loading");
    $exchangeRate = $(".info-exchange-rate");
    $exchangeRateUsd = $(".info-exchange-usd");
    $exchangeRateRefreshButton = $(".info-exchange-refresh");
    $fundsAmountBtc = $(".info-amount-btc");
    $fundsAmountUsd = $(".info-amount-usd");
    $form = $("form");
    $logInputAll = $(".log-input");
    $logInputBtc = $(".log-btc");
    $logInputUsd = $(".log-usd");
    $templateTransactionRow = $(".templates .transaction-row");
    $transactionsTable = $(".transactions");
    $chart = $(".chart-line");
  };

  assignEventHandlers = function() {
    $form.on("submit", addTransactionRowSubmitHandler);
    $exchangeRateRefreshButton.on("click", loadExchangeRateClickHandler);
    $logInputBtc.add($logInputUsd).on("input", currencyInputHandler);

  };

  getExchangeRate = function() {
    var endpoint = "https://api.bitcoinaverage.com/all";
    var exchangeRates = $.ajax({
      url: endpoint,
      dataType: "json",
      type: "GET",
    })
    .success(function(exchangeRates){
      var usdRate = exchangeRates.USD.averages["24h_avg"];
      $exchangeRateLoader.hide();
      $exchangeRate.fadeIn(1000);
      $exchangeRateUsd.text(usdRate);

      // Update usd funds remaining when
      // exchange rate is refreshed
      var usdFundsRemain = $fundsAmountBtc.text() * $exchangeRateUsd.text()
      $fundsAmountUsd.hide().fadeIn(1000).text(usdFundsRemain.toFixed(2));
    })
    .fail(function(jqXHR, error, errorThrown){
      alert(error);
    });
  }


  getTransactionRow = function() {
    var row = $templateTransactionRow.clone();

    var fields = ["date", "description", "usd", "btc"];
    $.each(fields, function(index, field) {
      row.find('.transaction-' + field).text($(".log-" + field).val());
    });

    // Update btc and usd funds remaining
    // when transaction is logged
    $.each(["btc", "usd"], function(index, cur) {
      var fundsRemaining = $('.info-amount-' + cur).text();
      var fundsSpent = $('.log-' + cur).val();
      var fundsDifference = fundsRemaining - fundsSpent;
      if ($(this) === "btc") {
        var toFixedNum = 8;
      } else {
        var toFixedNum = 2;
      }
      fundsDifference = fundsDifference.toFixed(toFixedNum);
      $('.info-amount-' + cur).hide().fadeIn(1000).text(fundsDifference);
    });

    $logInputAll.val("");

    return row;
  };

  updateChart = function(xBtcDate, yBtcSpent) {
    var chart = $chart.highcharts();
    var plotPoints = chart.series[0].yData;
    var lastAmount = plotPoints[plotPoints.length - 1];
    var btcRemaining = lastAmount - yBtcSpent;
    chart.series[0].addPoint([xBtcDate, parseFloat(btcRemaining.toFixed(5))]);
  };


  addTransactionRowSubmitHandler = function() {
    // Add values from log transaction
    // to transaction history table
    var row = getTransactionRow();
    $(row).hide().fadeIn(1000);
    $transactionsTable.append(row);

    // Add plot point to chart
    var $transactionTableBtc = $(".transactions .transaction-btc");
    var $transactionTableDate = $(".transactions .transaction-date");
    var btcSpent = parseFloat($transactionTableBtc.last().text());
    var btcDate = $transactionTableDate.last().text();
    updateChart(btcDate, btcSpent);

    event.preventDefault();
  };

  // Reload exchange rate
  loadExchangeRateClickHandler = function() {
    $exchangeRate.hide();
    $exchangeRateLoader.show();
    getExchangeRate();
  };

  // Update other currency amount when input changes
  currencyInputHandler = function() {
    var exchangeRate = $exchangeRateUsd.text();
    if ($(this).attr('class').indexOf("log-btc") !== -1) {
      var exchangeValue = exchangeRate * $(this).val();
      var otherField = $logInputUsd;
      var toFixedNum = 2;
    } else {
      var exchangeValue = $(this).val() / exchangeRate;
      var otherField = $logInputBtc;
      var toFixedNum = 5;
    }
    otherField.val(exchangeValue.toFixed(toFixedNum));
  };

  displayChart = function() {
    var btcRemaining = $fundsAmountBtc.text();
    $chart.highcharts({
      chart: {
        spacingTop: 38,
        spacingBottom:32,
        spacingLeft: 32,
        spacingRight: 48,
        style: {
          fontFamily: 'Roboto'
        }
      },
      title: {
        text: 'BITCOINS REMAINING OVER TIME',
        x: 20,
        y: 4,
        style: {
          color: '#c24d2c'
        }
      },
      legend: {
        itemStyle: {
          color: '#3e4a61',
          fontWeight: "100"
        }
      },
      xAxis: {
        categories: ['Today']
      },
      yAxis: {
        title: {
          text: 'Amount'
        },
        plotLines: [{
          value: 0,
          width: 1
        }]
      },
      tooltip: {
        valueSuffix: ' BTC'
      },
      series: [{
        name: 'Bitcoins Remaining',
        data: [parseFloat(btcRemaining)],
        color: '#c24d2c'
      }]
    });
  };

  return {
    init: init
  };

}(jQuery, window, document));

$(document).ready(function() {
  bitlog.app.init();
});
