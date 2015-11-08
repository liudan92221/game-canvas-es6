var canvas = document.getElementById('canvas');

var c = new G(canvas);
var arc = c.createDraw();

var state = false;
var x = null;
var y = null;
c.on('mousedown', function(e) {
  this.restoreData().saveData();
  var client = this.getPosition();
  x = e.clientX - client.x;
  y = e.clientY - client.y;
  state = true;
});

c.on('mousemove', function(e) {
  if (!state) return;

  this.restoreData();
  var client = this.getPosition();
  var _x = e.clientX - client.x;
  var _y = e.clientY - client.y;

  var w = Math.abs(x - _x);
  var h = Math.abs(y - _y);

  var r = Math.sqrt(w*w + h*h);

  arc.arc({
    point: {x: 0, y: 0},
    radius: r,
//                width: 10,
    style: {
      color: 'blue',
      lineWidth: 1
    }
    ,transform: {
      translate: {x: x, y: y}
    }
//                ,type: 'fill'
//                shadow: {
//                    color: '#000000',
//                    offsetX: 20,
//                    offsetY: 20,
//                    blur: 5
//                }
  });
});

c.on('mouseup', function(e) {
  state = false;
  this.restoreData();
  var client = this.getPosition();
  var _x = e.clientX - client.x;
  var _y = e.clientY - client.y;

  var w = Math.abs(x - _x);
  var h = Math.abs(y - _y);

  var r = Math.sqrt(w*w + h*h);

  arc.arc({
    point: {x: 0, y: 0},
    radius: r,
    style: {
      color: 'blue',
      lineWidth: 1
    }
    ,transform: {
      translate: {x: x, y: y}
    }
//                ,type: 'fill'
  });
  this.saveData();
});
