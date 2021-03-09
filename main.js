var Width = 640;
var Height = 480;
var zoom = 1 / 256;
var factor = 1024;
var Size = 5; // radius of agent aka cursor
var yg = 1 / 32;
var ylimspeed = 8;
var xspeed = 1 / 2048;
var s = 1024;
var ss = 4;
var yspeed, off;

//for reiniting the gameplay when cursor is touched
function restart() {
  stroke("red"); //cursor
  strokeWeight(2);
  let s = min(Height, Width) / 4; // width
  ellipse(Width / 2, Height / 2, s, s);
  strokeWeight(1);
  yspeed = 1;
  off = 2 / (Width * xspeed * zoom) - Height; // obstacles creation
}

function setup() {
  createCanvas(Width, Height); // the canvas size
  noiseSeed(random(1024 * 1024)); // gets several random points to generate obstacles
  restart();
}

function draw() {
  clear();
  stroke("red"); //color of agent
  ellipse(mouseX, mouseY, Size, Size);
  stroke("black"); //color of obstacle
  off += yspeed; // the speed will be increases as the time goes

  yspeed += yspeed > ylimspeed ? 0 : yg;
  for (let y = 0; y < Height; ++y)
    if ((round((off + y) / ss) * ss) % s) {
      let loff = zoom * (off + y); // local off
      if (loff < 0) continue;
      let r = 1 / loff / xspeed; // radius, size
      let c = map(noise(loff), 0, 1, r, width - r); // center
      line(-1, y, c - r, y);
      line(c + r, y, Width, y);
      if (y == mouseY) if (abs(mouseX - c) > r) restart();
    }
}
