void setup()
	{
	  size(400,375);
	  background(125);
	  fill(255);
	  noLoop();
	  PFont fontA = loadFont("courier");
	  textFont(fontA, 14);  
	}


	var faceX = 200;
	var faceY = 150;
	var faceSize = 179;
	var earHeight = faceY-(faceSize/4);
	var earOffset = faceSize/1.66;
	var earSize = faceSize/1.20;
	var trunkWidth = faceSize/3;
	var trunkLength = faceSize;
	var nozzleWidth = trunkWidth *1.2;
	var eyeHeight = faceY*1;
	var eyeOffset = faceSize*0.2;
	var eyeWidth = faceSize*0.34;
	var eyeOpenness = faceSize*0.3;
	void draw(){  
	background(221,160,221);
	
	noStroke();
	fill(145, 145, 145);
	ellipse(faceX, faceY, faceSize, faceSize); //face


	ellipse(faceX-earOffset, earHeight, earSize, earSize); // left ear

	rect(faceX - (trunkWidth*5),faceY-5,trunkWidth,trunkLength);//left ear bottom
	ellipse(faceX+earOffset, earHeight, earSize, earSize); // right ear

	rect(faceX - (trunkWidth/2),faceY-5,trunkWidth,trunkLength);//trunk
	rect(faceX - (nozzleWidth/2),faceY+trunkLength/1.1,nozzleWidth,trunkLength/6,50);//nozzle

	//eyes
	
	fill(110, 33, 110);
	ellipse(faceX-eyeOffset,eyeHeight,eyeWidth,eyeOpenness);//left eye
	ellipse(faceX+eyeOffset,eyeHeight,eyeWidth,eyeOpenness);//right eye

	fill(41, 7, 41);
	
	//pupils
	var pupilSize = 0.5;
	var pupilLook = faceX+-8;
	ellipse(pupilLook+eyeOffset,eyeHeight,pupilSize*eyeWidth, pupilSize*eyeOpenness);
	ellipse(pupilLook-eyeOffset,eyeHeight,pupilSize*eyeWidth, pupilSize*eyeOpenness);

	fill(145, 145, 145);

	//eyelids
	var eyelidHeight = eyeHeight-6;

	arc(faceX-eyeOffset,eyelidHeight,eyeWidth +4 ,eyeOpenness + 4,-PI,0);
	arc(faceX+eyeOffset,eyelidHeight,eyeWidth +4 ,eyeOpenness + 4,-PI,0);
	fill(0,0,0);

	line (faceX-eyeOffset-eyeWidth/2,eyelidHeight,faceX-eyeOffset+eyeWidth/2,eyelidHeight);
	line (faceX+eyeOffset-eyeWidth/2,eyelidHeight,faceX+eyeOffset+eyeWidth/2,eyelidHeight);
	}