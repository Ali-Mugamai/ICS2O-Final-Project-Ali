/* global phaser */
// Copyright (c) 2020 Ali Mugamai All rights reserved
//
// Created by: Ali Mugamai
// Created on: NOV 2022
// This file contains the JS functions for index.html

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameScene" });

    this.background = null;
    this.p1 = null;
    this.p2 = null
    this.fireMissle = false;
    this.score = 0;
    this.scoreText = null;
    this.scoreTextStyle = {
      font: "65px Arial",
      fill: "#ffffff",
      align: "center",
    };
    this.gameOverTextStyle = {
      font: "65px Arial",
      fill: "#ff0000",
      align: "center",
    };
  }

  init(data) {
    this.cameras.main.setBackgroundColor("ffffff");
  }

  preload() {
    console.log("Game Scene");

        this.load.image("riverBackground", "./assets/river_fighting_scene.jpg");
        this.load.image("ship", "./assets/spaceShip.png");
        this.load.image("missile", "./assets/blue_laser.png");
      // sound
        this.load.audio("laser", "assets/laser1.wav");
        this.load.image("alien", "assets/alien.png");
        this.load.audio("laser", "./assets/laser1.wav");
        this.load.audio("explosion", "./assets/barrelExploding.wav");
        this.load.audio("bomb", "./assets/bomb.wav");
    }

    create(data) {
        this.background = this.add.image(0, 0, "riverBackground").setScale(2.0);
        this.background.setOrigin(0, 0);

    this.scoreText = this.add.text(
      10,
      10,
      "Score: " + this.score.toString(),
      this.scoreTextStyle
    );

        this.player1 = this.physics.add.sprite(1920 / 2, 1080 - 100, "ship");

    this.missileGroup = this.physics.add.group();

    this.alienGroup = this.add.group();
    this.createAlien();

    this.physics.add.collider(
      this.missileGroup,
      this.alienGroup,
      function (missileCollide, alienCollide) {
        alienCollide.destroy();
        missileCollide.destroy();
        this.sound.play("explosion");
        this.createAlien();
        this.createAlien();
      }.bind(this)
    );

    this.physics.add.collider(
      this.ship,
      this.alienGroup,
      function (shipCollide, alienCollide) {
        this.sound.play("bomb");
        this.physics.pause();
        alienCollide.destroy();
        shipCollide.destroy();
        this.gameOverText = this.add
          .text(
            1920 / 2,
            1080 / 2,
            "Game Over!\nClick to play again.",
            this.gameOverTextStyle
          )
          .setOrigin(0.5);
        this.gameOverText.setInteractive({ useHandCursor: true });
        this.gameOverText.on("pointerdown", () =>
          this.scene.start("gameScene")
        );
      }.bind(this)
    );
  }

  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey("LEFT");
    const keyRightObj = this.input.keyboard.addKey("RIGHT");
    const keySpaceObj = this.input.keyboard.addKey("SPACE");

    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15;
      if (this.ship.x < 0) {
        this.ship.x = 0;
      }
    }
    if (keyRightObj.isDown === true) {
      this.ship.x += 15;
      if (this.ship.x > 1920) {
        this.ship.x = 1920;
      }
    }

    update(time, delta) {
        const keyLeftObj = this.input.keyboard.addKey("LEFT");
        const keyRightObj = this.input.keyboard.addKey("RIGHT");
        const keyDownObj = this.input.keyboard.addKey("DOWN");

        const keySpaceObj = this.input.keyboard.addKey("SPACE");
        const keySpaceObj = this.input.keyboard.addKey("SPACE");
        const keySpaceObj = this.input.keyboard.addKey("SPACE");

        if (keyLeftObj.isDown === true) {
        this.player1.x -= 15;
        if (this.player1.x < 0) {
            this.player1.x = 0;
        }
        }
        if (keyRightObj.isDown === true) {
        this.ship.x += 15;
        if (this.player1.x > 1920) {
            this.player1.x = 1920;
        }
    }

        if (keyDownObj.isDown === true) {
        if (this.firemissile === false) {
            this.firemissile = true;
            const aNewMissile = this.physics.add.sprite(
            this.player1.x,
            this.player1.y,
            "missile"
            );
            this.missileGroup.add(aNewMissile);
            this.sound.play("laser");
        }
        }

        if (keyDownObj.isUp === true) {
        this.firemissile = false;
        }

        this.missileGroup.children.each(function (item) {
        item.y = item.y - 15;
        if (item.y < 0) {
            item.destroy();
        }
        });
    }

    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15;
      if (item.y < 0) {
        item.destroy();
      }
    });
  }
}

export default GameScene;
