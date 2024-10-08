$(window).on('scroll', function () {
    $('.animation-box').each(function () {
        const top_of_element = $(this).offset().top;
        const bottom_of_window = $(window).scrollTop() + $(window).height();
        if (bottom_of_window > top_of_element) {
            $(this).addClass('active');
        }
    });
});
$(document).ready(() => {
    $('.first-animation-box').each(function () {
        const top_of_element = $(this).offset().top;
        const bottom_of_window = $(window).scrollTop() + $(window).height();
        if (bottom_of_window > top_of_element) {
            $(this).addClass('active');
        }
    });
});
