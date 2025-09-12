import {isJsonString, showPreloader} from "../utils/_helpers";
import {showMsg} from "../../plugins/_fancybox-init";

export function sendRequestClickListener() {
    $(document).on('click', '.send-request-on-click', function (e) {
        e.preventDefault();
        const $t = $(this);
        const action = $t.attr('data-action');
        const type = $t.attr('data-method') || "POST";
        if (action === undefined) return;
        const url = $t.attr('href') === '#' ? adminAjax : $t.attr('href');
        $t.addClass('not-active');
        $('body').addClass('loading');
        let data = getData($t);
        const args = {
            type,
            url,
            data,
        };
        $.ajax(args).done((response) => {
            responser(response, $t);
        });
    });
}

function getData($element) {
    const dataAttr = $element.data();
    let data = {};
    Object.keys(dataAttr).forEach(key => {
        data[key] = $element.attr('data-' + key);
    });
    return data;
}

function responser(response, $t) {
    $t.removeClass('not-active');
    $('body').removeClass('loading');
    const isActive = $t.hasClass('active');
    if (response) {
        const isJson = isJsonString(response);
        if (isJson) {
            const data = JSON.parse(response);
            const message = data.msg || '';
            const type = data.type || '';
            const url = data.url || '';
            const reload = data.reload || '';
            let likes = data.likes || {};
            if (likes && Object.keys(likes).length > 0) {
                if (isActive) {
                    $t.removeClass('active');
                    $t.attr('data-is_liked', 0);
                } else {
                    $t.addClass('active');
                    $t.attr('data-is_liked', 1);
                }
                Object.keys(likes).forEach(id => {
                    const articleLike = likes[id] || 0;
                    $(document).find('.like[data-id="' + id + '"] .like-counter').each(function () {
                        $(this).text(articleLike);
                    });
                });
            }
            if (message) {
                showMsg(message, url);
            } else {
                if (url) {
                    showPreloader();
                    window.location.href = url;
                    return;
                }
            }
            if (reload === 'true') {
                if (message) {
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                    return;
                }
                window.location.reload();
            }
        } else {
            showMsg(response);
        }

    }
}
