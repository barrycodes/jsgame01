

$(function() {
    initialize();
});

function initialize() {
    game = $("#jsgame");
//    game.html("");
    ball = $("#ball");
    slider = $("#slider");
    readyAnimation();
}

function setupHandlers() {
    $(document).keydown(function(event) {
        if (active) {
            //console.log(event.which);
            switch (event.which) {
                case keyEscape:
                    stopSlider();
                    stopBallMoving();
                    active = false;
                    break;
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

function readyAnimation() {
    $("#ready").fadeOut(readyDelay, function() {
        $("#go").css('visibility', 'visible');
        setTimeout(function() {
            $("#go,#ready").remove();
            setBallPosition(ballX, ballY);
            ball.css("display", "block");
            active = true;
            setupHandlers();

            startBallMoving();

        }, goDelay);
    });
}
