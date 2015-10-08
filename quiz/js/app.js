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
  var answersCorrect = 0;

  var q = "<strong>Question</strong>: ";
  function nextQuestion() {
    $(".question-content").html(q + quiz[questionCount]["question"]);
    $("ul").children().each(function(i, li) {
      var checkIconHtml = '<i class="fa fa-check"></i>';
      $(this).html(quiz[questionCount]["answers"][i] + checkIconHtml);
    });
    $("ul").removeClass("active");
    $(".answers-feedback").text("Select an answer from below");
  }

  $(".answers-content li").click(function() {
    $(".answers-content").addClass("active");
    $("li").removeClass("selected");
    $(this).addClass("selected");
  });

  $(document).on("click", ".quiz-btn", function() {
    var selected = $(".selected").text();
    var correct = quiz[questionCount]["correct"];
    var feedback = $(".answers-feedback");
    var button = $(".quiz-btn");
    var quizLength = Object.keys(quiz).length;

    if (button.text() == "Finish Quiz") {
      $(".question-content").css("visibility", "hidden");
      $(".answers-feedback").text("Your Score");
      $(".answers-content").remove();
      $(".score-header").show();
      $(".score-final").text(answersCorrect + " / " + quizLength).show();
      button.text("Play Again");
      return
    }

    if (selected == correct) {
      feedback.text("That is correct!");
      if ($(this).text() == "Submit Answer") {
        answersCorrect++;
      }
    } else {
      feedback.text("Sorry. The correct answer is " + correct + ".");
    }

    if (button.hasClass("quiz-next")) {
      questionCount++;
      nextQuestion();
      button.text("Submit Answer");
    } else if (questionCount == quizLength) {
      button.text("Finish Quiz");
    } else {
      button.text("Next Question");
    }

    button.toggleClass("quiz-next");
  });

});
