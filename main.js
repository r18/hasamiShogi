
X_OFFSET = 10;
Y_OFFSET = 10;
X_LINES = 10;
Y_LINES = 10;
UNIT = 40;
WIDTH = X_LINES * UNIT + X_OFFSET*2;
HEIGHT = Y_LINES * UNIT + Y_OFFSET*2;

LINE_WIDTH = 2;


PIECELIST = [];
MOVABLES = [];
SELECTED = null; 

function main(){
  cvs = document.getElementById("cvs");
  ctx = cvs.getContext('2d');
  ctx.lineWidth = LINE_WIDTH;
  cvs.width = WIDTH;
  cvs.height = HEIGHT;
  init();
  cvs.onclick = mouseClicked;
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

  for(var i=0; i<9; i++){
    setPiece(i,0,true);
    setPiece(i,8,false);
  }
}


function setPiece(x,y,dir){
  PIECELIST.push({x:x,y:y,dir:dir});
  drawPiece(x,y,dir);
}

function markRed(x,y){
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "red";
  ctx.fillRect(
      X_OFFSET+UNIT*x + LINE_WIDTH,
      Y_OFFSET+UNIT*y + LINE_WIDTH,
      UNIT - LINE_WIDTH * 2 ,
      UNIT - LINE_WIDTH * 2);
  ctx.globalAlpha = 1;
}

function removeTile(x,y){
  ctx.clearRect(
      X_OFFSET+UNIT*x + LINE_WIDTH,
      Y_OFFSET+UNIT*y + LINE_WIDTH,
      UNIT - LINE_WIDTH * 2 ,
      UNIT - LINE_WIDTH * 2);
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
    ctx.translate(UNIT,UNIT);
    ctx.rotate(-Math.PI);
  }
  ctx.translate(-dX,-dY);
}

function check(){

}

function getPiece(x,y) {
  for(var i in PIECELIST){
    var p = PIECELIST[i];
    if(p.x == x && p.y == y)return p;
  }
  return -1;
}

function movePiece(){

}

function getMovement(x,y,dir){
  MOVABLES = [];

  var nx = collectSpace(x,y,dir,-1,0,[]);
  var ny = collectSpace(x,y,dir,0,-1,[]);
  var px = collectSpace(x,y,dir,1,0,[]);
  var py = collectSpace(x,y,dir,0,1,[]);

  if(nx.length > 0)MOVABLES.push.apply(MOVABLES,nx);
  if(px.length > 0)MOVABLES.push.apply(MOVABLES,px);
  if(ny.length > 0)MOVABLES.push.apply(MOVABLES,ny);
  if(py.length > 0)MOVABLES.push.apply(MOVABLES,py);

  markRedWithArray(nx);
  markRedWithArray(px);
  markRedWithArray(ny);
  markRedWithArray(py);

}

function markRedWithArray(array) {
  for(var a in array){
    var p = array[a];
    markRed(p.x,p.y);
  }
}

function collectSpace(x,y,dir,dx,dy,res) {
  console.log(x,y);
  x += dx;
  y += dy;
  console.log(x,y);
  if(x < 0 || x > 8 || y < 0 || y > 8){
    return res;
  }
  if(getPiece(x,y) == -1){
    res.push({x:x,y:y,dir:dir});

  } else {
    return res;
  }
  return collectSpace(x,y,dir,dx,dy,res);
}

function isMovable(x,y) {
  if(MOVABLES.length == 0) return false;
  for(var i in MOVABLES){
    var p = MOVABLES[i];
    if(p.x == x && p.y == y)return true;
  }
  return false;
}

function removeMarkedTile() {
  for(var i in MOVABLES){
    var p = MOVABLES[i];
    removeTile(p.x,p.y);
  }
}

function removePieceFromPieceList(x,y) {
 for(var i in PIECELIST){
    var p = PIECELIST[i];
    if(p.x == x && p.y == y){
      PIECELIST.splice(i,1);
      return true;
    }
 }
 return false;
}

function mouseClicked(e){
  var x = Math.floor((e.clientX - X_OFFSET*2)/UNIT);
  var y = Math.floor((e.clientY - Y_OFFSET*2)/UNIT);
  if(!SELECTED){ 
    var p = getPiece(x,y);
    if(p != -1){
      SELECTED = p;
      getMovement(x,y,true);
    } 
  } else {
    if(isMovable(x,y)){
      removeMarkedTile();
      removeTile(SELECTED.x,SELECTED.y);
      setPiece(x,y,SELECTED.dir);
      removePieceFromPieceList(SELECTED.x,SELECTED.y);
      SELECTED = null; 
    }
  }
}


