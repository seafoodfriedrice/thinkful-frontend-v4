$(document).ready(function() {
  quiz = {
    "1": {
      "question": "The main character of the movie, Po, is voiced by which actor?",
      "answers": ["Channing Tatum", "Jack Black", "Tom Cruise", "Kyle Gass"],
      "correct": "Jack Black"
    },
    "2": {
      "question": "What is the name of Po's father?",
      "answers": ["Mr. Ping", "Mr. Chen", "Mr. Panda", "Mr. Chang"],
      "correct": "Mr. Ping"
    },
    "3": {
      "question": "What is the secret ingredient in the Secret Ingredient Soup?",
      "answers": ["Tofu", "Green Onions", "Special Soy Sauce", "Nothing"],
      "correct": "Nothing"
    },
    "4": {
      "question": "Who is not part of the Furious Five?",
      "answers": ["Tigress", "Shifu", "Mantis", "Viper"],
      "correct": "Shifu"
    },
    "5": {
      "question": "What type of animal is Master Shifu?",
      "answers": ["Flying Squirrel", "Red Panda", "Raccoon", "Polar Bear"],
      "correct": "Red Panda"
    }
  }

  var q = "<strong>Question</strong>: ";
  $(".question-content").html(q + quiz[2]["question"]);
  var checkIconHtml = '<i class="fa fa-check"></i>';
  $("ul").children().each(function(i, li) {
    $(this).html(quiz[2]["answers"][i] + checkIconHtml);
  });


  $(".answers-content li").click(function() {
    $(".answers-content").addClass("active");
    $("li").removeClass("selected");
    $(this).addClass("selected");
    var answer = $(this).text();
  });
});
