
function correctShallowAngle() {
    if (ballAngle < 180 && ballAngle > 175)
        ballAngle = 175;
    else if (ballAngle > 0 && ballAngle < 5)
        ballAngle = 5;
}

function correctAngleOutOfBounds() {
    if (ballAngle < 0)
        ballAngle += 360;
    if (ballAngle > 360)
        ballAngle %= 360;
}

function setBallDelta() {

    correctAngleOutOfBounds();
    correctShallowAngle();

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
        var radians = angle * radianFactor;
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

function initializeBall() {
    setBallCoords(ballInitialX, ballInitialY);
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
    var collision = false;

    var ballRect = new block(ballX, ballY, ballCenterX + ballRadius, ballCenterY + ballRadius);

    if (checkWallCollisions(ballRect))
        collision = true;
    if (checkSliderCollision(ballRect))
        collision = true;
    if (checkBrickCollisions(ballRect))
        collision = true;

    if (collision)
        setBallDelta();
}

function nextLevel() {
    stopBallMoving();
    $("#ball").css("visibility", "hidden");
    ballDistancePerFrame += 0.7;
    sliderDistancePerFrame += 0.7;
    sliderWidth -= 15;
    slider.css("width", sliderWidth);
    ++level;
    initializeBall();
    var nextLevel = levelBlocks3;
    switch (level) {
        case 1: nextLevel = levelBlocks1; break;
        case 2: nextLevel = levelBlocks2; break;
        case 3: nextLevel = levelBlocks3; break;
        default: nextLevel = levelBlocks3; break;
    }
    resetAnimation(nextLevel);
}

function checkBrickCollisions(ballRect) {
    var collision = false;

    for (var i = 0; i < levelBlocks.length; ++i) {
        var blockRow = levelBlocks[i];
        for (var j = 0; j < blockRow.length; ++j) {
            var blockObj = blockRow[j];
            if (blockObj.exists) {
                if (checkBlockCollision(ballRect, blockObj, false)) {
                    collision = true;
                    score += 10;
                    showScore();
                    blockObj.exists = false;
                    blockObj.element.remove();
//                    console.log(blockCount);
                    if (--blockCount == 0) {
                        score += 100;
                        showScore();
                        nextLevel();
                    }
                }
            }
        }
    }

    return collision;
}

function setBallPosition(left, top) {
    ball.css("left", left);
    ball.css("top", top);
}

function setBallCoords(left, top) {
    ballX = left;;
    ballY = top;
    ballCenterX = ballX + ballRadius;
    ballCenterY = ballY + ballRadius;
}

function block(left, top, right, bottom, element) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.element = element;
    this.exists = true;
}

function checkBlockCollision(ballRect, blockRect, allowCornerAngle) {
    var collision = false;
    if (ballRect.right >= blockRect.left && ballRect.left <= blockRect.right && ballRect.bottom >= blockRect.top && ballRect.top <= blockRect.bottom) {
        var rLeft = false;
        var rTop = false;
        var rRight = false;
        var rBottom = false;
        var angle = ballAngle;
        var angleOffset = 0;
        if (angle > 180 && angle < 360 && ballRect.bottom >= blockRect.top && ballRect.bottom < blockRect.bottom) {
            if (allowCornerAngle) {
                var closeToCornerBoundary = sliderWidth * 0.4;
                var closeToCorner = ballRect.right - blockRect.left;
                if (closeToCorner < closeToCornerBoundary)
                    angleOffset -= (closeToCornerBoundary - closeToCorner) * 0.7;
                closeToCorner = blockRect.right - ballRect.left;
                if (closeToCorner < closeToCornerBoundary)
                    angleOffset += (closeToCornerBoundary - closeToCorner) * 0.7;
            }
            rBottom = true;
            collision = true;
        }
        if (angle < 180 && ballRect.top <= blockRect.bottom && ballRect.top > blockRect.top) {
            rTop = true;
            collision = true;
        }
        if ((angle < 90 || angle > 270) && ballRect.right >= blockRect.left && ballRect.left < blockRect.left) {
            rRight = true;
            collision = true;
        }
        if (angle > 90 && angle < 270 && ballRect.left <= blockRect.right && ballRect.right > blockRect.right) {
            rLeft = true;
            collision = true;
        }
        if (rTop && (rLeft || rRight))
            angleOffset = 0;
        ballAngle = angle + angleOffset;
        if ((rTop || rBottom) && (rLeft || rRight)) {
            var xDelta = 0;
            var yDelta = 0;
            if (rTop && rLeft) {
                xDelta = ballRect.right - blockRect.left;
                yDelta = ballRect.bottom - blockRect.top;
                if (xDelta > yDelta)
                    rLeft = false;
                else
                    rTop = false;
            }
            if (rBottom && rLeft) {
                xDelta = ballRect.right - blockRect.left;
                yDelta = blockRect.bottom - ballRect.top;
                if (xDelta > yDelta)
                    rLeft = false;
                else
                    rBottom = false;
            }
            if (rTop && rRight) {
                xDelta = blockRect.right - ballRect.left;
                yDelta = ballRect.bottom - blockRect.top;
                if (xDelta > yDelta)
                    rRight = false;
                else
                    rTop = false;
            }
            if (rBottom && rRight) {
                xDelta = blockRect.right - ballRect.left;
                yDelta = blockRect.bottom - ballRect.top;
                if (xDelta > yDelta)
                    rRight = false;
                else
                    rBottom = false;
            }
        }
        if (rLeft) ballRicochetLeft();
        if (rTop) ballRicochetTop();
        if (rRight) ballRicochetRight();
        if (rBottom) ballRicochetBottom();
    }
    return collision;
}

function checkSliderCollision(ballRect) {

    var sliderRect = new block(sliderX, sliderY - sliderHeight, sliderX + sliderWidth, sliderY);

    return checkBlockCollision(ballRect, sliderRect, true);
}

function loseTurn() {
    --lives;
    stopBallMoving();
    $("#ball").css("visibility", "hidden");
    initializeBall();
    resetAnimation();
}

function checkWallCollisions(ballRect) {
    var collision = false;
    var rLeft = false;
    var rTop = false;
    var rRight = false;
    var rBottom = false;
    if (ballRect.left <= leftWall) {
        rLeft = true;
        setBallCoords(leftWall + (leftWall - ballRect.left), ballRect.top);
        collision = true;
    }
    if (ballRect.top <= topWall) {
        //logStuff("TOPWALL");
        rTop = true;
        setBallCoords(ballRect.left, topWall + (topWall - ballRect.top));
        collision = true;
    }
    if (ballRect.right >= rightWall) {
        rRight = true;
        setBallCoords(rightWall - (ballRect.right - rightWall) - ballRadius - ballRadius, ballRect.top);
        collision = true;
    }
    if (ballRect.bottom >= bottomWall) {
//        rBottom = true;
//        setBallCoords(ballRect.left, bottomWall - (ballRect.bottom - bottomWall) - ballRadius - ballRadius);
//        collision = true;
        loseTurn();
    }
    if (rLeft) ballRicochetLeft();
    if (rTop) ballRicochetTop();
    if (rRight) ballRicochetRight();
    if (rBottom) ballRicochetBottom();

    return collision;
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