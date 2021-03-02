// Using face tracking from:  https://gist.github.com/lmccart/2273a047874939ad8ad1

// Sam Landa
// sdl2141

// Face mask is scaled as user brings face closer to corner. If the user is far enough back that all three masks line up, there are big red googly eyes. 

// Face tracker object
let ctracker;
let video;
let d = 1;
let d2 = 1;
let fillRed = true;

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

  noStroke();
}

function draw() {
  background(255);
  //image(video, 0, 0);

  // get array of face marker positions [x, y] format
  let positions = ctracker.getCurrentPosition();

  if (positions) {
    // Loop through all of the positions 
    let x;
    for (let p in positions) {
      if(d<1)
        {
          d=1;
        }
      if(d2<1)
        {
          d2=1;
        }
      x=12;
      x += 10*sin(frameCount/15)
      let pos = positions[p];
      if (p == 27 || p == 32) {
        //stroke('black');
        //strokeWeight(3);
        //fill('white');
        //ellipse(pos[0], pos[1], 50, 50);
        //strokeWeight(x);
        //stroke('red');
        //point(pos[0], pos[1]);
        strokeWeight(1);
        stroke('black');
        
        fill('green');
        //text(p, pos[0] * 2, pos[1] * 2);
        ellipse(pos[0] * d, pos[1] * d, 5, 5);
        fill('yellow');
        //text(p, pos[0] * 2, pos[1] * 2);
        ellipse(pos[0] * d2, pos[1] * d2, 5, 5);
        if(d==1)
          {
            stroke('black');
            strokeWeight(3);
            fill('white');
            ellipse(pos[0], pos[1], 50, 50);
            strokeWeight(x);
            stroke('red');
            point(pos[0], pos[1]);
            strokeWeight(1);
            stroke('black');
            fillRed=false;
          }else{
            fill('red');
            //text(p, pos[0] * 2, pos[1] * 2);
            ellipse(pos[0], pos[1], 5, 5);
            fillRed=true;
          }
        
        
      } else if((p>22 && p<32) || (p>62 && p<71)) {

        if(fillRed)
          {
            fill('green');
            //text(p, pos[0] * 2, pos[1] * 2);
            ellipse(pos[0] * d, pos[1] * d, 5, 5);
        
            fill('yellow');
            //text(p, pos[0] * 2, pos[1] * 2);
            ellipse(pos[0] * d2, pos[1] * d2, 5, 5);
            fill('red');
            //text(p, pos[0] * 2, pos[1] * 2);
            ellipse(pos[0], pos[1], 5, 5);
          }
        
      }else{

        fill('yellow');
        //text(p, pos[0] * 2, pos[1] * 2);
        ellipse(pos[0] * d2, pos[1] * d2, 5, 5);
        
        fill('green');
        //text(p, pos[0] * 2, pos[1] * 2);
        ellipse(pos[0] * d, pos[1] * d, 5, 5);
        
        fill('red');
        ellipse(pos[0], pos[1], 7, 7);
        //pupils are 27 and 32
      }
    }

    // Calculate the distance between the 57th and 60th points of the positions array
    let top = positions[0];
    let bottom = positions[14];
    d = dist(bottom[0], bottom[1], top[0], top[1]);
    d/=100;
    d2 = d/1.5;
    //console.log(d);
  }

}