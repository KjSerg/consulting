import 'slick-carousel';

export default class Slick {
    constructor() {
        this.init();
    }

    headSliderInit() {
        const t = this;
        $(document).find('.cases-list').each(function () {
            const $slider = $(this);
            const $prev = $(this).closest('section').find('.slick__prev');
            const $next = $(this).closest('section').find('.slick__next');
            $slider.slick({
                slidesToShow: 1,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: true,
                centerMode: true
            });


        });
    }


    init() {
        const custom = new CustomSlider();
    }
}


class CustomSlider {
    constructor() {
        this.init()
    }

    getCurrentIndex($slider) {
        return $slider.find('.cases-item.current').index();
    }

    setCurrentElemByIndex($slider, index = 0) {
        $slider.find('.cases-item').removeClass('current');
        $slider.find('.cases-item').eq(index).addClass('current');
        return $slider.find('.cases-item').eq(index);
    }

    elementDisplacement($slider, offset) {
        $slider.find('.cases-item').css('transform', `matrix(1, 0, 0, 1, -${offset}, 0)`);
    }

    movement($slider, index = 0, gap = 0) {
        const w = $slider.find('.cases-item').eq(index).outerWidth() + gap;
        const offset = w * index;
        this.elementDisplacement($slider, offset);
        this.setCurrentElemByIndex($slider, index);
    }

    getTransformX($el) {
        const element = $el[0];
        const style = window.getComputedStyle(element);
        const transformValue = style.transform;
        const matrix = transformValue.match(/matrix\(([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^)]+)\)/);
        if (matrix) {
            return parseFloat(matrix[5]);
        }
        return 0;
    }

    init() {
        const _this = this;
        const swipeThreshold = 50;
        $(document).find('.cases-list').each(function () {
            const $slider = $(this);
            const swipeArea = $slider[0];
            let currentIndex = 0;
            let gap = $slider.css('gap');
            gap = parseInt(gap);
            gap = isNaN(gap) ? 0 : gap;
            const $prev = $slider.closest('section').find('.slick__prev');
            const $next = $slider.closest('section').find('.slick__next');
            _this.setCurrentElemByIndex($slider, 0);
            $prev.on('click', function (e) {
                e.preventDefault();
                currentIndex = _this.getCurrentIndex($slider);
                if (currentIndex === 0) return;
                const index = currentIndex - 1;
                _this.movement($slider, index, gap);
            });
            $next.on('click', function (e) {
                e.preventDefault();
                currentIndex = _this.getCurrentIndex($slider);
                if (currentIndex === ($slider.find('.cases-item').length - 1)) return;
                const index = currentIndex + 1;
                _this.movement($slider, index, gap);
            });
        });
    }
}