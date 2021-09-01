import "slick-carousel";

export interface SlickProperties extends JQuerySlickOptions {
}

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
 * Slick-carousel:
 * [Github]{@link https://github.com/kenwheeler/slick}
 * [Homepage]{@link https://kenwheeler.github.io/slick/}
 */
export class Slick {
    /**
     * Default settings.
     *
     * @private
     */
    private static _defaults: SlickProperties = {
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
    }

    /**
     * Default settings.
     *
     * @param properties
     */
    static set defaults(properties: SlickProperties) {
        this._defaults = {
            ...this._defaults,
            ...properties,
        }
    }

    /**
     * Default settings for the slider.
     *
     * @private
     */
    static _sliderDefaults: SlickProperties = {
        fade: false,
    }

    /**
     * Default settings for the slider.
     *
     * @param properties
     */
    static set sliderDefaults(properties: SlickProperties) {
        this._sliderDefaults = {
            ...this._sliderDefaults,
            ...properties,
        }
    }

    /**
     * Default settings for the carousel.
     *
     * @private
     */
    private static _carouselDefaults: SlickProperties = {
        speed: 300,
    }

    /**
     * Default settings for the carousel.
     *
     * @param properties
     */
    static set carouselDefaults(properties: SlickProperties) {
        this._carouselDefaults = {
            ...this._carouselDefaults,
            ...properties,
        }
    }

    /**
     * Preset for the slider.
     *
     * @param selector
     * @param properties
     */
    static slider(selector: string, properties?: Partial<SlickProperties>): void {
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
    static carousel(selector: string, properties?: Partial<SlickProperties>): void {
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
    private static setEvents(element: JQuery<HTMLElement>): void {
        element.on("init", () => {
            const selector = ".slick-current [data-slick-animation]";
            const $elements = element.find(selector);

            this.toggleAnimation($elements);
        });

        element.on("beforeChange", (event: JQuery.TriggeredEvent, slick: JQuerySlick, currentSlide: number, nextSlide: number) => {
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
    private static toggleAnimation(elements: JQuery<HTMLElement>): void {
        for (const element of elements) {
            const animate = [
                "animate__animated",
                "animate__" + element.getAttribute("data-slick-animation"),
            ];
            const delay = element.getAttribute("data-slick-animation-delay") ?? this._defaults.speed + "ms";
            const duration = element.getAttribute("data-slick-animation-duration") ?? this._defaults.speed + "ms";

            element.style.animationDelay = delay;
            element.style.animationDuration = duration;
            element.classList.add(...animate);

            element.addEventListener("animationend", () => element.classList.remove(...animate), {
                once: true,
            });
        }
    }
}

export default Slick;
