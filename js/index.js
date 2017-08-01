var div = document.querySelector('section .row')
    ,upBotton = document.querySelector('.up-down span')
    ,header = document.querySelector('.page-header .wrapper');
window.onload = function() {
    var spanArr = document.querySelectorAll('.row span');
    spanArr = Array.prototype.slice.call(spanArr);
    var h1 = document.querySelector('.wrapper h1');
    h1.className = 'animated bounce';

    spanArr.forEach(function(span, i) {
        setTimeout(function() {
            span.className = 'animated fadeIn';
        }, (i + 1) * 800);
    });
}
document.addEventListener('mousewheel',handler);

upBotton.addEventListener('click', handler);

function handler(e) {
    if (e.type = 'mousewheel'){
        clearTimeout(handler.timer);
        handler.timer = setTimeout(swipe, 200);
    }else{
        swipe()
    }


}
function swipe(){
    var avatar_show = document.querySelector(".wrapper").style.transform !== "translateY(-300px)"
    if (avatar_show) {

        slideTo('-300px');
        upBotton.style.transform = 'rotate(180deg)';

    } else {
        slideTo('0px');
        upBotton.style.transform = 'rotate(0deg)';
    }
}

function slideTo(px) {
    document.querySelector(".wrapper").style.transform = 'translateY(' + px + ')';

};

function getMargin() {
    var slider = document.querySelector(".page-header>div");
    var base = parseInt(getComputedStyle(slider, null)['margin-top']);
    return base;

}


header.addEventListener('click', function(e) {
    let x = e.pageX, y = e.pageY;
    if(dooot.dots.array.length<50){
        dooot.dots.array.push(new dooot.dot(x*window.devicePixelRatio,y*window.devicePixelRatio,{r:255,g:100,b:100,style:'#f66'}));
    }
});
