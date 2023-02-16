var buttonColors = ['red', 'blue', 'green', 'yellow'];
var userClickPattern = [];
var gamePattern = [];

var level  = 0 ;

$('.btn').on('click',function(event){
    var userChosenColor =  event.target.id;
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length-1);
    // var userChosenColor = $(this).attr("id")

})



var gameStart = false;

$(document).on('keydown',function(){
    if(!gameStart){
        nextSequence();
        $('#level-title').text(`Level ${level}`);
        gameStart = true;
    }
});

function nextSequence(){
    userClickPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#'+randomChosenColor).fadeIn(50).fadeOut(50).fadeIn(50);
        playSound(randomChosenColor);
        animatePress(randomChosenColor);
        // $("#" + randomChosenColor).click(
        //     function(){
        //         makeSound(randomChosenColor);
        //     }
        // );
        
        // playSound();
        level++;
        $('#level-title').text(`Level ${level}`);

}




function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();

}

function animatePress(currentColor){
        $("#"+currentColor).addClass('pressed');
        setTimeout(function(){
            $("#"+currentColor).removeClass('pressed');
        },200)

}

function checkAnswer(currentLevel){
    if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            },1000)
    }
    }else{
        playSound('wrong');
        $('#level-title').text("Game Over, Press Any key to Restart");
        $('body').addClass("game-over");
        setTimeout(function(){
            $('body').removeClass("game-over");
        },200);
        startOver();
    }
};

function startOver(){
    level = 0;
    gamePattern = [];
    gameStart = false;
}


