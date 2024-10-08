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
    function openNav() {
        $('#overlay').addClass('overlay');
        $('.list').addClass('overlay-content');
        $('body').css('overflow', 'hidden');
        $('.navigation').css('display', 'block');
        $('.closebtn').css('display', 'block');
        $('#overlay').css('width', '100%');
    }
    function closeNav() {
        $('#overlay').css('width', '0%');
        setTimeout(function () {
            $('#overlay').removeClass('overlay');
            $('.list').removeClass('overlay-content');
            $('body').css('overflow', 'auto');
            $('.navigation').css('display', 'none');
            $('.closebtn').css('display', 'none');
        }, 500);
    }
    $(document).on('click', '#open-menu', function () {
        openNav();
    });
    $(document).on('click', '.closebtn', function () {
        closeNav();
    });
});
