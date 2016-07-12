
function setBallDelta() {
    ballAngle %= 360;
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
    ballDeltaY = -ballDeltaY;
}

function logStuff(stuff) {
    console.log(stuff);
    console.log("ANGLE: " + ballAngle);
    console.log("DELTAX: " + ballDeltaX);
    console.log("DELTAY: " + ballDeltaY);
    console.log("BALLX: " + ballX);
    console.log("BALLY: " + ballY);
    console.log("WALL-L: " + leftWall);
    console.log("WALL-T: " + topWall);
    console.log("WALL-R: " + rightWall);
    console.log("WALL-B: " + bottomWall);
    console.log("1.7EM: " + $("#slider").css("height"));
    console.log("W: " + $("#jsgame").css("width"));
    console.log("H: " + $("#jsgame").css("height"));
}

function moveBall() {

    setBallCoords(ballX + ballDeltaX, ballY + ballDeltaY);

    checkCollisions();

    setBallPosition(ballX, ballY);
}

function startBallMoving() {
    stopBallMoving();
    setBallPosition(ballX, ballY);
    setBallDelta();
    ballTimer = setInterval(moveBall, frameDelay);
}

function stopBallMoving() {
    clearInterval(ballTimer);
}

function checkCollisions() {
    var ballLeft = ballX;
    var ballTop = ballY;
    var ballRight = ballCenterX + ballRadius;
    var ballBottom = ballCenterY + ballRadius;

    var angleUpdated = false;

    angleUpdated = angleUpdated || checkWallCollisions(angleUpdated, ballLeft, ballTop, ballRight, ballBottom);
    angleUpdated = angleUpdated || checkSliderCollision(angleUpdated, ballLeft, ballTop, ballRight, ballBottom);

    if (angleUpdated)
        setBallDelta();
}

function setBallPosition(left, top) {
    ball.css("left", "" + left + "em");
    ball.css("top", "" + top + "em");
}

function setBallCoords(left, top) {
    ballX = left;;
    ballY = top;
    ballCenterX = ballX + ballRadius;
    ballCenterY = ballY + ballRadius;
}

function block(left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
}

function checkSliderCollision(angleUpdated, ballLeft, ballTop, ballRight, ballBottom) {
    var sliderBlock = new block(sliderPosition, sliderTop - sliderHeight, sliderPosition + sliderWidth, sliderTop);
    if (ballRight >= sliderBlock.left && ballLeft <= sliderBlock.right && ballBottom >= sliderBlock.top && ballTop <= sliderBlock.bottom) {
        var angle = ballAngle;
        if (angle > 180 && ballAngle < 360 && ballBottom >= sliderBlock.top && ballBottom < sliderBlock.bottom) {

            //console.log(ballBottom);
            //console.log(ballTop);
            //console.log(ballCenterY);
            //console.log(sliderBlock.top);
            //logStuff("TOP");
            ballRicochetBottom();
            angleUpdated = true;
        }
        if (angle < 180 && ballTop <= sliderBlock.bottom && ballTop > sliderBlock.top) {
            //logStuff("BOTTOM");
            ballRicochetTop();
            angleUpdated = true;
        }
        if ((angle < 90 || angle > 270) && ballRight >= sliderBlock.left && ballLeft < sliderBlock.left) {
            //logStuff("LEFT");
            ballRicochetRight();
            angleUpdated = true;
        }
        if (angle > 90 && angle < 270 && ballLeft <= sliderBlock.right && ballRight > sliderBlock.right) {
            //logStuff("RIGHT");
            ballRicochetLeft();
            angleUpdated = true;
        }
    }
    return angleUpdated;
}

function checkWallCollisions(angleUpdated, ballLeft, ballTop, ballRight, ballBottom) {
    if (ballLeft <= leftWall) {
        ballRicochetLeft();
        setBallCoords(leftWall + (leftWall - ballLeft), ballTop);
        angleUpdated = true;
    }
    if (ballTop <= topWall) {
        //logStuff("TOPWALL");
        ballRicochetTop();
        setBallCoords(ballLeft, topWall + (topWall - ballTop));
        angleUpdated = true;
    }
    if (ballRight >= rightWall) {
        ballRicochetRight();
        setBallCoords(rightWall - (ballRight - rightWall) - ballRadius - ballRadius, ballTop);
        angleUpdated = true;
    }
    if (ballBottom >= bottomWall) {
        ballRicochetBottom();
        setBallCoords(ballLeft, bottomWall - (ballBottom - bottomWall) - ballRadius - ballRadius);
        angleUpdated = true;
    }
    return angleUpdated;
}

function ballRicochetLeft() {
    //logStuff("LEFT");
    if (ballAngle <= 180)
        ballAngle = (90 - (ballAngle - 90));
    else
        ballAngle = (270 + (270 - ballAngle));
    //logStuff("LEFT2");
}

function ballRicochetTop() {
    //logStuff("TOP");
    if (ballAngle <= 90)
        ballAngle = (360 - ballAngle);
    else
        ballAngle = (180 + (180 - ballAngle));
    //logStuff("TOP2");
}

function ballRicochetRight() {
    //logStuff("RIGHT");
    if (ballAngle >= 0)
        ballAngle = (180 - ballAngle);
    else
        ballAngle = (270 - (ballAngle - 270));
    //logStuff("RIGHT2");
}

function ballRicochetBottom() {
    //logStuff("BOTTOM");
    if (ballAngle <= 270)
        ballAngle = (180 - (ballAngle - 180));
    else
        ballAngle = (360 - ballAngle);
    //logStuff("BOTTOM2");
}