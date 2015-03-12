void setup() {
	size(400,375);
	fill(255);
	background(125);
	PFont fontA = loadFont("courier");
	textFont(fontA, 14); 
	frameRate(60);
}

var faceX = 0;
var faceY = 150;
var faceSize = 0;
var animateDropCalled = false;

function simulAnimate( action1, parameters1, action2, parameters2 ){
	var args = arguments;
	setTimeout(function() {
		if (faceX < 200) {	
			action1.apply(this, parameters1);
			action2.apply(this, parameters2);
		} else if (faceSize < 179) {
			action2.apply(this, parameters2);
		} else {
			return;
		}
		simulAnimate.apply(this, args);
	},
	50);
}


function orderAnimate( action1, parameters1, action2, parameters2 ){
	var args = arguments;
	setTimeout(function() {
		if (faceX < 200) {	
			action1.apply(this, parameters1);
		} else if (faceSize < 179) {
			action2.apply(this, parameters2);
		} else {
			return;
		}
		orderAnimate.apply(this, args);
	},
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
	var pupilSize = 0.5;
	var pupilLook = 8;
	
	background(221,160,221);

	//face
	noStroke();
	fill(145, 145, 145);
	ellipse(faceX, faceY, faceSize, faceSize);

	//ears
	ellipse(faceX-earOffset, faceY-(faceSize/4), earSize, earSize); // left ear
	ellipse(faceX+earOffset, faceY-(faceSize/4), earSize, earSize); // right ear

	rect(faceX - (trunkWidth/2),faceY-5,trunkWidth,trunkLength);//trunk
	rect(faceX - (nozzleWidth/2),faceY+trunkLength/1.1,nozzleWidth,trunkLength/6,50);//nozzle

	//eyes
	
	fill(110, 33, 110);
	ellipse(faceX-eyeOffset,faceY,eyeWidth,eyeOpenness);//left eye
	ellipse(faceX+eyeOffset,faceY,eyeWidth,eyeOpenness);//right eye

	fill(41, 7, 41);
	
	//pupils
	ellipse(pupilLook+eyeOffset+faceX,faceY,pupilSize*eyeWidth, pupilSize*eyeOpenness);
	ellipse(pupilLook-eyeOffset+faceX,faceY,pupilSize*eyeWidth, pupilSize*eyeOpenness);

	fill(145, 145, 145);

	//eyelids
	arc(faceX-eyeOffset,faceY-6,eyeWidth +4 ,eyeOpenness + 4,-PI,0);
	arc(faceX+eyeOffset,faceY-6,eyeWidth +4 ,eyeOpenness + 4,-PI,0);
	fill(0,0,0);

	line (faceX-eyeOffset-eyeWidth/2,faceY-6,faceX-eyeOffset+eyeWidth/2,faceY-6);
	line (faceX+eyeOffset-eyeWidth/2,faceY-6,faceX+eyeOffset+eyeWidth/2,faceY-6);
	
	if (!animateDropCalled)	{
		simulAnimate(moveDrop, [10,0], shrinkDrop, [4]);	
	}

	animateDropCalled = true;
}