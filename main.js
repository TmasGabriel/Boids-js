// main.js
import { Boid } from './boids.js';
import { drawBoid, clearCanvas, drawDir } from './display.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Create boids
let boids = [];
for (let i = 0; i < 50; i++) {
    boids.push(new Boid(Math.random() * canvas.width, Math.random() * canvas.height));
}

// Animation loop
function animate() {
    clearCanvas(ctx, canvas);
    boids.forEach(boid => {
        boid.separation(boids);
        boid.alignment(boids);
        boid.cohesion(boids);
        //boid.sneaky(canvas.width, canvas.height);
        boid.update();
        boid.BounceOffWall(canvas.width, canvas.height);
        drawBoid(ctx, boid);
        drawDir(ctx, boid);
    });
    requestAnimationFrame(animate);
}

animate();