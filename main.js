song1="";
song2="";
leftrwistx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scorerightwrist=0;
scoreleftwrist=0;
song1_status="";
song2_status="";

function preload(){
   song1=loadSound("music.mp3");
   song2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

   video=createCapture(VIDEO) ;
   video.hide();

   posenet=ml5.poseNet(video,modelLoaded);
   posenet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("posenet is initialised");

}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
       scorerightwrist=results[0].pose.keypoints[10].score;
       scoreleftwrist=results[0].pose.keypoints[9].score;

        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;

        console.log(leftwristx,leftwristy);

        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;

        console.log(rightwristx,rightwristy);
    }

}


    

function draw(){
    image(video,0,0,600,500);
song1_status=song1.isPlaying();
song2_status=song2.isPlaying();

    fill("FF0000");
    stroke("FF0000");

    if(scorerightwrist>0.2){
        circle(rightwristx,rightwristy,20);
song2.stop();
        if(song1_status==false){
            document.getElementById("song").innerHTML="playing harry potter theme";
            
                song1.play();
                
                }
        }

       
    if(scoreleftwrist>0.2){
        circle(leftwristx,leftwristy,20);  
        song1.stop();
        if(song2_status==false){
            document.getElementById("song").innerHTML="playing peterpan theme";
            
                song2.play();
               
                }
        }

    }

    function play(){
        song.play();
       song.setVolume(1);
       song.rate(1);

    }





