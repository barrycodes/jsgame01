
function moveSliderLeft() {
    moveSlider(-sliderDistancePerFrame);
}

function moveSliderRight() {
    moveSlider(sliderDistancePerFrame);
}

function initializeSlider() {
    moveSliderTo(sliderInitialX);
}

function moveSlider(offset) {
    sliderX += offset;
    if (sliderX < minSliderPosition)
        sliderX = minSliderPosition;
    else if (sliderX > maxSliderPosition)
        sliderX = maxSliderPosition;
    moveSliderTo(sliderX);
}

function moveSliderTo(x) {
    sliderX = x;
    slider.css('left', sliderX);
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
