 song ="";

 leftWristX =0;
 leftWristY =0;
 Score_leftWristY =0;

 rightWristX =0;
 rightWristY =0;


 function preload(){
 song = loadSound('music.mp3');
 }

 function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);

    posenet.on('Pose', gotPoses);

}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        Score_leftWristY = results[0].pose.keypoints[9].score;
        console.log(" Score for left wrist Y ="+Score_leftWristY);

        leftWristX =results[0].pose.leftWrist.x;
        leftWristY =results[0].pose.leftWrist.y;
        console.log("left Wrist X ="+leftWristX+" left Wrist Y ="+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist X ="+rightWristX+" right wrist Y ="+rightWristY);

    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    stroke("#FF0000");
    fill("#FF0000");

    if(Score_leftWristY >0.2){

    circle(leftWristX, leftWristY, 200);

    NUM_leftWristY = Number(leftWristY);
    Rounded_leftWristY = floor(NUM_leftWristY);

    volume = Rounded_leftWristY/500;
    document.getElementById("volume").innerHTML = "The volume is "+volume+".";

    song.setVolume(volume);
}
}

function play(){
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function modelLoaded(){
    console.log('Posenet is Initailized');
}