
var canvas = document.getElementById('canvas');

var c = new G(canvas);
var polygon = c.createDraw();
c.saveData();

polygon.polygon({
  point: {x: 300, y:300},
  radius: 100,
  sides: 10,
//            startAngle: 1/3 * Math.PI,
  style: {
    color: 'blue',
    lineWidth: 1
  }
//            ,type: 'fill'
});

var state = false;
var startX = null;
var startY = null;
polygon.on('mousedown', function(e) {
  state = true;
  startX = e.clientX;
  startY = e.clientY;
});

c.on('mousemove', function(e) {
  if (!state) {
    return;
  }

  var endX = e.clientX;
  var endY = e.clientY;
  var x = endX - startX;
  var y = endY - startY;

  c.restoreData();
  polygon.move({
    right: x,
    bottom: y
  }).resetDraw();

  startX = endX;
  startY = endY;
});

c.on('mouseup', function() {
  state = false;
});
