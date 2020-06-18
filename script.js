"use strict";

const $ = (id) => document.getElementById(id);

class Square {
  constructor(ctx, posX, posY, width, height, color) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
    this.moveSpeed = 2;
  }

  draw() {
    // console.log("Square draw");
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }

  update() {
    if (this.targetX || this.targetY) {
      // console.log("targetX", this.targetX, this.posX);
      if (
        Math.abs(this.targetX - this.posX) > 3 ||
        Math.abs(this.targetY - this.posY) > 3
      ) {
        this.move();
      }
    }
  }

  setTargetPosition(targetX = 0, targetY = 0) {
    this.targetX = targetX;
    this.targetY = targetY;
  }

  move() {
    if (Math.abs(this.targetX - this.posX) > 1) {
      if (this.targetX > this.posX) {
        this.posX += this.moveSpeed;
      } else {
        this.posX -= this.moveSpeed;
      }
    }
    if (Math.abs(this.targetY - this.posY) > 1) {
      if (this.targetY > this.posY) {
        this.posY += this.moveSpeed;
      } else {
        this.posY -= this.moveSpeed;
      }
    }
  }
}

class Game {
  constructor() {
    this.canvas = $("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.FPS = 30;
    this.deltaTime = Math.floor(1000 / this.FPS);
    this.allActors = [];
    this.tickNumber = 0;

    this.square = new Square(this.ctx, 10, 10, 10, 10, "white");
  }

  start() {
    console.log("Game start");
    console.log("Start main loop");
    this.createActors();

    // start main loop
    setInterval(this.update.bind(this), this.deltaTime);
  }

  createActors() {
    let actorNumber = 40;
    for (let i = 0; i < actorNumber; i++) {
      let actor = new Square(
        this.ctx,
        this.canvas.width * Math.random(),
        this.canvas.height * Math.random(),
        10,
        10,
        "white"
      );
      this.allActors.push(actor);
    }
  }

  drawAllActors() {
    this.allActors.forEach((actor) => {
      actor.draw();
      actor.setTargetPosition(150, 22);
    });
  }

  updateAllActors() {
    this.allActors.forEach((actor) => {
      actor.update();
    });
  }

  update() {
    // clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.tickNumber += 1;
    this.drawAllActors();
    this.updateAllActors();
    // await console.log("update tick", this.tickNumber);
  }
}

// Запуск
let game = new Game();
window.addEventListener("load", game.start());
