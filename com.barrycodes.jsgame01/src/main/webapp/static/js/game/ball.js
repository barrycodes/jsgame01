
function setBallDelta() {
    var quadrant = -1;
    var angle = ballAngle;
    if (angle >= 0) {
        if (angle <= 90)
            quadrant = 0;
        else if (angle <= 180)
            quadrant = 1;
        else if (angle <= 270)
            quadrant = 2;
        else if (angle <= 360)
            quadrant = 3;
    }
    if (quadrant >= 0)
        angle -= (quadrant * 90);
    if (angle == 0) {
        ballDeltaX = ballDistancePerFrame;
        ballDeltaY = 0;
    }
    else if (angle == 90) {
        ballDeltaX = 0;
        ballDeltaY = ballDistancePerFrame;
    }
    else {
        // ... sin angle = opposite / hypotenuse
        // ... cos angle = adjacent / hypotenuse
        // ... tan angle = opposite / adjacent
        var radians = angle * (Math.PI/180);
        console.log(quadrant);
        console.log(angle);
        console.log(radians);
        ballDeltaY = Math.sin(radians) * ballDistancePerFrame;
        ballDeltaX = Math.cos(radians) * ballDistancePerFrame;
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
        ballDeltaY = -temp;
    }
    console.log(ballAngle);
    console.log(ballDeltaX);
    console.log(ballDeltaY);
}

function moveBall() {
    if (ballY > -50) {
        ballX += ballDeltaX;
        ballY += ballDeltaY;
        ball.css("left", "" + ballX + "em");
        ball.css("bottom", "" + ballY + "em");
    }
    else stopBallMoving();
}

function startBallMoving() {
    stopBallMoving();
    setBallDelta();
    ballTimer = setInterval(moveBall, frameDelay);
}

function stopBallMoving() {
    clearInterval(ballTimer);
}

