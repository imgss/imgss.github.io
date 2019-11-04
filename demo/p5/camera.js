let capture;
windowWidth = window.innerWidth
function setup() {
  c = createCanvas(windowWidth, windowWidth * 0.75);
  
  capture = createCapture({
    audio: false,
    video: {
      width: 800,
      height: 600
    }
  });
  capture.size(windowWidth, windowWidth * 0.75);
  img = loadImage('./hat.png');
  capture.hide();
  document.getElementById('btn').addEventListener('click', function() {
    saveCanvas(c, 'mypic')
  })
}

function draw() {
  background(255);
  c.drawingContext.scale(-1, 1);
  image(capture, 0, 0, -windowWidth, windowWidth * 0.75);

  // filter(INVERT);
  image(img, -(mouseX > 320 ? 320 : mouseX) - img.width / 2, (mouseY > 240 ? 240 : mouseY) - img.height / 2, img.width / 2, img.height / 2)
}

function keyPressed() {
  console.log(key)
  saveCanvas(c, 'demo.jpg')
}