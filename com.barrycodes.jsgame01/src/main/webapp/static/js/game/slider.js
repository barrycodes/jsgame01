
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
