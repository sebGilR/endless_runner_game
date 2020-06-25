import Phaser from 'phaser';
import config from '../config/config';
import Button from '../objects/button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
    this.background.setScale(2, 2)
    this.background.setOrigin(0, 0);

    this.soundConfig = {
      mute: false,
      volume: 0.1,
      rate: 1,
      datune: 0,
      seek: 0,
      loop: false,
      delay: 0
    }

    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Name');
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'blueButton1', 'blueButton2', 'Options', 'Options');
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    this.preference = this.sys.game.globals.preference;
    if (this.preference.musicOn === true && this.preference.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play(this.soundConfig);
      this.preference.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}