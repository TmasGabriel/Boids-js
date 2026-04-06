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
        this.angleRad = Math.atan2(this.vel.x, this.vel.y);
    }

    separation(boids) {
        for (let i = 0; i < boids.length; i++) {
            for (let j = i + 1; j < boids.length; j++) {
                let distance = Math.sqrt((boids[j].pos.x - boids[i].pos.x)**2 + (boids[j].pos.y - boids[i].pos.y)**2);
                if (distance < 100) {
                    let angle = Math.atan2(boids[j].pos.y - boids[i].pos.y, boids[j].pos.x - boids[i].pos.x);
                    boids[i].vel.x -= Math.cos(angle) * 0.05;
                    boids[i].vel.y -= Math.sin(angle) * 0.05;
                    boids[j].vel.x += Math.cos(angle) * 0.05;
                    boids[j].vel.y += Math.sin(angle) * 0.05;
                }
            }
        }
    }

    alignment(boids) {
    
    }
}