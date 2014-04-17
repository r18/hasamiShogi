
X_OFFSET = 10;
Y_OFFSET = 10;
X_LINES = 10;
Y_LINES = 10;
UNIT = 40;
WIDTH = X_LINES * UNIT + X_OFFSET*2;
HEIGHT = Y_LINES * UNIT + Y_OFFSET*2;

function main(){
  cvs = document.getElementById("cvs");
  ctx = cvs.getContext('2d');
  cvs.width = WIDTH;
  cvs.height = HEIGHT;
  init();
  ctx.translate(X_OFFSET,Y_OFFSET);
  drawPiece();
}

function init(){
  ctx.beginPath();
  for(var x = 0; x < X_LINES; ++x){
    ctx.moveTo(X_OFFSET + x * UNIT,Y_OFFSET);
    ctx.lineTo(X_OFFSET + x * UNIT,Y_OFFSET+ (Y_LINES -1) * UNIT);
  }
  for(var y = 0; y < Y_LINES; ++y){
    ctx.moveTo(X_OFFSET ,Y_OFFSET + y * UNIT);
    ctx.lineTo(X_OFFSET + (X_LINES - 1) * UNIT,Y_OFFSET+ y * UNIT);
  }
  ctx.stroke();
}


function setPiece(){

}

function drawPiece(){
  ctx.beginPath();
  ctx.moveTo(UNIT*1/8,UNIT*2/11);
  ctx.lineTo(UNIT*2/8,UNIT*8/11);
  ctx.lineTo(UNIT*4/8,UNIT*9/11);
  ctx.lineTo(UNIT*6/8,UNIT*8/11);
  ctx.lineTo(UNIT*7/8,UNIT*2/11);
  ctx.closePath();
  ctx.stroke();
}

function removePiece() {

}

function check(){

}

function getPiece() {

}

function movePiece(){

}


