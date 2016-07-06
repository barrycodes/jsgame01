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
    game.html("<div id='ready'>READY</div><div id='go'>GO!</div><div id='slider'></div>");
    slider = $("#slider");
    readyAnimation();
}

function readyAnimation() {
    $("#ready").fadeOut(readyDelay, function() {
        $("#go").css('visibility', 'visible');
        setTimeout(function() {
            $("#go,#ready").remove();
            active = true;
            setupHandlers();
        }, goDelay);
    });
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