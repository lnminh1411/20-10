$(document).ready(function() {
    let clickCount = 0;
    
    $('.card-container').on('click', function(e) {
        if (!$(e.target).hasClass('next-page')) {
            clickCount++;
            
            if (clickCount === 1) {
                $(this).addClass('flipped');
                
                setTimeout(function() {
                    $('.card-front .text').css('opacity', '0');
                }, 150);
            }
        }
    });
    
    $('.next-page').on('click', function(e) {
        e.stopPropagation();
        $('.card-container').addClass('folded');
        onFolded();
    });
    
    $('#arrow').on('click', function(e) {
        e.preventDefault();
        $('#scroll-indicator').removeClass('show');
        setTimeout(function() {
            $('.scroll-text').remove();
            $('#arrow').css('display', 'none');
        }, 500);
    });
    
    function onFolded() {
        $('#scroll-indicator').addClass('show');
    }
});