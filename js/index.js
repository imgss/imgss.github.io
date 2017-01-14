var div = document.querySelector('section div');
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