$(document).ready(function() {

  $("span").on("click", function() {
    $(this).toggleClass("item-checked");
    $(this).parent().find(".fa-check").toggleClass("check-hidden");
  });

  $(".item").hover(function() {
    if ($(this).hasClass("item-checked")) {
      $(this).parent().find(".fa-check").css("color", "#efddb2");
    } else {
      $(this).parent().find(".fa-check").css("color", "#288fb4");
    }
  }, function() {
    if ($(this).hasClass("item-checked")) {
      $(this).parent().find(".fa-check").css("color", "#288fb4");
    } else {
      $(this).parent().find(".fa-check").css("color", "#fff");
    }
  });

  $(".close").on("click", function() {
    $(this).parent().fadeOut(400, function() {
      $(this).remove();
    });
  });

  function addItem() {
    var item = '<li><i class="fa fa-check check-hidden"></i>' +
        '<span class="item">' + $(".input-item").val() + '</span>' +
        '<i class="fa fa-close close"></i></li>';
    $("#items").append(item);
    $(".input-item").val("");
  }

  $(".input-item").keydown(function(e) {
    if (e.which == 13 && $(this).val().length >= 2) {
      addItem();
    }
  });


});
