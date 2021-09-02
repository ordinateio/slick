import {default as $} from 'jquery';
import 'slick-carousel';

export type SlickProperties = JQuerySlickOptions;
export type SlickSliderProperties = Partial<JQuerySlickOptions>;
export type SlickCarouselProperties = Partial<JQuerySlickOptions>;

export class Slick {
    /**
     * Default properties.
     *
     * @private
     */
    private readonly properties: SlickProperties = {
        arrows: true,
        dots: false,
        infinite: true,
        variableWidth: true,
        adaptiveHeight: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        prevArrow: '<div class="slick-slider__arrow slick-slider__arrow--prev"></div>',
        nextArrow: '<div class="slick-slider__arrow slick-slider__arrow--next"></div>',
        dotsClass: 'slick-slider__dots',
        rows: 0,
    };

    /**
     * Properties of the 'slider' preset.
     *
     * @private
     */
    private readonly sliderProperties: SlickSliderProperties = {
        fade: false,
    };

    /**
     * Properties of the 'carousel' preset.
     *
     * @private
     */
    private readonly carouselProperties: SlickCarouselProperties = {
        speed: 300,
    };

    /**
     * Slick constructor.
     *
     * @param properties
     */
    constructor(properties: SlickProperties = {}) {
        this.properties = {
            ...this.properties,
            ...properties,
        };
    }

    /**
     * Slider preset.
     *
     * @param selector
     * @param properties
     */
    slider(selector: string, properties: SlickProperties = {}): void {
        let target = $(selector);

        this.setEvents(target);
        target.slick({
            ...this.properties,
            ...this.sliderProperties,
            ...properties,
        });
    }

    /**
     * Carousel preset.
     *
     * @param selector
     * @param properties
     */
    carousel(selector: string, properties: SlickProperties = {}) {
        let target = $(selector);

        this.setEvents(target);
        target.slick({
            ...this.properties,
            ...this.carouselProperties,
            ...properties,
        });
    }

    /**
     * Sets event handlers.
     *
     * @param element
     * @private
     */
    private setEvents(element: JQuery<HTMLElement>): void {
        element.on('init', () => {
            let current = element.find('.slick-current [data-animation]');

            Slick.setClasses(element);
            this.addAnimation(current);
        });

        element.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
            let next = element.find(`[data-slick-index='${nextSlide}'] [data-animation]`);

            this.addAnimation(next);
        });
    }

    /**
     * Adds animation.
     *
     * @param elements
     * @private
     */
    private addAnimation(elements: JQuery<HTMLElement>): void {
        for (let element of elements) {
            let animate = [
                'animate__animated',
                `animate__${element.getAttribute('data-animation')}`,
            ];

            element.style.animationDelay = element.getAttribute('data-animation-delay') ?? `${this.properties.speed}ms`;
            element.style.animationDuration = element.getAttribute('data-animation-duration') ?? `${this.properties.speed}ms`;
            element.classList.add(...animate);

            element.addEventListener('animationend', () => element.classList.remove(...animate), {
                once: true,
            });
        }
    }

    /**
     * Sets custom classes for slick.
     *
     * @param element
     * @private
     */
    private static setClasses(element: JQuery<HTMLElement>) {
        element.find('.slick-list').addClass('slick-slider__list');
        element.find('.slick-track').addClass('slick-slider__track');
        element.find('.slick-slide').addClass('slick-slider__slide');
    }
}
