// Don't pollute global scope. Here we have only one variable (quiz) in global scope
var quiz = quiz || {};

quiz.app = (function($, window, undefined) {
  // better to use array for questions variable instead of indexed object
  var questions = [
    {
      "question": "The main character of the movie, Po, is voiced by which actor?",
      "answers": ["Channing Tatum", "Jack Black", "Tom Cruise", "Kyle Gass"],
      "correct": 1
    },
    {
      "question": "What is the name of Po's father?",
      "answers": ["Mr. Ping", "Mr. Chen", "Mr. Panda", "Mr. Chang"],
      "correct": 0
    },
    {
      "question": "What is the secret ingredient in the Secret Ingredient Soup?",
      "answers": ["Tofu", "Green Onions", "Special Soy Sauce", "Nothing"],
      "correct": 3
    },
    {
      "question": "Who is not part of the Furious Five?",
      "answers": ["Tigress", "Shifu", "Mantis", "Viper"],
      "correct": 1
    },
    {
      "question": "What type of animal is Master Shifu?",
      "answers": ["Flying Squirrel", "Red Panda", "Raccoon", "Polar Bear"],
      "correct": 1
    }
  ];
  var questionCount = 0;
  var answersCorrect = 0;

  // functions
  var init,
      assignClickHandlers,
      answersContentListItemClickHandler,
      quizButtonClickHandler,
      nextQuestion;

  // cached DOM variables
  var $answersContent,
      $answersContentListItem,
      $quizButton,
      $questionContent,
      $scoreHeader,
      $scoreFinal;

  // On Dom ready -- see
  init = function() {
    cacheDomVariables();
    assignClickHandlers();
  };

  cacheDomVariables = function() {
    $answersContent = $(".answers-content");
    $answersContentListItem = $(".answers-content li");
    $quizButton = $(".quiz-btn");
    $answersFeedback = $(".answers-feedback");
    $questionContent = $(".question-content");
    $scoreHeader = $(".score-header");
    $scoreFinal =  $(".score-final");
  };

  assignClickHandlers = function() {
    $answersContentListItem.on("click", answersContentListItemClickHandler);
    $quizButton.on("click", quizButtonClickHandler);
  };

  answersContentListItemClickHandler = function() {
    $answersContent.addClass("active");
    $answersContentListItem.removeClass("selected");
    $(this).addClass("selected");
  };

  quizButtonClickHandler = function() {
    var selected = $(".selected").text();
    var correct = questions[questionCount].answers[questions[questionCount].correct];
    var feedback = $answersFeedback;
    var button = $quizButton;
    var quizLength = questions.length;

    if (button.text() == "Finish Quiz") {
      $questionContent.css("visibility", "hidden");
      $answersFeedback.text("Your Score");
      $answersContent.remove();
      $scoreHeader.show();
      $scoreFinal.text(answersCorrect + " / " + quizLength).show();
      button.text("Play Again");
      return
    }

    if (button.text() == "Play Again") {
      location.reload();
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
  };

  nextQuestion = function() {
    var q = "<strong>Question</strong>: ";

    $questionContent.html(q + questions[questionCount]["question"]);
    $answersContent.children().each(function(i, li) {
      var checkIconHtml = '<i class="fa fa-check"></i>';
      $(this).html(questions[questionCount]["answers"][i] + checkIconHtml);
    });
    $answersContent.removeClass("active");
    $answersFeedback.text("Select an answer from below");
  }

  return {
      init: init
  };

}(jQuery, window));


// Dom ready
$(function() {
    quiz.app.init();
});
