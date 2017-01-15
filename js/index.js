var div = document.querySelector('section .row');
window.onload = function() {
    var spanArr = document.querySelectorAll('.row span');
    console.log(spanArr);
    var spanArr = Array.prototype.slice.call(spanArr);
    spanArr.forEach(function(span, i) {
        setTimeout(function() {
            span.className = 'animated fadeIn';
        }, (i + 1) * 800);
    });
}
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