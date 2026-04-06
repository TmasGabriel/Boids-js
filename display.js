

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.beginPath();
ctx.arc(150, 150, 3, 0, 2 * Math.PI);
ctx.fillStyle = 'white';
ctx.fill();

ctx.beginPath();
ctx.moveTo(150, 150);
ctx.lineTo(160, 160);
ctx.lineWidth = 1;
ctx.strokeStyle = 'red';
ctx.stroke();

export function draw_boid(canvas, ctx) {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(dx, dy, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
}

