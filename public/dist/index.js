$(document).ready(function () {
    // Open modal config
    $('#btn-config').on('click', function () {
        $('#modal-config').toggle(400);
        $('body').css('overflow', 'hidden');
    });
    // Close modal btn
    $('#btn-close-config').on('click', function () {
        $('#modal-config').toggle(400);
        $('body').css('overflow', 'auto');
    });
    // Close modal on click in document
    $(window).on('click', function (event) {
        // I don't know why, but Visual Studio Code is showing an error when there isn't any error.
        if (event.target === $('#modal-config').get(0)) {
            $('#modal-config').toggle(400);
            $('body').css('overflow', 'auto');
        }
    });
    // Mask input
    $('.input-money').mask('000.000.000.000.000,00', { reverse: true }); // Mask money
    $('.input-date').mask('00/00'); // Mask date
});
