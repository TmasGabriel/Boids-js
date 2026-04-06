// boids.js
export class Boid {
    constructor(x, y) {
        this.pos = {
            x: x,
            y: y
        };
        // Add properties like velocity, etc.
    }

    update() {
        this.pos.x++;
        this.pos.y++;
    }
}