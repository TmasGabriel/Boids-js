// display.js
export function drawBoid(ctx, boid) {
    let cos = Math.cos(boid.angleRad);
    let sin = Math.sin(boid.angleRad);

    // Drawing logic for a single boid
    ctx.beginPath();
    ctx.moveTo((cos * 9) + boid.pos.x, (sin * 9) + boid.pos.y);
    ctx.lineTo((-sin * 3) + boid.pos.x, (cos * 3) + boid.pos.y); // could do sin(theta + 90) and cos(theta + 90)
    ctx.lineTo((sin * 3) + boid.pos.x, (-cos * 3) + boid.pos.y); // and sin(theta - 90) and cos(theta - 90)
    ctx.closePath();
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
    ctx.lineTo(boid.pos.x + (40 * Math.cos(boid.angleRad)), boid.pos.y + (40 * Math.sin(boid.angleRad)));
    ctx.strokeStyle = "red";
    ctx.stroke();
}