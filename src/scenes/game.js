import Phaser from 'phaser';
import config from '../config/config'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
    this.background.setScale(2, 2)
    this.background.setOrigin(0, 0);

    // this.scene.start('Preloader');
  }

  update() {
    this.background.tilePositionY -= 0.5;
  }
}