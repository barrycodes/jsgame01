var keyLeft = 37;
var keyRight = 39;
var keyEscape = 27;

var radianFactor = Math.PI / 180;

var active = false;
var movingRight = false;
var movingLeft = false;

var game;
var slider;
var ball;

var sliderTimer;
var ballTimer;
var goDelay = 350;
var readyDelay = 2000;
var frameDelay = 10;

var leftWall;
var rightWall;
var topWall;
var bottomWall;

var ballX;
var ballY;

var ballCenterX;
var ballCenterY;
var ballRadius;
var ballWidth;
var ballHeight;

var ballDeltaX;
var ballDeltaY;
var ballAngle = 285;

var ballInitialX = 330;
var ballInitialY = 220;
var ballInitialAngle = 285;
var sliderInitialX = 0;

var sliderDistancePerFrame = 8;
var ballDistancePerFrame = 3.9;
var sliderDistancePerFrameLevelDelta = 0.55;
var ballDistancePerFrameLevelDelta = 0.55;
var sliderWidthLevelDelta = -15;

var sliderX;
var sliderY;
var sliderWidth;
var sliderHeight;
var minSliderPosition;
var maxSliderPosition;
//var ballX = 19;
//var ballY = 20;

var lives = 3;
var score = 0;
var level = 1;