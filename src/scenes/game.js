/* eslint class-methods-use-this: ["error", { "exceptMethods": ["resetShipPos", "zeroPad"] }] */
import Phaser from 'phaser';
import config from '../config/config';
import Explosion from '../objects/explosion';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.playerSpeed = 250;
    this.score = 15;
    this.level = 1;
    this.levelPoints = 0;
    this.lives = 3;
  }

  create() {
    this.soundConfig = {
      mute: false,
      volume: 0.1,
      rate: 1,
      datune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };

    this.pickupSound = this.sound.add('audio_pickup');

    this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
    this.background.setScale(2, 2);
    this.background.setOrigin(0, 0);

    this.ship1 = this.add.sprite(config.width / 2 - 50, -50, 'ship1');
    this.ship2 = this.add.sprite(config.width / 2, -100, 'ship2');
    this.ship3 = this.add.sprite(config.width / 2 + 50, -20, 'ship3');
    this.ship4 = this.add.sprite(config.width / 2 - 200, 0, 'ship3');

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);
    this.enemies.add(this.ship4);

    this.ship1.play('ship1_anim', true);
    this.ship2.play('ship2_anim', true);
    this.ship3.play('ship3_anim', true);
    this.ship4.play('ship3_anim', true);

    this.physics.world.setBoundsCollision();

    this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, 'player');
    this.player.setScale(2);
    this.player.play('thrust');
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.physics.add.overlap(this.player, this.enemies, this.destroyShip, null, this);

    this.explosionSound = this.sound.add('audio_explosion');
    this.pickupSound = this.sound.add('audio_pickup');

    // Score panel
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(config.width, 0);
    graphics.lineTo(config.width, 20);
    graphics.lineTo(0, 20);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();

    this.name = this.sys.game.globals.name;
    this.nameLabel = this.add.bitmapText(10, 5, 'pixelFont', this.name.toUpperCase(), 16);
    this.levelLabel = this.add.bitmapText(190, 5, 'pixelFont', 'LEVEL: 1', 16);
    this.scoreLabel = this.add.bitmapText(260, 5, 'pixelFont', 'SCORE: ', 16);
    const scoreFromatted = this.zeroPad(this.score, 6);
    this.scoreLabel.text = `SCORE: ${scoreFromatted}`;
    this.livesLabel = this.add.bitmapText(370, 5, 'pixelFont', 'LIVES: 3', 16);
  }

  update() {
    this.movePlayerManager();

    this.background.tilePositionY -= 0.5 + this.level / 50;

    this.moveShip(this.ship1, 2.4 + this.level / 8);
    this.moveShip(this.ship2, 1.4 + this.level / 8);
    this.moveShip(this.ship3, 1.9 + this.level / 8);
    this.moveShip(this.ship4, 1.4 + this.level / 8);
  }

  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > config.height) {
      this.livesHandler();
      this.resetShipPos(ship);
    }
  }

  destroyShip(player, enemy) {
    this.explosion = new Explosion(this, enemy.x, enemy.y);
    this.resetShipPos(enemy);
    this.scoreHandler();
    this.levelHandler();

    this.explosionSound.play(this.soundConfig);
  }

  resetShipPos(ship) {
    ship.y = -100;
    const randomX = Phaser.Math.Between(0.1, config.width - 5);
    ship.x = randomX;
  }

  scoreHandler() {
    this.score += 15;
    const scoreFromatted = this.zeroPad(this.score, 6);
    this.scoreLabel.text = `SCORE: ${scoreFromatted}`;
  }

  levelHandler() {
    this.levelPoints += 15;
    if (this.levelPoints > 500) {
      this.level += 1;
      this.levelPoints = 0;
    }

    this.levelLabel.text = `LEVEL: ${String(this.level)}`;
  }

  livesHandler() {
    this.lives -= 1;
    if (this.lives < 0) {
      this.sys.game.globals.score = this.score;
      this.score = 15;
      this.scene.start('Leaderboard');
      this.lives = 3;
    }
    this.pickupSound.play(this.soundConfig);
    this.livesLabel.text = `LIVES: ${String(this.lives)}`;
  }

  movePlayerManager() {
    this.player.setVelocity(0);

    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-this.playerSpeed);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(this.playerSpeed);
    }
  }

  zeroPad(number, size) {
    let stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = `0${stringNumber}`;
    }
    return stringNumber;
  }
}