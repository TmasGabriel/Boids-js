// boids.js
export class Boid {
    constructor(inputx, inputy) {
        this.pos = {
            x: inputx,
            y: inputy
        };
        this.vel = {
            x: Math.random() * (2 + 2) - 2,
            y: Math.random() * (2 + 2) - 2
        };
        this.angleRad = Math.atan2(this.vel.x, this.vel.y);
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        console.log(this.angleRad);
    }
}