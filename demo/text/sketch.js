'use strict';
let flag = false;
let maxCol = 0;
let minRow = 0;
const TEXT = '😢'
function init(){
  let canvas = document.querySelector('canvas')
  let ctx = canvas.getContext('2d');
  ctx.fillStyle="#000";
  ctx.fillRect(0,0,400,400);
  ctx.font="100px Georgia";
  ctx.fillStyle="#fff";
  ctx.fillText(TEXT, 80,100);
  maxCol = ctx.measureText(TEXT).width + 80;
  console.log(maxCol)
  canvas.addEventListener('click',function(){
    console.log('click')
    requestAnimationFrame(draw.bind(null, ctx));
  })

  // console.log(ctx.getImageData(0,0, 2,2))
}

function draw(c){
  let imgData = c.getImageData(0,0,maxCol,400);
  imgData = zipImgData(imgData.data);
  let p1, p2, p3, p4, i, j;
  let isGetMin = false;
  if(!flag){
    for(i = 0; i < 399; i+=2){// 行
      for(j = 80; j < maxCol; j+=2){// 列
        p1 = imgData[maxCol*i + j]
        p2 = imgData[maxCol*i + j + 1]
        p3 = imgData[maxCol*(i+1) + j]
        p4 = imgData[maxCol*(i+1) + j + 1]
        let newData = cvtStatus([p1, p2, p3, p4])
        if(newData){
          newData = newData.reduce((d,i) => [...d,i,i,i,255], [])
          let newImageData = new ImageData(new Uint8ClampedArray(newData),2,2)
          c.putImageData(newImageData, j, i)
        }
      }
    }
  } else {
    for(i = 1; i < 399; i+=2){
      for(j = 81; j < maxCol; j+=2){
        p1 = imgData[maxCol*i + j]
        p2 = imgData[maxCol*i + j + 1]
        p3 = imgData[maxCol*(i+1) + j]
        p4 = imgData[maxCol*(i+1) + j + 1]
        let newData = cvtStatus([p1, p2, p3, p4])
        if(newData){
          newData = newData.reduce((d,i) => [...d,i,i,i,255], [])
          let newImageData = new ImageData(new Uint8ClampedArray(newData),2,2)
          c.putImageData(newImageData, j, i)
        }
      }
    }
  }

  flag = !flag
  requestAnimationFrame(draw.bind(null, c));
}
function zipImgData(data){
  return data.filter((v,index) => index%4 === 0)
}
function cvtStatus(state) {
  let status ;
  let [i1, i2, i3, i4] = state;
  if (!i1 && !i2 && !i3 && !i4) {
    return false// 不更新
  }
  else if (i3  && i4) {
    return false// 不更新
  }
  else if (i1 && i2 && !i3 && i4) {
    status = [0,255,255,255]
  }
  else if (i1 && i2 && i3 && !i4) {
    status = [255,0,255,255]
  }
  else if (i1 && !i2 && i3 && !i4) {
    status = [0,0,255,255]
  }
  else if (!i1 && i2 && !i3 && i4) {
    status = [0,0,255,255]
  }
  else if (i1 && i2 && !i3 && !i4) {
    var odd = Math.random();
    if (odd < 0.35) {
      status = [255,255,0,0]
    }
    else {
      status = [0,0,255,255]
    }
  }
  else if (i1) {
    status = [0,0,255,0]
  }
  else if (i2) {
    status = [0,0,0,255]
  }
  else {
    return false
  }
  return status
}
init()