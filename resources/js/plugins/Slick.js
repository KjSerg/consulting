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
        const $dots = $slider.closest('.custom-slider-wrapper').find('.custom-slider__dots');
        $slider.find('.cases-item').removeClass('current');
        $slider.find('.cases-item').eq(index).addClass('current');
        if($dots.length > 0){
            $dots.find('.custom-slider__dot').removeClass('active');
            $dots.find('.custom-slider__dot').eq(index).addClass('active');
        }
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

    cloneElements($slider) {
        let cloneCount = $slider.attr('data-clone') || 0;
        cloneCount = parseInt(cloneCount);
        if (isNaN(cloneCount)) return;
        if (cloneCount <= 0) return;
        let html = $slider.html();
        let newHTML = '';
        for (let a = 1; a <= cloneCount; a++) {
            newHTML += html;
        }
        $slider.html(newHTML);
    }

    addDots($slider) {
        const length = $slider.find('.cases-item').length;
        if (length === 0) return;
        let html = '';
        for (let a = 0; a < length; a++) {
            let cls = a === 0 ? 'active' : '';
            html += '<span class="custom-slider__dot '+cls+'"></span>';
        }
        html = '<span class="custom-slider__dots">' + html + '</span>';
        let $wrapper = $slider.closest('section').find('.custom-slider-wrapper');
        if ($wrapper.length === 0) {
            $slider.wrap("<div class='custom-slider-wrapper'></div>");
            $wrapper = $slider.closest('section').find('.custom-slider-wrapper');
        }
        $wrapper.append(html);
    }

    init() {
        const _this = this;
        $(document).find('.custom-slider').each(function () {
            const $slider = $(this);
            _this.cloneElements($slider);
            _this.addDots($slider);
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
                let index = currentIndex - 1;
                if (currentIndex === 0) {
                    index = $slider.find('.cases-item').length - 1;
                }
                _this.movement($slider, index, gap);
            });
            $next.on('click', function (e) {
                e.preventDefault();
                currentIndex = _this.getCurrentIndex($slider);
                let index = currentIndex + 1;
                if (currentIndex === ($slider.find('.cases-item').length - 1)) {
                    index = 0;
                }
                _this.movement($slider, index, gap);
            });
        });
        $(document).on('click','.custom-slider__dot', function (e) {
            e.preventDefault();
            const $t = $(this);
            const $slider = $t.closest('.section').find('.custom-slider');
            let gap = $slider.css('gap');
            gap = parseInt(gap);
            gap = isNaN(gap) ? 0 : gap;
            let currentIndex = _this.getCurrentIndex($slider);
            let index = $t.index();
            _this.movement($slider, index, gap);
        });
    }
}