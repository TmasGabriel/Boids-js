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

export function drawDir(ctx, boid) {
    ctx.beginPath();
    ctx.moveTo(boid.pos.x, boid.pos.y);
    ctx.lineTo(boid.pos.x + (40 * Math.sin(boid.angleRad)), boid.pos.y + (40 * Math.cos(boid.angleRad)));
    ctx.strokeStyle = "red";
    ctx.stroke();
}