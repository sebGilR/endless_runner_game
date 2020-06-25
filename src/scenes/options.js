import Phaser from 'phaser';
import Button from '../objects/button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.preference = this.sys.game.globals.preference;

    this.text = this.add.text(150, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(100, 200, 'checkedBox');
    this.musicText = this.add.text(150, 190, 'Music Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.preference.musicOn = !this.preference.musicOn;
      this.updateAudio();
    });

    this.menuButton = new Button(this, 250, 350, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    this.updateAudio();
  }

  updateAudio() {
    if (this.preference.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.preference.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.preference.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.preference.bgMusicPlaying = true;
      }
    }
  }
}