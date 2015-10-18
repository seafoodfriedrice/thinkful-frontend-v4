function getExchangeRate() {
  var endpoint = "https://api.bitcoinaverage.com/all";
  var exchangeRates = $.ajax({
    url: endpoint,
    dataType: "json",
    type: "GET",
  })
  .success(function(exchangeRates){
    var usdRate = exchangeRates.USD.averages["24h_avg"];
    $(".info-exchange-loading").hide();
    $(".info-exchange-rate").fadeIn(1000);
    $(".info-exchange-usd").text(usdRate);

    // Update usd funds remaining when exchange rate is refreshed
    var usdFundsRemain = ($(".info-amount-btc").text() *
      $(".info-exchange-usd").text()).toFixed(2);
    $(".info-amount-usd").hide().fadeIn(1000).text(usdFundsRemain);
  })
  .fail(function(jqXHR, error, errorThrown){
    alert(error);
  });
}

$(document).ready(function() {
  getExchangeRate();

  function logTransaction() {
    var row = $('.templates .transaction-row').clone();

    var fields = ["date", "description", "usd", "btc"];
    $.each(fields, function(index, field) {
      row.find('.transaction-' + field).text($(".log-" + field).val());
    });

    // Update btc and usd funds remaining when transaction is logged
    $.each(["btc", "usd"], function(index, cur) {
      var fundsRemaining = $('.info-amount-' + cur).text();
      var fundsSpent = $('.log-' + cur).val();
      var fundsDifference = fundsRemaining - fundsSpent;
      if ($(this) === "btc") {
        var toFixedNum = 8;
      } else {
        var toFixedNum = 2;
      }
      $('.info-amount-' + cur).hide().fadeIn(1000);
      $('.info-amount-' + cur).text(fundsDifference.toFixed(toFixedNum));
    });

    $.each($(".log-input"), function(index, value) {
      $(value).val("");
    });

    return row;
  }

  $("form").on("submit", function(event) {
    // Add values from log transaction to
    // transaction history table
    row = logTransaction();
    $(row).hide().fadeIn(1000);
    $(".transactions").append(row);

    // Add plot point to chart
    btcSpent = parseFloat($(".transactions .transaction-btc").last().text());
    btcDate = $(".transactions .transaction-date").last().text();
    updateChart($('.chart-line').highcharts(), btcDate, btcSpent);

    event.preventDefault();
  });

  // Refresh exchange rate on click()
  $(".info-exchange-refresh").click(function() {
    $(".info-exchange-rate").hide();
    $(".info-exchange-loading").show();
    getExchangeRate();
  });

  // Update other currency amount when input changes
  $(".log-usd, .log-btc").on("input", function() {
    var exchangeRate = $(".info-exchange-usd").text();
    if ($(this).attr('class').indexOf("log-btc") !== -1) {
      var exchangeValue = exchangeRate * $(this).val();
      var otherField = $(".log-usd");
      var toFixedNum = 2;
    } else {
      var exchangeValue = $(this).val() / exchangeRate;
      var otherField = $(".log-btc");
      var toFixedNum = 5;
    }
    otherField.val(exchangeValue.toFixed(toFixedNum));
  });

  fundsRemaining = parseFloat($('.info-amount-btc').text());
  //var chart = $('.chart-line').highcharts();
  $('.chart-line').highcharts({
    chart: {
      spacingTop: 38,
      spacingBottom:32,
      spacingLeft: 32,
      spacingRight: 48
    },
    title: {
      text: 'Bitcoins Remaining Over Time',
      x: 20,
      y: 4
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
      name: 'Funds Remaining',
      data: [fundsRemaining],
      color: '#c24d2c'
    }]
  });

  function updateChart(chart, xBtcDate, yBtcSpent) {
    plotPoints = chart.series[0].yData;
    lastAmount = plotPoints[plotPoints.length - 1];
    btcRemaining = lastAmount - yBtcSpent;
    chart.series[0].addPoint([xBtcDate, parseFloat(btcRemaining.toFixed(5))]);
  }

});
