
X_OFFSET = 10;
Y_OFFSET = 10;
X_LINES = 10;
Y_LINES = 10;
UNIT = 40;
WIDTH = X_LINES * UNIT + X_OFFSET*2;
HEIGHT = Y_LINES * UNIT + Y_OFFSET*2;


PIECELIST = [];

function main(){
  cvs = document.getElementById("cvs");
  ctx = cvs.getContext('2d');
  cvs.width = WIDTH;
  cvs.height = HEIGHT;
  init();
  cvs.onclick = function(e){
   console.log(e);
    var x = Math.floor((e.clientX - X_OFFSET*2)/UNIT);
    var y = Math.floor((e.clientY - Y_OFFSET*2)/UNIT);
    markRed(x,y);
  };
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


function setPiece(x,y,dir){
  PIECELIST.push({x:x,y:y,dir:dir});
  drawPiece(x,y,dir);
}

function markRed(x,y){
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "red";
  ctx.fillRect(X_OFFSET+UNIT*x,Y_OFFSET+UNIT*y,UNIT,UNIT);
  ctx.globalAlpha = 1;
}

function drawPiece(x,y,rotated){
  var dX = X_OFFSET + x * UNIT;
  var dY = Y_OFFSET + y * UNIT;
  ctx.translate(dX,dY);
  if(rotated){
    ctx.rotate(Math.PI);
    ctx.translate(-UNIT,-UNIT);
  }
  ctx.font = UNIT/2+"px san-serif";
  ctx.fillText("歩",UNIT/4,UNIT*2/3);
  ctx.beginPath();
  ctx.moveTo(UNIT*1/8,UNIT*9/11);
  ctx.lineTo(UNIT*2/8,UNIT*3/11);
  ctx.lineTo(UNIT*4/8,UNIT*2/11);
  ctx.lineTo(UNIT*6/8,UNIT*3/11);
  ctx.lineTo(UNIT*7/8,UNIT*9/11);
  ctx.closePath();
  ctx.stroke();
  if(rotated){
    ctx.rotate(-Math.PI);
  }
  ctx.translate(-dX,-dY);
}

function removePiece() {

}

function check(){

}

function getPiece() {

}

function movePiece(){

}


