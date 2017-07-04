
var img; // cnn logo
var ar; // aspect ratio of logo

var c; // camera
var w = 160; // width for camera
var h = 120; // height for camera
var u = 4; // upsample for viewing

var clm; // tracker
var fx, fy, fw; // face data
var a = 0.1; // 1-pole smoothing
var b = 1.0-a; // complement

function preload() {
  img = loadImage('cnn.png');
  clm = new clm.tracker();
  clm.init(pModel);
}

function setup() {
  createCanvas(w*u, h*u);

  c = createCapture(VIDEO);
  c.size(w, h);
  c.hide();

  clm.start(c.elt); // start tracker

  ar = img.width/img.height; // this is cnn

  fx = fy = fw = 0;
}

function draw() {
  background(0); // clear

  image(c, 0, 0, c.width*u, c.height*u); // show


  var thestuff = clm.getCurrentPosition(); // point data from tracker

  if(thestuff.length>0) // face is there... update data
  {
    fw = a*(abs(thestuff[14][0]-thestuff[0][0])) + b*fw; // face width
    fx = a*(thestuff[41][0]-(fw/2)) + b*fx;
    fy = a*(thestuff[41][1]-(fw/ar/2)) + b*fy;
    //ellipse(thestuff[41][0]*u, thestuff[41][1]*u, 15, 15);
  }
  image(img, fx*u, fy*u, fw*u, fw/ar*u); // show

}
