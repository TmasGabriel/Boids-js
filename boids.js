// boids.js
let separationCoef = .005;
let alignmentCoef = .0025;
let cohesionCoef = .0005;
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
        this.angleRad = Math.atan2(this.vel.y, this.vel.x);
        this.maxVel = 4;
        this.minVel = -4;
    }

    update() {
        if (this.vel.x >= this.maxVel) {
            this.vel.x = this.maxVel;
        }
        if (this.vel.x <= this.minVel) {
            this.vel.x = this.minVel;
        }
        if (this.vel.y >= this.maxVel) {
            this.vel.y = this.maxVel;
        }
        if (this.vel.y <= this.minVel) {
            this.vel.y = this.minVel;
        }
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.angleRad = Math.atan2(this.vel.y, this.vel.x);
    }

    separation(boids) {
        for (let i = 0; i < boids.length; i++) {
            for (let j = i + 1; j < boids.length; j++) {
                let distance = Math.sqrt((boids[j].pos.x - boids[i].pos.x)**2 + (boids[j].pos.y - boids[i].pos.y)**2);
                if (distance < 50) {
                    let angle = Math.atan2(boids[j].pos.y - boids[i].pos.y, boids[j].pos.x - boids[i].pos.x);
                    boids[i].vel.x -= Math.cos(angle) * separationCoef;
                    boids[i].vel.y -= Math.sin(angle) * separationCoef;
                    boids[j].vel.x += Math.cos(angle) * separationCoef;
                    boids[j].vel.y += Math.sin(angle) * separationCoef;
                }
            }
        }
    }

    alignment(boids) {
        for (let i = 0; i < boids.length; i++) {
            let totalAngle = 0;
            let numBoids = 0;
            for (let j = 0; j < boids.length; j++) {
                if (boids[i] === boids[j]) {
                    continue;
                }
                else {
                    let distance = Math.sqrt((boids[j].pos.x - boids[i].pos.x)**2 + (boids[j].pos.y - boids[i].pos.y)**2);
                    if (distance < 100) {
                        totalAngle += boids[j].angleRad;
                        numBoids += 1;
                    }
                }
            }
            if (numBoids > 0) {
                let avgAngle = totalAngle / numBoids;
                boids[i].vel.x += alignmentCoef * Math.cos(avgAngle);
                boids[i].vel.y += alignmentCoef * Math.sin(avgAngle);
            }
        }
    }

    sneaky(boids) {
        for (let i = 0; i < boids.length; i++) {
            if (boids[i].pos.x > 600) {
                boids[i].pos.x = 0;
            }
            if (boids[i].pos.y > 600) {
                boids[i].pos.y = 0;
            }
            if (boids[i].pos.x < 0) {
                boids[i].pos.x = 600;
            }
            if (boids[i].pos.y < 0) {
                boids[i].pos.y = 600;
            }
        }
    }

    cohesion(ctx, boids) {
        for (let i = 0; i < boids.length; i++) {
            let totalx = 0;
            let totaly = 0;
            let numBoids = 0;
            for (let j = 0; j < boids.length; j++) {
                if (boids[i] === boids[j]) {
                    continue;
                }
                else {
                    let distance = Math.sqrt((boids[j].pos.x - boids[i].pos.x)**2 + (boids[j].pos.y - boids[i].pos.y)**2);
                    if (distance < 100) {
                        totalx += boids[j].pos.x;
                        totaly += boids[j].pos.y;
                        numBoids += 1;
                    }
                }
            }
            if (numBoids > 0) {
                let avgx = totalx / numBoids;
                let avgy = totaly / numBoids;
                console.log(avgx, avgy);
                boids[i].vel.x += cohesionCoef * (avgx - boids[i].pos.x);
                boids[i].vel.y += cohesionCoef * (avgy - boids[i].pos.y);
            }
        }
    }
}