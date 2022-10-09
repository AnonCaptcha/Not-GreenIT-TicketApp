/* Only for highlighting the current tab */
 $(document).ready(function() {
    $('a[href$="' + location.pathname + '"]').addClass('active');
});