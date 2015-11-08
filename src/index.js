'use strict';
import {Canvas} from './canvas.js';
class Main {
  init () {
    window.G = Canvas;
  }
}

new Main().init();
