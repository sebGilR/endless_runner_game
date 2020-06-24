import Phaser from 'phaser';
import config from '../config/config'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.playerSpeed = 200;
  }

  create() {
    this.pickupSound = this.sound.add('audio_pickup');

    this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
    this.background.setScale(2, 2)
    this.background.setOrigin(0, 0);

    this.block1 = this.add.image(config.width / 2, config.height + 100, "block2");
    this.block1.setScale(0.75);
    this.block2 = this.add.image(config.width / 2 + 50, config.height - 100, "block2");
    this.block2.setScale(0.75);
    this.block3 = this.add.image(config.width / 2 + 100, config.height - 100, "block3");
    this.block3.setScale(0.75);
    this.block4 = this.add.image(config.width / 2 + 80, config.height - 500, "block3");
    this.block4.setScale(0.75);
    this.block5 = this.add.image(config.width / 2 - 50, config.height + 200, "block3");
    this.block5.setScale(0.75);

    this.blocks = this.physics.add.group();
    this.blocks.add(this.block1);
    this.blocks.add(this.block2);
    this.blocks.add(this.block3);

    this.physics.world.setBoundsCollision();

    this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, 'player');
    this.player.setScale(2);
    this.player.play('thrust');
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
  }

  update() {
    this.movePlayerManager()

    this.background.tilePositionY -= 0.5;

    this.moveBlock(this.block1, 2);
    this.moveBlock(this.block2, 2);
    this.moveBlock(this.block3, 2);
    this.moveBlock(this.block4, 2);
    this.moveBlock(this.block5, 2);
  }

  moveBlock(block, speed) {
    block.y += speed
    if (block.y > config.height + 300) {
      this.resetPos(block);
    }
  }

  resetPos(block) {
    block.y = -200;
    const randomX = Phaser.Math.Between(0, config.width);
    block.x = randomX;
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