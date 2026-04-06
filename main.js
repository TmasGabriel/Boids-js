import {draw_boid} from './display.js';

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function animate() {
    draw_boid(canvas, ctx);
    requestAnimationFrame(animate);
}

animate();