$(document).ready(function blink() {
    switchOpacity(0);
})

function switchOpacity(n) {
    if (n%2 == 0) {
        $("#wip").css('opacity', '1');
        $("#wip").css('filter', 'sepia(0%) blur(0px)');
    } else {
        $("#wip").css('opacity', '0.5');
        $("#wip").css('filter', 'sepia(25%) blur(5px)');
    }
    nn = n+1;
    setTimeout('switchOpacity('+nn+')',100);
}

