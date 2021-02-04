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
 * Slick Carousel:
 * [Github]{@link https://github.com/kenwheeler/slick}
 * [Homepage]{@link https://kenwheeler.github.io/slick/}
 */
export declare class Slick {
    /**
     * Default settings.
     *
     * @private
     */
    private static _defaults;
    /**
     * Default settings.
     *
     * @param properties
     */
    static set defaults(properties: SlickProperties);
    /**
     * Default settings for the slider.
     *
     * @private
     */
    private static _sliderDefaults;
    /**
     * Default settings for the slider.
     *
     * @param properties
     */
    static set sliderDefaults(properties: SlickProperties);
    /**
     * Default settings for the carousel.
     *
     * @private
     */
    private static _carouselDefaults;
    /**
     * Default settings for the carousel.
     *
     * @param properties
     */
    static set carouselDefaults(properties: SlickProperties);
    /**
     * Preset for the slider.
     *
     * @param selector
     * @param properties
     */
    static slider(selector: string, properties?: Partial<SlickProperties>): void;
    /**
     * Preset for the carousel.
     *
     * @param selector
     * @param properties
     */
    static carousel(selector: string, properties?: Partial<SlickProperties>): void;
    /**
     * Sets events to control the animation.
     *
     * @param element
     * @private
     */
    private static setEvents;
    /**
     * Applies animation to the slide
     *
     * @param elements
     * @private
     */
    private static toggleAnimation;
}
export default Slick;
