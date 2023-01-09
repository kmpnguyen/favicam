// Handle FF
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia;
const favicon = document.createElement("link");
let videoScale = 13;
let video;
const stepSize = 8;

function setup() {
  favicon.rel = "shortcut icon";
  favicon.type = "image/png";
  favicon.href = "../../images/favicon.ico";
  document.getElementsByTagName("head")[0].appendChild(favicon);

  createCanvas(400, 300);
  noStroke();
  fill(0);
  rectMode(CORNER);
  ellipseMode(CORNER);

  video = createCapture(VIDEO);
  video.size(400, 300);
  video.hide();

  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
    video.play();
  });
}

function draw() {
  background(0);
  background(255);
  video.loadPixels();

  background(255);
  video.loadPixels();

  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      const i = y * width + x;
      const darkness = (255 - video.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;

      let type = floor(random(3));

      if (type == 0) {
        rect(x, y, radius, radius);
      } else if (type == 1) {
        rect(x, y, radius, radius);
      } else if (type == 2) {
        rect(x, y, radius, radius);
      }
    }
  }

  favicon.setAttribute(
    "href",
    document.getElementById("defaultCanvas0").toDataURL()
  );
}
