var game;
var slider;
var sliderTimer;
var keyLeft = 37;
var keyRight = 39;
var keyEscape = 27;
var active = false;
var movingRight = false;
var movingLeft = false;
var sliderPosition = 20.6;
var sliderWidth = 15;
var sliderHeight = 1.7;
var sliderTop = 28;
var minSliderPosition = 2;
var maxSliderPosition = 39.2;
var frameDelay = 10;
var sliderDistancePerFrame = 0.4;
var readyDelay = 2000;
var goDelay = 350;
var ball;
var ballDistancePerFrame = 0.28;
var ballTimer;
//var ballX = 19;
//var ballY = 20;
var ballAngle = 285;
var ballDeltaX;
var ballDeltaY;
var ballRadius = 1;
var leftWall = 0;
var rightWall = 56;
var vOffset = -1.7;
var topWall = vOffset;
var bottomWall = 33 + vOffset;
var ballCenterX;
var ballCenterY;
var ballX = leftWall;
var ballY = topWall;