//PoseNet:
// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT


let video;
let poseNet;

function setup() {
  createCanvas(640, 480);  
  video = createCapture(VIDEO);
  //video.size(width, height);
  video.hide();
  
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', bodiesTracked);
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
}

// A function to draw ellipses over the detected keypoints
function bodiesTracked(bodies)  {
  image(video, 0, 0, width, height);
  //background(0, 5);
  // Loop through bodies
  for (let body of bodies) {
    bodyTracked(body.pose); 
  }
}

function bodyTracked(body) {
    let joints = body.keypoints;
    for(let joint of joints) {
     drawJoint(joint); 
    }

    let nose = body.rightEye;
    let eye = body.leftEye;
  stroke('black');
    ellipse(nose.x, nose.y, 50, 50);
    ellipse(eye.x, eye.y, 50, 50);
  stroke('red');
  let x=12;
  x += 10*sin(frameCount/15)
  strokeWeight(x);
  point(eye.x, eye.y);
  point(nose.x, nose.y);
 
}

// Draw the joint

function drawJoint(joint) {
  // Exit out of function if confidence level is too low
  if (joint.score < 0.2) return;
  let pos = joint.position;
  stroke('red');
  strokeWeight(5);

}
