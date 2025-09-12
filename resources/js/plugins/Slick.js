import 'slick-carousel';

export default class Slick {
    constructor() {
        this.init();
    }

    headSliderInit() {
        const t = this;
        $(document).find('.head-slider').each(function () {
            const $slider = $(this);
            const $prev = $(this).closest('section').find('.slick__prev');
            const $next = $(this).closest('section').find('.slick__next');
            const $dots = $(this).closest('section').find('.head-slider-dots');
            $slider.slick({
                slidesToShow: 1,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: true,
                appendDots: $dots
            });


        });
    }

    tripleSliderInit() {
        const t = this;
        $(document).find('.slider-triple').each(function () {
            const $slider = $(this);
            const $prev = $(this).closest('section').find('.slick__prev');
            const $next = $(this).closest('section').find('.slick__next');
            const $dots = $(this).closest('section').find('.slider-dots');
            $slider.slick({
                slidesToShow: 3,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: true,
                appendDots: $dots,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        }
                    },
                    {
                        breakpoint: 700,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });


        });
    }

    init() {
        change_sbi_images_html();
        this.headSliderInit();
        this.tripleSliderInit();
    }
}


function change_sbi_images_html() {
    $(document).find('.instagram-posts').each(function () {
        const $wrap = $(this);
        let html = '';
        const $items = $wrap.find('.sbi_photo');
        $items.each(function () {
            const $item = $(this);
            const href = $item.attr('href');
            const src = $item.attr('data-full-res');
            let temp = `
             <div>
                        <div class="instagram-post" >
                            <a href="${href}" class="instagram-post__image" style="display:block;">
                                <img src="${src}" class="cover" alt="">
                            </a>
                        </div>
                    </div>
            `;
            html = html + temp;
        });
        if (html) {
            $wrap.addClass('slider-triple');
            $wrap.html(html);
        }
    });
}