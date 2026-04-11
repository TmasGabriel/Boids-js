// main.js
import { Boid } from './boids.js';
import { drawBoid, drawBoidFunny, clearCanvas, drawDir } from './display.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


let frames = 0;
let seconds = 0;
let time = 0;
let maxFrames = 0;
let minFrames = Infinity;
let totalFrames = 0;
let last = performance.now()

function frameTracking() {
    let curr = performance.now(); 
    const dt = curr - last;
    last = curr;
    frames++;
    time += dt;
    if (time >= 1000) {
        seconds++;
        if (frames > maxFrames) {maxFrames = frames;};
        if (frames < minFrames) {minFrames = frames;};
        totalFrames += frames;
        if (seconds == 10) {
            console.log(`Min Frames: ${minFrames}\nMax Frames: ${maxFrames}\nAvg Frames Per Second: ${totalFrames/10}`);
            seconds = 0;
            totalFrames = 0;
        }
        frames = 0;
        time = 0;
    }
}


// Create boids
let boids = [];
for (let i = 0; i < 75; i++) {
    boids.push(new Boid(Math.random() * canvas.width, Math.random() * canvas.height));
}


// Animation loop
function animate() {
    // Framerate tracking
    frameTracking();
    
    // Clear canvas every frame
    clearCanvas(ctx, canvas);

    // Boid processing
    boids.forEach(boid => {
        // Simulation update
        boid.separation(boids);
        boid.alignment(boids);
        boid.cohesion(boids);
        boid.update();
        boid.BounceOffWallGradually(canvas.width, canvas.height);

        // Draw boids
        drawBoid(ctx, boid);
        //drawDir(ctx, boid);
    });
    requestAnimationFrame(animate);
}

animate();