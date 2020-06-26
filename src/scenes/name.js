import Phaser from 'phaser';
import Button from '../objects/button';

const testKeys = (e) => {
  if (
    e.key !== 'Backspace'
    && e.key !== 'Enter'
    && e.key !== 'Shift'
    && e.key !== 'Alt'
    && e.key !== 'Tab'
    && e.key !== 'Dead'
  ) {
    return true;
  }
  return false;
};

export default class WelcomeManu extends Phaser.Scene {
  constructor() {
    super('Name');
    this.name = '';
  }

  create() {
    this.playButton = new Button(this, 250, 400, 'blueButton1', 'blueButton2', 'Play', 'Game');

    this.levelLabel = this.add.bitmapText(50, 50, 'pixelFont', 'INSTRUCTIONS', 26);
    this.levelLabel = this.add.bitmapText(
      30, 100, 'pixelFont',
      '- Collide against space ships to accumulate points.',
      22,
    );
    this.levelLabel = this.add.bitmapText(
      30, 130, 'pixelFont',
      '- You\'ll loose one life out of 3 for each ship you miss.',
      22,
    );
    this.levelLabel = this.add.bitmapText(
      30, 160, 'pixelFont',
      '- Use the arrow keys to move around.',
      22,
    );

    this.nameLabel = this.add.bitmapText(100, 250, 'pixelFont', 'Enter your name:', 30);

    this.nameText = this.add.bitmapText(100, 280, 'pixelFont', '[ Here... ]', 30);

    this.input.keyboard.on('keydown', (e) => {
      if (e.key === 'Backspace' && this.name.length !== 0) {
        this.name = this.name.slice(0, this.name.length - 1);
        this.nameText.setText(`${this.name}`);
        this.updateName(this.name);
      } else if (testKeys(e)) {
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
}