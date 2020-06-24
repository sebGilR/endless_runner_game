import Phaser from 'phaser';
import config from '../config/config';
import Explosion from '../objects/explosion';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.playerSpeed = 250;
  }

  create() {
    this.pickupSound = this.sound.add('audio_pickup');

    this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
    this.background.setScale(2, 2)
    this.background.setOrigin(0, 0);

    this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship1");
    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
    this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "ship3");
    this.ship4 = this.add.sprite(config.width / 2 + 50, config.height / 2, "ship3");

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
  }

  update() {
    this.movePlayerManager()

    this.background.tilePositionY -= 0.5;

    this.moveShip(this.ship1, 2.5);
    this.moveShip(this.ship2, 1.5);
    this.moveShip(this.ship3, 2);
    this.moveShip(this.ship4, 1.5);
  }

  moveShip(ship, speed) {
    ship.y += speed
    if (ship.y > config.height) {
      if (this.score > 30) {
        this.score -= 30;
        const scoreFromatted = this.zeroPad(this.score, 6);
        this.scoreLabel.text = 'SCORE: ' + scoreFromatted;
      }
      this.resetShipPos(ship);
    }
  }


  destroyShip(player, enemy) {
    const explosion = new Explosion(this, enemy.x, enemy.y);
    this.resetShipPos(enemy);
    // this.score += 15;
    // const scoreFromatted = this.zeroPad(this.score, 6);
    // this.scoreLabel.text = 'SCORE: ' + scoreFromatted;

    this.explosionSound.play();
  }

  resetShipPos(ship) {
    ship.y = -100;
    const randomX = Phaser.Math.Between(0.1, config.width - 5);
    ship.x = randomX;
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
}