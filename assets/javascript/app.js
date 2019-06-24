var questionNumber = 0;
var lastquestionNumber = 14;
var questionData = null;
var intervalID = null;
var correctAnswerCount = 0;
var incorrectAnswerCount = 0;
var unansweredCount = 0;
var questionTimeoutDuration = 2000;

function showQuestion()
{
    clearInterval(intervalID);
    
    if (questionNumber > lastquestionNumber)
    {
        setTimeout(function()
        {
            $("#correct").text(correctAnswerCount);
            $("#incorrect").text(incorrectAnswerCount);
            $("#unanswered").text(unansweredCount);
            $("#gameScreen").addClass("d-none");
            $("#resultScreen").removeClass("d-none");
        }, questionTimeoutDuration);
    }
    else
    {
        for(var i=0; i<4; i++)
        {
            $("#a" + i).removeClass("btn-success btn-danger text-white");
            $("#a" + i).addClass("text-info");
        }
        questionData = data[questionNumber];
        questionData["correctAnswerPos"] = Math.floor(Math.random() * 4);

        var question = questionData["question"];
        var category = questionData["category"];
        var wrongAnswers = questionData["incorrect_answers"];
        var correctAnswerPos = questionData["correctAnswerPos"];
        var correctAnswer = questionData["correct_answer"];

        $("#category").html(category);
        $("#question").html(question);
        $("#questionNumber").html(questionNumber + 1);

        var j=0;
        for (i=0; i<4; i++)
        {
            if (i==correctAnswerPos)
                $("#a" + correctAnswerPos).html(correctAnswer);
            else 
            {
                $("#a" + (i)).html(wrongAnswers[j]);
                j++;
            }
        }
        var timeoutDuration = 30;
        $("#timer").text("30");
        $("#timer").css("display", "");
        intervalID = setInterval(function() {
            if (timeoutDuration--)
                $("#timer").text(timeoutDuration);
            else
            {
                $("#a" + questionData.correctAnswerPos).toggleClass("text-info btn-success text-white");
                $("#timer").text("0");
                unansweredCount++;
                clearInterval(intervalID);
                setTimeout(showQuestion, questionTimeoutDuration);
            }
        }, 1000);

        questionNumber++;
    }
}

$("#startBtn").click(function()
{
    $("#startScreen").addClass("d-none");
    $("#gameScreen").removeClass("d-none");
    showQuestion();
});

$("#startOverBtn").click(function()
{
    $("#resultScreen").addClass("d-none");
    $("#gameScreen").removeClass("d-none");

    questionNumber = 0;
    lastquestionNumber = 14;
    questionData = null;
    intervalID = null;
    correctAnswerCount = 0;
    incorrectAnswerCount = 0;
    unansweredCount = 0;

    showQuestion();
});

$(".answerBtn").click(function()
{
    clearInterval(intervalID);
    $("#timer").css("display", "none");
    $answer = $(event.target);

console.log($answer.html());
console.log(questionData.correct_answer);
    if ($answer.html() === questionData.correct_answer)
    {
        correctAnswerCount++;
        $answer.toggleClass("text-info btn-success text-white");
    }
    else 
    {
        incorrectAnswerCount++;
        $answer.toggleClass("text-info btn-danger text-white");
        $("#a" + questionData.correctAnswerPos).toggleClass("text-info btn-success text-white");
    }
    setTimeout(showQuestion, questionTimeoutDuration);
});