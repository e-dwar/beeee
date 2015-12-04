$(function () {

    var PASSIF = 0;
    var VOMISSANT = 1;
    var state = PASSIF;
    var countdown = 0;
    var pts = 0;

    makeUnselectable(document.body);

    $('span').click(function (e) {
        e.preventDefault();
        countdown = 8;
        pts += 1;
    });

    setTimeout(function () {
        if (update()) setTimeout(
            arguments.callee, 1000 / 60
        );
    }, 1000 / 60);

    function update () {
        $('#pts div').width(pts + '%');
        if (pts == 100) {
            $('span').off('click');
            if (state == VOMISSANT) {
                $('img').toggle();
            }
            return false;
        } else if (countdown > 0) {
            countdown--;
            if (state == PASSIF) {
                state = VOMISSANT;
                $('img').toggle();
            }
        } else if (state == VOMISSANT) {
            state = PASSIF;
            $('img').toggle();
        } else if (pts > 0) {
            pts -= 2;
        } else {
            pts = 0;
        }
        return true;
    }
});

function makeUnselectable(node) {
    var child = node.firstChild;
    if (node.nodeType == 1) {
        node.setAttribute('class', 'unselectable');
        node.setAttribute('unselectable', 'on');
    }
    while (child) {
        makeUnselectable(child);
        child = child.nextSibling;
    }
}

