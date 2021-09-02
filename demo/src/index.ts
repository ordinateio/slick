import 'animate.css';

import './index.scss';

import '../../src/index.scss';
import {Slick} from '../../src';

let slick = new Slick();

slick.slider('.slider');
slick.carousel('.carousel', {dots: true});
