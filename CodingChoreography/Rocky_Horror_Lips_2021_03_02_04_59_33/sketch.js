// Modified from https://gist.github.com/lmccart/2273a047874939ad8ad1
//Blackout entire face except lips

//Note: this glitches in certain light. Move around a bit if it can not find your lips!


let ctracker;
let video;

function setup() {
  // setup camera capture
  video = createCapture(VIDEO);
  video.size(400, 300);
  video.hide();

  // setup canvas
  createCanvas(windowWidth, windowHeight);

  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(video.elt);

}

function draw() {
  background(255);
  image(video, 0, 0);
  
  fill('black');
  // get array of face marker positions [x, y] format
  let positions = ctracker.getCurrentPosition();

  if (positions) {
    // Loop through all of the positions 
    
    // Mask out everything above upper lip
    beginShape();
    vertex(0, 0);
    // Just grab the points for the lips
    for (let p = 44; p <= 50; p++) {
      let pos = positions[p];
      let x = pos[0];
      let y = pos[1];
      vertex(x,y);
    }
    vertex(video.width, 0);
    endShape();
    
    // Fill in the right side
    beginShape();
    vertex(video.width, 0);
    let rightCorner = positions[50];
    let rcx = rightCorner[0];
    let rcy = rightCorner[1];
    vertex(rcx,rcy);
    vertex(video.width, video.height);
    endShape();
    
    beginShape();
    // Mask out everything below lower lip
    vertex(video.width, video.height);
    // // Just grab the points for the lips
    for (let p = 50; p <= 55; p++) {
      let pos = positions[p];
      let x = pos[0];
      let y = pos[1];
      vertex(x,y);
    }
    // Add the last corner point
    let leftCorner = positions[44];
    let lcx = leftCorner[0];
    let lcy = leftCorner[1];
    vertex(lcx,lcy);
    vertex(0, video.height);
    endShape();
    
    // Fill in the left side
    beginShape();
    vertex(0, video.height);
    vertex(lcx,lcy);
    vertex(0, 0);
    endShape();

  }

}