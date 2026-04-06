// display.js
export function drawBoid(ctx, boid) {
    // Drawing logic for a single boid
    ctx.beginPath();
    ctx.arc(boid.pos.x, boid.pos.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
}

export function clearCanvas(ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}