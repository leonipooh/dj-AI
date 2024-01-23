song = "";

function preload(){
    song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

lefttWristX = 0;
lefttWristY = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses);
}


function modelLoaded(){
    console.log('poseNet esta inicializando')
}

function gotPoses(results){
    if (results.length > 0) {
        scoreRightWrist = results[0].pose.keypoints[10].score
        scoreLeftWrist = results[0].pose.keypoints[9].score

        console.log("scoreRightWrist =" + scoreRightWrist + "scoreLeftWrist =" + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("FF0000");
    if (scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 30)
        if(rightWristY > 0 & rightWristX < 100) {
            song.rate(0.5);
            document.getElementById("speed").innerHTML = "0.5"
            
        }

        if(rightWristY > 100 & rightWristX < 200) {
            song.rate(1);
            document.getElementById("speed").innerHTML = "1"
            
        }

        if(rightWristY > 200 & rightWristX < 300) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "1.5"
            
        }

        if(rightWristY > 300 & rightWristX < 400) {
            song.rate(2.0);
            document.getElementById("speed").innerHTML = "2.0"
            
        }

        if(rightWristY > 400 & rightWristX < 500) {
            song.rate(2.5);
            document.getElementById("speed").innerHTML = "2.5"
            
        }
    }
}