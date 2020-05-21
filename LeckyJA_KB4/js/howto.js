var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d');


make_base();

function make_base() {
  base_image = new Image();
  base_image.src = '/img/howto.png';
  base_image.onload = function () {
    context.drawImage(base_image, 225, 170);
  }
}


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "yellow";
ctx.textAlign = "center";
ctx.fillText("Ako sa pohybovať :", canvas.width / 2, canvas.height / 4);