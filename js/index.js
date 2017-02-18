var div = document.querySelector('section .row');
window.onload = function() {
    var spanArr = document.querySelectorAll('.row span');
    var spanArr = Array.prototype.slice.call(spanArr);
    spanArr.forEach(function(span, i) {
        setTimeout(function() {
            span.className = 'animated fadeIn';
        }, (i + 1) * 800);
    });
}
document.addEventListener('mousewheel', wheelHandler);
div.addEventListener('mouseover', function(e) {
    e.stopPropagation();
    if (e.target.nodeName == 'A') {
        e.target.nextSibling.className = 'animated fadeIn';
    };
});
div.addEventListener('mouseout', function(e) {
    e.stopPropagation();
    if (e.target.nodeName == 'A') {
        e.target.nextSibling.className = '';
    };
});

function wheelHandler(e) {
    e.wheelDelta > 0 ? slideTo('26px') : slideTo('-274px');
}

function slideTo(px) {
    document.querySelector(".page-header>div").style.marginTop = px;

};

function slide(dir) {
    var slider = document.querySelector(".page-header>div");
    var base = parseInt(getComputedStyle(slider, null)['margin-top']);
    dir == 'up' ? base = (base - 300) + 'px' : base = (base + 300) + 'px';
    slider.style.marginTop = base;

}