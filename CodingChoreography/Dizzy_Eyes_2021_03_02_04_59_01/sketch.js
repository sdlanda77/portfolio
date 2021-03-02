// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;

function setup() {
  createCanvas(640, 480);  
  video = createCapture(VIDEO);
  //video.size(width, height);
  video.hide();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', bodiesTracked);
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
// Nothing to see here in this example
}

// A function to draw ellipses over the detected keypoints
function bodiesTracked(bodies)  {
  image(video, 0, 0, width, height);
  //background(0, 5);
  // Loop through all the bodies
  for (let body of bodies) {
    bodyTracked(body.pose); 
  }
}

function bodyTracked(body) {
  // Grab the joints
    let joints = body.keypoints;
    // Draw all the joints
    for(let joint of joints) {
     drawJoint(joint); 
    }
    // How do you call out each joint by name?
    let nose = body.rightEye;
    let eye = body.leftEye;
  stroke('black');
    ellipse(nose.x-5, nose.y, 50, 50);
    ellipse(eye.x+5, eye.y, 50, 50);
  stroke('red');
  let x=12;
  //x += 10*sin(frameCount/15)
  strokeWeight(x);
  point(eye.x+ noise(50)+10*cos(frameCount/30) , eye.y+noise(50)+10*sin(frameCount/30));
  point(nose.x+ noise(50)+10*cos(10+frameCount/30) , nose.y+noise(50)+10*sin(10+ frameCount/30));
  /*
    let j1 = body.rightShoulder;
    let j2 = body.leftShoulder;
    line(j1.x, j1.y, j2.x, j2.y);
    
    let d = int(dist(j1.x, j1.y, j2.x, j2.y));
    print("distance =" + d);*/
}

// Draw the joint

function drawJoint(joint) {
  // Exit out of function if confidence level is too low
  if (joint.score < 0.2) return;
  // Get the position of the joint
  let pos = joint.position;
  stroke('red');
  strokeWeight(5);
  // Draw the joint at it's x,y position
  //point(pos.x, pos.y);
}
