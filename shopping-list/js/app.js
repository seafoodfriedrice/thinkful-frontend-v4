$(document).ready(function() {

  $(document).on("click", "span", function() {
    $(this).toggleClass("item-checked");
    $(this).parent().find(".fa-check").toggleClass("check-hidden");
  });

  $(document).on("mouseenter", ".item", function() {
    if ($(this).hasClass("item-checked")) {
      $(this).parent().find(".fa-check").css("color", "#efddb2");
    } else {
      $(this).parent().find(".fa-check").css("color", "#288fb4");
    }
  });
  
  $(document).on("mouseleave", ".item", function() {
    if ($(this).hasClass("item-checked")) {
      $(this).parent().find(".fa-check").css("color", "#288fb4");
    } else {
      $(this).parent().find(".fa-check").css("color", "#fff");
    }
  });

  $(document).on("click", ".close", function() {
    $(this).parent().fadeOut(400, function() {
      $(this).remove();
    });
  });

  function addItem() {
    var item = '<li><i class="fa fa-check check-hidden"></i>' +
        '<span class="item">' + $(".input-box").val() + '</span>' +
        '<i class="fa fa-close close"></i></li>';
    item = $(item).hide().fadeIn(400);
    $("#items").append(item);
    $(".input-box").val("");
  }

  $(".input-plus").click(function() {
    if ($(".input-box").val().length >= 2) {
      addItem();
    }
  });
  $(".input-box").keydown(function(e) {
    if (e.which == 13 && $(this).val().length >= 2) {
      addItem();
    }
  });

});
