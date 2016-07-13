

$(function() {
    initialize();
});

function initialize() {
    game = $("#jsgame");
//    game.html("");
    ball = $("#ball");
    slider = $("#slider");
    showLives();
    readyAnimation(true, levelBlocks1);
}

function getPxNum(str) {
    return +str.substr(0, str.length - 2);
}

function setupLevel(level) {
    levelBlocks = [];
    blockCount = 0;
    for (var i = 0; i < level.length; ++i) {
        var row = [];
        var rowBlocks = level[i];
        for (var j = 0; j < rowBlocks.length; ++j) {
            var newBlock = $("<div class='block'></div>");
            newBlock.css("background-color", rowBlocks[j]);
            newBlock.css("position", "absolute");
            newBlock.css("left", 36 + j * 80);
            newBlock.css("top", 36 + i * 30);
            newBlock.css("width", 76);
            newBlock.css("height", 26);
            game.append(newBlock);
            var blockObj =
                new block(
                    getPxNum(newBlock.css("left")),
                    getPxNum(newBlock.css("top")) - sliderHeight,
                    getPxNum(newBlock.css("left")) + getPxNum(newBlock.css("width")),
                    getPxNum(newBlock.css("top")) + getPxNum(newBlock.css("height")) - sliderHeight,
                    newBlock);
//            console.log(blockObj);
            row.push(blockObj);
            ++blockCount;
        }
        levelBlocks.push(row);
    }
}

function showLives() {
    $("#livesCount").html(lives);
}

function showScore() {
    $("#scoreCount").html(score);
}

function setupHandlers() {
    $(document).keydown(function(event) {
        switch (event.which) {
            case keyEscape:
                console.log("ESC " + active);
                if (active) {
                    stopSlider();
                    stopBallMoving();
                    active = false;
                }
                else {
                    active = true;
                    startBallMoving();
                }
                break;
            case keyLeft:
                if (active && !movingLeft)
                    startMovingLeft();
                break;
            case keyRight:
                console.log("RIGHT " + active);
                if (active && !movingRight)
                    startMovingRight();
                break;
        }
    });
    $(document).keyup(function(event) {
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
    });
}

function resetAnimation(level) {

    showLives();
    active = false;

    $("#ready").show();
    stopSlider();
    if (lives < 0) {
        $("#ready").html(":(");
        $("#ready").show();
        finishGame();
    }
    else {
        initializePositions();
        initializeSlider();
        readyAnimation(false, level);
    }
}

function finishGame() {
    alert("finish");
    $.ajax({
        url: "/storescore/" + score,
        method: "post",
    }).done(function() {
        alert("done");
        setTimeout(function() {
            location.reload();
        }, 5000);
    });
}

function readyAnimation(initial, level) {
    $("#ready").fadeOut(readyDelay, function() {
        $("#go").css('visibility', 'visible');
        setTimeout(function() {
//            $("#go,#ready").remove();
            $("#go").css('visibility', 'hidden');
            initializePositions();
            setBallPosition(ballX, ballY);
            ball.css("display", "block");
            ball.css("visibility", "visible");
            if (initial)
                setupHandlers();
            if (level != null)
                setupLevel(level);
            active = true;

            startBallMoving();

        }, goDelay);
    });
}

function initializePositions() {
    sliderHeight = +slider.height();
//    console.log("SH " + sliderHeight);
    sliderWidth = +slider.width();

    if (sliderInitialX == 0)
        sliderInitialX = +slider.position().left;
    sliderX = sliderInitialX;
    sliderY = +slider.position().top;
    topWall = 0;
    topWall -= +sliderHeight;
    bottomWall = +topWall + +game.height();
    leftWall = 0;
    rightWall = leftWall + +game.width();
    ballX = leftWall + ballInitialX;
    ballY = topWall + ballInitialY;
    ballWidth = +ball.width();
    ballHeight = +ball.height();
    ballRadius = ballWidth / 2;
    minSliderPosition = leftWall;
    maxSliderPosition = +rightWall - +sliderWidth;
    ballAngle = ballInitialAngle;
    initializeBall();
//    console.log(sliderHeight);
//    console.log(topWall);
//    console.log(bottomWall);
//    console.log(leftWall);
//    console.log(rightWall);
//    console.log(ballX);
//    console.log(ballY);
//    console.log(ballWidth);
//    console.log(ballHeight);
//    console.log(ballRadius);
//    console.log(minSliderPosition);
//    console.log(maxSliderPosition);
//    topWall = game.css("top");
//    sliderHeight = slider.css("height");
//    console.log(sliderHeight);
//    console.log(topWall);
}