//setup canvas
void setup() {
	size(400,375);
	fill(255);
	background(125);
	PFont fontA = loadFont("courier");
	textFont(fontA, 14); 
	frameRate(60);
}

//global variables
var faceX = 0;
var faceY = 150;
var faceSize = 25;
var animateDropCalled = false;
var mx = 0;
var my = 0;
var easing = .05;


//ANIMATE FUNCTIONS


//two sequential animations
function orderAnimate( action1, parameters1, test1, action2, parameters2, test2 ){
	var args = arguments;
	setTimeout(function() {
		if (test1()) {	
			action1.apply(this, parameters1);
		} else if (test2()) {
			action2.apply(this, parameters2);
		} else {
			return;
		}
		orderAnimate.apply(this, args);
	},
	50);
}
//two animations at the same time - test1 and test2 need to be functions that return boolean
function simulAnimate( action1, parameters1, test1, action2, parameters2, test2 ){
	var args = arguments;
	setTimeout(function() {
		if (test1) {	
			action1.apply(this, parameters1);
			action2.apply(this, parameters2);
		} else if (test2) {
			action2.apply(this, parameters2);
		} else {
			return;
		}
		simulAnimate.apply(this, args);
	},
	50);
}

//modified simulAnimate to be used in orderAnimateArray function
function simulAnimateInArray(action1, parameters1, action2, parameters2) {
	var args = arguments;
	setTimeout(function() {	
		action1.apply(this, parameters1);
		action2.apply(this, parameters2);
	},
	50);
}

//animation objects for testing
var animate1 = {
	action: simulAnimateInArray,
	parameters: [moveDrop, [10,0], shrinkDrop,[8]],
	endTest: function() { return faceX < 200}
}

var animate2 = {
	action: shrinkDrop,
	parameters: [4],
	endTest: function() { return faceSize < 179}
}

var animate3 = {
	action: simulAnimateInArray, 
	parameters: [moveDrop, [-10,-8], shrinkDrop, [10]],
	endTest: function() { return faceX > 75}
}

var arrayOfActions = [animate1, animate2];

var counter = 0;

function orderAnimateArray( arr ){
	var args = arguments;
	setTimeout(function() {
				if (arr[counter].endTest()) {
					arr[counter].action.apply(this, arr[counter].parameters);
				} else {
					counter++;
				}
				if (counter === arr.length) {
					return;
				}
			orderAnimateArray.apply(this, args);
			}
	,
	50);
}
	
function shrinkDrop (x) {
	if (faceSize === 0) {
		faceSize = .1;
	} else {
		faceSize += x;
	}
}

function moveDrop(x,y) {
	faceX += x;
	faceY += y;
}

void draw(){
	//drop variables
	var earHeight = faceY-(faceSize/4);
	var earOffset = faceSize/1.66;
	var earSize = faceSize/1.20;
	var trunkWidth = faceSize/3;
	var trunkLength = faceSize;
	var nozzleWidth = trunkWidth *1.2;
	var eyeHeight = faceY*1;
	var eyelidHeight= eyeHeight-6;
	var eyeOffset = faceSize*0.2;
	var eyeWidth = faceSize*0.34;
	var eyeOpenness = faceSize*0.3;
	var pupilSize = 0.5*eyeWidth;
	var pupilLook = 0;
	
	background(221,160,221);

	//face
	noStroke();
	fill(145, 145, 145);
	ellipse(faceX, faceY, faceSize, faceSize);

	//ears
	ellipse(faceX-earOffset, faceY-(faceSize/4), earSize, earSize); // left ear
	ellipse(faceX+earOffset, faceY-(faceSize/4), earSize, earSize); // right ear

	rect(faceX - (trunkWidth/2),faceY-(faceSize/12),trunkWidth,trunkLength);//trunk
	rect(faceX - (nozzleWidth/2),faceY+trunkLength/1.1,nozzleWidth,trunkLength/6,50);//nozzle

	//eyes
	
	fill(110, 33, 110);
	ellipse(faceX-eyeOffset,faceY,eyeWidth,eyeOpenness);//left eye
	ellipse(faceX+eyeOffset,faceY,eyeWidth,eyeOpenness);//right eye

	fill(41, 7, 41);
	
	//pupils
	ellipse(pupilLook+eyeOffset+faceX+mx,faceY+my,pupilSize, pupilSize);
	ellipse(pupilLook-eyeOffset+faceX+mx,faceY+my,pupilSize, pupilSize);

	fill(145, 145, 145);

	//eyelids
	arc(faceX-eyeOffset,faceY-6,eyeWidth +4 ,eyeOpenness + 4,-PI,0);
	arc(faceX+eyeOffset,faceY-6,eyeWidth +4 ,eyeOpenness + 4,-PI,0);
	fill(0,0,0);

	line (faceX-eyeOffset-eyeWidth/2,faceY-6,faceX-eyeOffset+eyeWidth/2,faceY-6);
	line (faceX+eyeOffset-eyeWidth/2,faceY-6,faceX+eyeOffset+eyeWidth/2,faceY-6);
	
	//eyes follow the mouse - mousePosX is -200 to make 0 the center of the canvas
	var mousePosX = mouseX - 200; 
	var mousePosY = mouseY - 187.5;
	if (abs(mouseX - mx) > 0.1) {
		mx = mx + (mousePosX - mx) * easing;
	}

	if (abs(mouseY - my) > 0.1) {
		my = my + (mousePosY - my) * easing;


	mx = constrain(mx, - ((eyeWidth/2)-(pupilSize/2)), ((eyeWidth/2)-(pupilSize/2)));
	my = constrain(my, - ((eyeWidth/2)-(pupilSize/2)), ((eyeWidth/2)-(pupilSize/2)));

	
	}

	//check if animation is called - if it isn't, animate drop!
	if (!animateDropCalled)	{
		// order animate function with direct arguments orderAnimate(moveDrop, [10,0], function() { return faceX < 200}, shrinkDrop, [4],function() {return faceSize < 179});	
		orderAnimateArray(arrayOfActions);
	}

	animateDropCalled = true;
}