let e = document.getElementById("email");
let n = document.getElementById("name");
let fname = localStorage.getItem("name");
let email = localStorage.getItem("email");
const image = localStorage.getItem("avartar");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
const d = Date();

const prop = {
  w: window.innerWidth > 500 ? 450 : 350,
  h: 200,
};

canvas.width = prop.w;
canvas.height = prop.h;

document.addEventListener("DOMContentLoaded", (event) => {
  img.onload = () => {
    drawTicket();
  };
  img.src = image;
  n.innerText = `${fname}!`;
  e.innerText = email;
});

function drawTicket() {
  const gradient = ctx.createLinearGradient(prop.w, 0, 200, 10);
  const cutOutDistance = 19;
  const distX = prop.w - 100;
  const distY = 26;
  gradient.addColorStop(0, "rgba(255,255,255,0.23)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.3)");

  const strokeGradient = ctx.createLinearGradient(0, 0, prop.w, 0);
  strokeGradient.addColorStop(0, "rgba(255, 255,255,0.6)"); // Start red
  strokeGradient.addColorStop(1, "rgba(243,116,99,1)"); // End blue

  ctx.drawImage(img, 20, 130, 60, 60);

  ctx.font = "lighter 30px Inconsolata-VariableFont";
  ctx.fillStyle = "white";
  ctx.fillText("Coding Conf", 20, 40);

  ctx.font = "25px Inconsolata-VariableFont";
  ctx.fillStyle = "white";
  ctx.fillText(fname, 90, 150);

  ctx.strokeStyle = strokeGradient;
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.roundRect(0, 0, prop.w, prop.h, 10);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();

  ctx.moveTo(distX, 0);
  ctx.quadraticCurveTo(prop.w - 80, 25, prop.w - 60, 0);
  ctx.stroke();

  ctx.moveTo(distX, prop.h);
  ctx.quadraticCurveTo(prop.w - 80, 175, prop.w - 60, prop.h);
  ctx.stroke();

  ctx.fillStyle = "#050128";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(distX, distY);
  ctx.fillStyle = "#6C6B7B";
  for (let i = 0; i < 150; i += cutOutDistance) {
    ctx.fillRect(distX + 15, distY + i, 2.5, 13);
  }
  const r = generateRandomStr()

  
  const textX = prop.w - 55;
  const textY = prop.h * 0.3;

  ctx.translate(textX, textY);

  ctx.rotate((90 * Math.PI) / 180);
  ctx.font = "25px Inconsolata-VariableFont";
  ctx.fillStyle = "#6C6B7B";
  // ctx.rotate(-Math.PI / 2);
  ctx.fillText(r, 0,0);

}

function generateRandomStr(){
    let str = "#"
    for(let i=0;i<5;i++){
        let r = Math.floor(Math.random() * 10)
        str += r
    }
    return str
}
