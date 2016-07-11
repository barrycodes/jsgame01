var game;
var slider;
var sliderTimer;
var keyLeft = 37;
var keyRight = 39;
var keyEscape = 13;
var active = false;
var movingRight = false;
var movingLeft = false;
var sliderPosition = 20.6;
var minSliderPosition = 2;
var maxSliderPosition = 39.2;
var frameDelay = 10;
var sliderDistancePerFrame = 0.4;
var readyDelay = 2000;
var goDelay = 350;
var ball;
var ballDistancePerFrame = 0.1;
var ballTimer;
var ballX = 19;
var ballY = -20;
var ballAngle = 315;
var ballDeltaX;
var ballDeltaY;


$(function() {
    initialize();
});

function setupHandlers() {
    $(document).keydown(function(event) {
        if (active) {
            switch (event.which) {
                case keyEscape:
                    stopSlider();
                    active = false;
                case keyLeft:
                    if (!movingLeft)
                        startMovingLeft();
                    break;
                case keyRight:
                    if (!movingRight)
                        startMovingRight();
                    break;
            }
        }
    });
    $(document).keyup(function(event) {
        if (active) {
            switch (event.which) {
                case keyLeft:
                    if (movingLeft)
                        stopSlider();
                    break;
                case keyRight:
                    if (movingRight)
                        stopSlider();
                    break;
            }
        }
    });
}

function initialize() {
    game = $("#jsgame");
    game.html("<div id='ready'>READY</div><div id='go'>GO!</div><div id='slider'></div><div id='ball'></div>");
    ball = $("#ball");
    slider = $("#slider");
    readyAnimation();
}

function readyAnimation() {
    $("#ready").fadeOut(readyDelay, function() {
        $("#go").css('visibility', 'visible');
        setTimeout(function() {
            $("#go,#ready").remove();
            ball.css("display", "block");
            active = true;
            setupHandlers();
            startBallMoving();
        }, goDelay);
    });
}

function setBallDelta() {
    var quadrant = -1;
    if (ballAngle >= 0) {
        if (ballAngle <= 90)
            quadrant = 0;
        else if (ballAngle <= 180)
            quadrant = 1;
        else if (ballAngle <= 270)
            quadrant = 2;
        else if (ballAngle <= 360)
            quadrant = 3;
    }
    if (quadrant >= 0)
        ballAngle -= (quadrant * 90);
    if (ballAngle == 0) {
        ballDeltaX = ballDistancePerFrame;
        ballDeltaY = 0;
    }
    else if (ballAngle == 90) {
        ballDeltaX = 0;
        ballDeltaY = ballDistancePerFrame;
    }
    else {
        // ... sin angle = opposite / hypotenuse
        // ... cos angle = opposite
    }
    if (quadrant == 1) {
        var temp = ballDeltaX;
        ballDeltaX = -ballDeltaY;
        ballDeltaY = temp;
    }
    else if (quadrant == 2) {
        ballDeltaX = -ballDeltaX;
        ballDeltaY = -ballDeltaY;
    }
    else if (quadrant == 3) {
        var temp = ballDeltaX;
        ballDeltaX = ballDeltaY;
        ballDeltaY = -ballDeltaX;
    }
}

function moveBall() {
    if (ballY > -50) {
        ballX += ballDistancePerFrame;
        ballY -= ballDistancePerFrame;
        ball.css("left", "" + ballX + "em");
        ball.css("bottom", "" + ballY + "em");
    }
    else stopBallMoving();
}

function startBallMoving() {
    stopBallMoving();
    ballTimer = setInterval(moveBall, frameDelay);
}

function stopBallMoving() {
    clearInterval(ballTimer);
}

function moveSliderLeft() {
    if (sliderPosition > (minSliderPosition + sliderDistancePerFrame))
        sliderPosition -= sliderDistancePerFrame;
    else
        sliderPosition = minSliderPosition;
    slider.css('left', "" + sliderPosition + "em");
}

function moveSliderRight() {
    if (sliderPosition < (maxSliderPosition - sliderDistancePerFrame))
        sliderPosition += sliderDistancePerFrame;
    else
        sliderPosition = maxSliderPosition;
    slider.css('left', "" + sliderPosition + "em");
}

function startMovingRight() {
    stopSlider();
    movingRight = true;
    sliderTimer = setInterval(moveSliderRight, frameDelay);
}

function startMovingLeft() {
    stopSlider();
    movingLeft = true;
    sliderTimer = setInterval(moveSliderLeft, frameDelay);
}

function stopSlider() {
    clearInterval(sliderTimer);
    movingLeft = false;
    movingRight = false;
}