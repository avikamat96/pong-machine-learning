let video, classifier, label='';
let lUButton, lDButton;
let featureExtractor, train;
let leftscore = 0;
let rightscore = 0;
let count=0, count1=0, count2=0, count3=0;

function setup() { 
    video = createCapture(VIDEO);
    createCanvas(600, 400);
    // ding = loadSound("data/ding.mp3");
    puck = new Puck();
    left = new Paddle(true);
    right = new Paddle(false); 

    video.size(550, 400);

    lUButton = createButton('Left Up');
    lUButton.position(10, 450);
    lDButton = createButton('Left Down');
    lDButton.position(10, 480);

    train = createButton('Train');
    train.position(50, 530);

    featureExtractor = ml5.featureExtractor('MobileNet', ()=>{
      console.log("Model is ready");
    }); 

    classifier = featureExtractor.classification(video, ()=>{
      console.log("Video is Ready");
    });

    lUButton.mousePressed(()=>{
     console.log("Left Up: ",count);
      count++;
      classifier.addImage('Left Up');
    });

  lDButton.mousePressed(()=>{
    console.log("Left Down: ", count1);
    count1++;
    classifier.addImage('Left Down');
});    


  train.mousePressed(()=>{
     classifier.train((loss)=>{
      if(loss==null)
      {
        classifier.classify(gotResult);
      }
      console.log(loss);
      })
   });
  }

function gotResult(err, res){
  if(err)
    console.log(err);
  else
  {
    label = res;
    classifier.classify(gotResult);
  }
}
var rand;

function draw() {

 rand = random(1, 3);
 console.log(Math.floor(rand));

  background(0);
  textSize(32);
  fill(255);
  text(label, 20, height-60);

  puck.checkPaddleRight(right);
    puck.checkPaddleLeft(left);

    left.show();
    right.show();
    left.update();
    right.update();
    
    puck.update();
    puck.edges();
    puck.show();
    
    fill(255);
    textSize(32);
    text(leftscore, 32, 40);
    text(rightscore, width-64, 40);
    if(leftscore==5)
    {      
      console.log("Left Player Wins");
      leftscore=0;
      rightscore=0;
    }
    if(rightscore==5){
      console.log("Right Player Wins");
      leftscore=0;
      rightscore=0;
    } 
    if (Math.floor(rand)==1) {
        right.move(-10);
    } 
    else if (Math.floor(rand)==2) {
        right.move(10);
    }
    if (label =="Left Up") {
        left.move(-10);
    } 
    else if (label =="Left Down") {
        left.move(10);
    }
}

// function keyReleased() {
//     left.move(0);
//     right.move(0);
// }

// function keyPressed() {
//     console.log(key);
//     if (key == 'A') {
//         left.move(-10);
//     } else if (key == 'Z') {
//         left.move(10);
//     }    
//   }
    