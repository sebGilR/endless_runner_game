import 'phaser';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.preference = this.sys.game.globals.preference;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(200, 200, 'checkedBox');
    this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24 });

    this.soundButton = this.add.image(200, 300, 'checkedBox');
    this.soundText = this.add.text(250, 290, 'Sound Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', function () {
      this.preference.musicOn = !this.preference.musicOn;
      this.updateAudio();
    }.bind(this));

    this.soundButton.on('pointerdown', function () {
      this.preference.soundOn = !this.preference.soundOn;
      this.updateAudio();
    }.bind(this));

    // this.updateAudio();

    this.menuButton = this.add.sprite(400, 500, 'blueButton1').setInteractive();
    this.menuText = this.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', function (pointer) {
      this.scene.start('Title');
    }.bind(this));

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

    if (this.preference.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
};