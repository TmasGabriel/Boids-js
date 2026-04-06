// boids.js
let separationCoef = .0025;
let alignmentCoef = .0025;
let cohesionCoef = .00025;

let seperationRad = 50;
let cohesionRad = 125;
let alignmentRad = 125;

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
        this.maxSpeed = 3;
    }

    getDist(x, y) {
        return (Math.sqrt(x * x + y * y));
    }

    update() {
        if (this.getDist(this.vel.x, this.vel.y) >= this.maxSpeed) {
            this.vel.x = this.maxSpeed * Math.cos(this.angleRad);
            this.vel.y = this.maxSpeed * Math.sin(this.angleRad);
        }
        else if (this.getDist(this.vel.x, this.vel.y) <= -this.maxSpeed) {
            this.vel.x = -this.maxSpeed * Math.cos(this.angleRad);
            this.vel.y = -this.maxSpeed * Math.sin(this.angleRad);
        }
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.angleRad = Math.atan2(this.vel.y, this.vel.x);
    }

    separation(boids) {
        for (let i = 0; i < boids.length; i++) {
            for (let j = i + 1; j < boids.length; j++) {
                let distComp = {
                    x: boids[j].pos.x - boids[i].pos.x,
                    y: boids[j].pos.y - boids[i].pos.y
                };
                let distance = this.getDist(distComp.x, distComp.y);
                if (distance < seperationRad) {
                    let angle = Math.atan2(distComp.y, distComp.x);
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
                    let distance = this.getDist(boids[j].pos.x - boids[i].pos.x, boids[j].pos.y - boids[i].pos.y);
                    if (distance < alignmentRad) {
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

    cohesion(boids) {
        for (let i = 0; i < boids.length; i++) {
            let totalx = 0;
            let totaly = 0;
            let numBoids = 0;
            for (let j = 0; j < boids.length; j++) {
                if (boids[i] === boids[j]) {
                    continue;
                }
                else {
                    let distance = this.getDist(boids[j].pos.x - boids[i].pos.x, boids[j].pos.y - boids[i].pos.y);
                    if (distance < cohesionRad) {
                        totalx += boids[j].pos.x;
                        totaly += boids[j].pos.y;
                        numBoids += 1;
                    }
                }
            }
            if (numBoids > 0) {
                let avgx = totalx / numBoids;
                let avgy = totaly / numBoids;
                boids[i].vel.x += cohesionCoef * (avgx - boids[i].pos.x);
                boids[i].vel.y += cohesionCoef * (avgy - boids[i].pos.y);
            }
        }
    }
}