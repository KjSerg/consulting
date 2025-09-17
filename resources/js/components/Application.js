import {copyToClipboard, detectBrowser, hidePreloader, isJsonString, isMobile, showPreloader} from "./utils/_helpers";
import {burger} from "./ui/_burger";
import {accordion} from "./ui/_accardion";
import {initTelMask, numberInput} from "./forms/_number-input";
import {showPassword} from "./forms/_show-password";
import {fancyboxInit, showMsg, showNotices} from "../plugins/_fancybox-init";
import {selectrickInit} from "../plugins/_selectric-init";
import Slick from "../plugins/Slick";
import {tabs} from "./ui/_tabs";
import {sendRequestClickListener} from "./ui/_request-on-click";
import {closeModal, openModal} from "./ui/_modals";


export default class Application {
    constructor() {
        this.$doc = $(document);
        this.$body = $("body");
        this.parser = new DOMParser();
        this.init();
    }

    init() {
        this.initBrowserAttributes();
        this.initComponents();
    }

    showLoaderOnClick() {
        this.$doc.on('click', 'a.show-load, .header a, .footer a', function (e) {
            let test = $(this).attr('href').includes('#') || $(this).attr('href').includes('tel') || $(this).attr('href').includes('mailto');
            if (!test) showPreloader();
        });
    }

    initBrowserAttributes() {
        const browserName = detectBrowser();
        this.$body.attr("data-browser", browserName).addClass(browserName);

        if (isMobile) {
            this.$body.attr("data-mobile", "mobile");
        }
    }

    initComponents() {
        this.$doc.ready(() => {
            burger();
            accordion();
            numberInput();
            showPassword();
            selectrickInit();
            fancyboxInit();
            this.showLoaderOnClick();
            this.linkListener();
            const slider = new Slick();
        });
    }

    linkListener() {
        const t = this;
        sendRequestClickListener();
        tabs();
        this.$doc.on('click', 'a[href*="#"]:not(.fancybox, .tabs-head__item)', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if (href === '#') return;
            const hashValue = href.split('#')[1];
            if (hashValue !== undefined) {
                const $el = t.$doc.find('#' + hashValue);
                if ($el.length > 0) {
                    $('html, body').animate({
                        scrollTop: $el.offset().top
                    });
                    return;
                }
            }
            window.location.href = href;
        });
        this.$doc.on('click', '[data-link]', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('data-link');
            if (href === '#') return;
            const hashValue = href.split('#')[1];
            if (hashValue !== undefined) {
                const $el = t.$doc.find('#' + hashValue);
                if ($el.length > 0) {
                    $('html, body').animate({
                        scrollTop: $el.offset().top
                    });
                    return;
                }
            }
            window.location.href = href;
        });
        this.$doc.on('click', '.applications-head__item', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if ($(window).width() <= 450) {
                if ($t.hasClass('active')) {
                    $t.closest('.applications-head').find('.applications-head__item').slideDown();
                    return;
                }
            }
            if (href === '#') return;
            window.location.href = href;
        });
        this.$doc.on('click', '.copy-link-js', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if (href === '#') return;
            copyToClipboard(href);
            showMsg(copiedString);
        });
        $(document).on('click', '.pagination-js a', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if (href === undefined || href === '') return;
            $t.addClass('not-active');
            showPreloader();
            $.ajax({
                type: 'GET',
                url: href,

            }).done(function (r) {
                hidePreloader();
                $t.removeClass('not-active');
                if (!r) return;
                const parser = new DOMParser();
                const $r = $(parser.parseFromString(r, "text/html"));
                const $pagination = $r.find('.pagination-js');
                const $catalog = $r.find('.container-js');
                $(document).find('.pagination-js').html($pagination.html());
                $(document).find('.container-js').append($catalog.html());
            });
        });
        $(document).on('click', '.header-container-mobile .menu-item-has-children', function (e) {
            e.preventDefault();
            const $t = $(this);
            const $wrapper = $t;
            let $container = $('.header-container-mobile .sub-container');
            if ($container.length === 0) {
                $('.header-container-mobile').append('<div class="sub-container"></div>');
                $container = $(document).find('.header-container-mobile .sub-container');
            }
            $container.html($wrapper.html());
            $container.closest('.sub-container-wrapper').addClass('active');
            $('body').addClass('open-sub-container-wrapper');
        });
        $(document).on('click', '.close-sub-container', function (e) {
            e.preventDefault();
            $(document).find('.sub-container-wrapper').removeClass('active');
            $('body').removeClass('open-sub-container-wrapper');
        });
        $(document).on('click', '.open-custom-modal', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href') || '#';
            if(href === '#') return;
            const $el = $(document).find(href);
            if($el.length === 0) return;
            openModal($el);
        });
        $(document).on('click', '.close-custom-modal', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href') || '#';
            let $el = $(document).find(href);
            if($el.length === 0) $el = false;
            closeModal($el);
        });
        $(document).on('click', '.open-custom-modal .modals', function (e) {
            e.preventDefault();
            closeModal();
        });

    }
}