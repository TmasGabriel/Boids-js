// boids.js
export class Boid {
    constructor(inputx, inputy) {
        this.pos = {
            x: inputx,
            y: inputy
        };
        this.vel = {
            x: -1,
            y: .5
        };
        this.angleRad = Math.atan2(this.vel.x, this.vel.y);
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        console.log(this.angleRad);
    }
}