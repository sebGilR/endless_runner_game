import Phaser from 'phaser';
import Button from '../objects/button';

export default class WelcomeManu extends Phaser.Scene {
  constructor() {
    super('Name');
    this.name = '';
  }

  create() {
    this.playButton = new Button(this, 210, 320, 'blueButton1', 'blueButton2', 'Play', 'Game');

    this.labelText = this.add.text(100, 180, 'Enter your name:', {
      fontSize: '25px',
      fill: '#fff',
    });
    this.nameText = this.add.text(130, 210, '[Here...]', {
      fontSize: '25px',
      fill: '#fff',
    });

    this.input.keyboard.on('keydown', (e) => {
      if (e.key === 'Backspace' && this.name.length !== 0) {
        this.name = this.name.slice(0, this.name.length - 1);
        this.nameText.setText(`${this.name}`);
        this.updateName(this.name);
      } else if (this.testKeys(e)) {
        this.name += e.key;
        this.nameText.setText(`${this.name}`);
        this.updateName(this.name);
      }
    });
  }

  updateName(name) {
    if (name === '') {
      this.sys.game.globals.name = 'Player';
    } else {
      this.sys.game.globals.name = name;
    }
  }

  testKeys(e) {
    if (
      e.key !== 'Backspace'
      && e.key !== 'Enter'
      && e.key !== 'Shift'
      && e.key !== 'Alt'
      && e.key !== 'Tab'
      && e.key !== 'Dead'
    ) {
      return true
    }
  }
}