// main.js
import { Boid } from './boids.js';
import { drawBoid, clearCanvas } from './display.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

console.log('Canvas found:', canvas);
console.log('Canvas width:', canvas.width, 'height:', canvas.height);
console.log('Context:', ctx);

// Create boids
let boids = [];
for (let i = 0; i < 10; i++) {
    boids.push(new Boid(Math.random() * canvas.width, Math.random() * canvas.height));
}

console.log('Boids created:', boids.length);

// Animation loop
function animate() {
    console.log('Animating frame');
    clearCanvas(ctx, canvas);
    boids.forEach((boid, index) => {
        console.log(`Updating boid ${index}: x=${boid.pos.x}, y=${boid.pos.y}`);
        boid.update();
        drawBoid(ctx, boid);
    });
    requestAnimationFrame(animate);
}

animate();