// boids.js
let separationCoef = .04;
let alignmentCoef = .02;
let cohesionCoef = .005;

let seperationRad = 40;
let cohesionRad = 80;
let alignmentRad = 130;

let wallMargin = 100;
let bounceCoef = .5;
let bounceCoefGradual = .005;

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
        this.maxSpeed = 6;
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
        for (let otherBoid of boids) {
            if (otherBoid === this) continue;
            let distComp = {
                x: otherBoid.pos.x - this.pos.x,
                y: otherBoid.pos.y - this.pos.y
            };
            let distance = this.getDist(distComp.x, distComp.y);
            if (distance < seperationRad) {
                let angle = Math.atan2(distComp.y, distComp.x);
                this.vel.x -= Math.cos(angle) * separationCoef;
                this.vel.y -= Math.sin(angle) * separationCoef;
                otherBoid.vel.x += Math.cos(angle) * separationCoef;
                otherBoid.vel.y += Math.sin(angle) * separationCoef;
            }
        }
    }

    alignment(boids) {
        let totalAngle = 0;
        let numBoids = 0;
        for (let otherBoid of boids) {
            if (otherBoid === this) continue;
            let distance = this.getDist(otherBoid.pos.x - this.pos.x, otherBoid.pos.y - this.pos.y);
            if (distance < alignmentRad) {
                totalAngle += otherBoid.angleRad;
                numBoids += 1;
            }
        }
        if (numBoids > 0) {
            let avgAngle = totalAngle / numBoids;
            this.vel.x += alignmentCoef * Math.cos(avgAngle);
            this.vel.y += alignmentCoef * Math.sin(avgAngle);
        }
    }

    cohesion(boids) {
        let centerX = 0;
        let centerY = 0;
        let numBoids = 0;
        for (let otherBoid of boids) {
            if (otherBoid === this) continue;
                let distance = this.getDist(otherBoid.pos.x - this.pos.x, otherBoid.pos.y - this.pos.y);
                if (distance < cohesionRad) {
                    centerX += otherBoid.pos.x;
                    centerY += otherBoid.pos.y;
                    numBoids += 1;
                }
        }
        if (numBoids) {
            centerX = centerX / numBoids;
            centerY = centerY / numBoids;
            this.vel.x += (centerX - this.pos.x) * cohesionCoef;
            this.vel.y += (centerY - this.pos.y) * cohesionCoef;
        }
    }

    InfWalls(width, height) {
        if (this.pos.x > width) {
            this.pos.x = 0;
        }
        if (this.pos.y > height) {
               this.pos.y = 0;
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

    // When boids get close to the wall velocity will be added in the opposite direction.
    // Margin wall = Imagine a invisible border 50px inside the canvas
    BounceOffWall(width, height) {
        if (this.pos.x >= width - wallMargin) {
            this.vel.x -= bounceCoef;
        }
        else if (this.pos.x <= 0 + wallMargin) {
            this.vel.x += bounceCoef;
        }
        if (this.pos.y >= height - wallMargin) {
            this.vel.y -= bounceCoef;
        }
        else if (this.pos.y <= 0 + wallMargin) {
            this.vel.y += bounceCoef;
        }
    }

    // As boids approach the wall more velocity will be added in the opposite direction the closer they get.
    BounceOffWallGradually(width, height) {
        let rightWall = width - wallMargin;
        let leftTopWall = 0 + wallMargin;
        let bottomWall = height - wallMargin;

        if (this.pos.x >= rightWall) {
            this.vel.x -= (this.pos.x - rightWall) * bounceCoefGradual;
            //                ^^^^^^^^^^^^^^^ distance from the margin wall
        }
        else if (this.pos.x <= leftTopWall) {
            this.vel.x += (leftTopWall - this.pos.x) * bounceCoefGradual;
        }
        if (this.pos.y >= bottomWall) {
            this.vel.y -= (this.pos.y - bottomWall) * bounceCoefGradual;
        }
        else if (this.pos.y <= leftTopWall) {
            this.vel.y += (leftTopWall - this.pos.y) * bounceCoefGradual;
        }
    }

}