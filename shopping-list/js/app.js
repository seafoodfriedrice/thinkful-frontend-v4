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

});
