"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slick = void 0;
require("slick-carousel");
/**
 * Adaptation for Slick.
 * Slider and carousel presets with support for additional animations.
 *
 * @see slider
 * @see carousel
 *
 * Slick:
 * [Github]{@link https://github.com/callisto2410/modstrap-slick}
 *
 * Slick Carousel:
 * [Github]{@link https://github.com/kenwheeler/slick}
 * [Homepage]{@link https://kenwheeler.github.io/slick/}
 */
class Slick {
    /**
     * Default settings.
     *
     * @param properties
     */
    static set defaults(properties) {
        this._defaults = {
            ...this._defaults,
            ...properties,
        };
    }
    /**
     * Default settings for the slider.
     *
     * @param properties
     */
    static set sliderDefaults(properties) {
        this._sliderDefaults = {
            ...this._sliderDefaults,
            ...properties,
        };
    }
    /**
     * Default settings for the carousel.
     *
     * @param properties
     */
    static set carouselDefaults(properties) {
        this._carouselDefaults = {
            ...this._carouselDefaults,
            ...properties,
        };
    }
    /**
     * Preset for the slider.
     *
     * @param selector
     * @param properties
     */
    static slider(selector, properties) {
        const $element = $(selector);
        this.setEvents($element);
        $element.slick({
            ...this._defaults,
            ...this._sliderDefaults,
            ...properties,
        });
    }
    /**
     * Preset for the carousel.
     *
     * @param selector
     * @param properties
     */
    static carousel(selector, properties) {
        const $element = $(selector);
        this.setEvents($element);
        $element.slick({
            ...this._defaults,
            ...this._carouselDefaults,
            ...properties,
        });
    }
    /**
     * Sets events to control the animation.
     *
     * @param element
     * @private
     */
    static setEvents(element) {
        element.on("init", () => {
            const selector = ".slick-current [data-slick-animation]";
            const $elements = element.find(selector);
            this.toggleAnimation($elements);
        });
        element.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
            const selector = `[data-slick-index="${nextSlide}"] [data-slick-animation]`;
            const $elements = element.find(selector);
            this.toggleAnimation($elements);
        });
    }
    /**
     * Applies animation to the slide
     *
     * @param elements
     * @private
     */
    static toggleAnimation(elements) {
        var _a, _b;
        for (const element of elements) {
            const animate = [
                "animate__animated",
                "animate__" + element.getAttribute("data-slick-animation"),
            ];
            const delay = (_a = element.getAttribute("data-slick-animation-delay")) !== null && _a !== void 0 ? _a : this._defaults.speed + "ms";
            const duration = (_b = element.getAttribute("data-slick-animation-duration")) !== null && _b !== void 0 ? _b : this._defaults.speed + "ms";
            element.style.animationDelay = delay;
            element.style.animationDuration = duration;
            element.classList.add(...animate);
            element.addEventListener("animationend", () => element.classList.remove(...animate), {
                once: true,
            });
        }
    }
}
exports.Slick = Slick;
/**
 * Default settings.
 *
 * @private
 */
Slick._defaults = {
    arrows: true,
    dots: false,
    infinite: true,
    variableWidth: true,
    adaptiveHeight: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 600,
    prevArrow: "<div class='slick-prev'></div>",
    nextArrow: "<div class='slick-next'></div>",
    rows: 0,
};
/**
 * Default settings for the slider.
 *
 * @private
 */
Slick._sliderDefaults = {
    fade: false,
};
/**
 * Default settings for the carousel.
 *
 * @private
 */
Slick._carouselDefaults = {
    speed: 300,
};
exports.default = Slick;
