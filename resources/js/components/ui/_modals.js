export const openModal = ($el) => {
    $el.addClass('active');
    setTimeout(function () {
        $('body').addClass('open-custom-modal');
    });
}
export const closeModal = ($el = false) => {
    if ($el) {
        $el.removeClass('active');
    } else {
        $('.modals .modal').removeClass('active');
    }
    if ($(document).find('.modals .modal.active').length > 0) return;
    $('body').removeClass('open-custom-modal');
}

