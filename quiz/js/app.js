$(document).ready(function() {
  $(".answers-content li").click(function() {
    $(".answers-content").addClass("active");
    $("li").removeClass("selected");
    $(this).addClass("selected");
  });
});
