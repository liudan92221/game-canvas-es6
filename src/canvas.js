'use strict';
import {Events} from './event.js';
import {Draw} from './draw.js';

export class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.Draw = Draw;

    this.context.globalAlpha = 1;

    this.w = canvas.width;
    this.h = canvas.height;

    var client = canvas.getBoundingClientRect();
    this.client = {
      x: client.left * (canvas.width/client.width),
      y: client.top * (canvas.height/client.height)
    };

    this.data = null;
    this.init();
  }
  init() {
    this.addEvent();
  }
  addEvent() {
    var _this = this;
    Events.forEach(function(event) {
      _this.on(event.type, function(e) {
        event.cb.call(_this, e);
      });
    });
  }
  getPosition() {
    var canvas = this.canvas;
    var client = canvas.getBoundingClientRect();
    return {
      x: client.left * (canvas.width/client.width),
      y: client.top * (canvas.height/client.height)
    };
  }
  clientX() {
    return this.getPosition().x;
  }
  clientY() {
    return this.getPosition().y;
  }
  createDraw() {
    return new this.Draw(this.canvas, this.context);
  }
  clear() {
    this.context.clearRect(0, 0, this.w, this.h);
    return this;
  }
  resetDraw() {
    var Draws = this.Draw.getDraws();

    this.clear();
    for (var i = 0;i < Draws.length;i++) {
      Draws[i].resetDraw();
    }
  }
  putData(imageData) {
    this.context.putImageData(imageData, 0, 0);
    return this;
  }
  getData() {
    return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }
  saveData() {
    this.data = this.getData();
    return this;
  }
  restoreData() {
    if (this.data) {
      this.putData(this.data);
    }
    return this;
  }
  on(type, cb) {
    var _this = this;
    this.canvas.addEventListener(type, function(e) {
      e.preventDefault();
      cb.call(_this, e);
    }, false);
  }
}
