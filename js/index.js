var ul = document.querySelector('.main-content ul');
ul.addEventListener('mouseover', function(e) {
    e.stopPropagation();

    if (e.target.nodeName == 'A') {
        e.target.nextSibling.className = 'animated fadeIn';
    };
});
ul.addEventListener('mouseout', function(e) {
    e.stopPropagation();

    if (e.target.nodeName == 'A') {
        e.target.nextSibling.className = '';
    };
});