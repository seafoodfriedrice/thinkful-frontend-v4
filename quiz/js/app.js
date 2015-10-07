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

  var questionCount = 1;

  var q = "<strong>Question</strong>: ";
  function nextQuestion() {
    $(".question-content").html(q + quiz[questionCount]["question"]);
    $("ul").children().each(function(i, li) {
      var checkIconHtml = '<i class="fa fa-check"></i>';
      $(this).html(quiz[questionCount]["answers"][i] + checkIconHtml);
    });
    $("ul").removeClass("active");
    if (questionCount == Object.keys(quiz).length) {
      alert("End of quiz");
    }
  }

  $(".answers-content li").click(function() {
    $(".answers-content").addClass("active");
    $("li").removeClass("selected");
    $(this).addClass("selected");
    var answer = $(this).text();
  });

  $(document).on("click", ".submit-answer", function() {
    var selected = $(".selected").text();
    var correct = quiz[questionCount]["correct"];
    var feedback = $(".answers-feedback");
    if (selected == correct) {
      feedback.text("That is correct!");
    } else {
      feedback.text("Sorry. The correct answer is " + correct + ".");
    }
    questionCount++;
    nextQuestion();
  });

});
