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
    row = logTransaction();
    $(row).hide().fadeIn(1000);
    $(".transactions").append(row);
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

  $('.chart-line').highcharts({
    title: {
      text: 'Monthly Average Temperature',
      x: -20 //center
    },
    subtitle: {
      text: 'Source: WorldClimate.com',
      x: -20
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      valueSuffix: '°C'
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    series: [{
      name: 'Tokyo',
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
      name: 'New York',
      data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
    }, {
      name: 'Berlin',
      data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
    }, {
      name: 'London',
      data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
  });

});
