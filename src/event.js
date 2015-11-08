'use strict';
const fns = [
  {
    type: 'mousedown',
    cb: function (e) {
      var _this = this;
      var Draws = this.Draw.getDraws();
      Draws.forEach(function (item) {
        if (item.event && item.event['mousedown'] && item.event['mousedown'].length) {
          let client = _this.getPosition();
          let x = e.clientX - client.x;
          let y = e.clientY - client.y;

          if (item.isPointInPath(x, y)) {
            item.event['mousedown'].forEach(function (cb) {
              cb.call(item, e);
            });
          }
        }
      });
    }
  },
  {
    type: 'mouseup',
    cb: function () {

    }
  },
  {
    type: 'mousemove',
    cb: function () {

    }
  },
  {
    type: 'mouseover',
    cb: function () {

    }
  },
  {
    type: 'mouseenter',
    cb: function () {

    }
  }
];
export var Events = fns;
