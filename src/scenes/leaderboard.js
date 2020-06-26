import Phaser from 'phaser';
import { getScores, saveScore } from '../storage';
import Button from '../objects/button';

export default class Leaderboard extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  async create() {
    this.name = this.sys.game.globals.name;
    this.score = this.sys.game.globals.score;

    await saveScore(this.name, this.score);
    this.scoreList = (await getScores()).data.result;
    this.scoreList = this.scoreList.sort((a, b) => b.score - a.score);

    this.add.bitmapText(200, 50, 'pixelFont', 'GAME OVER', 30);
    this.add.bitmapText(100, 90, 'pixelFont', `YOU SCORED: ${this.score}`, 26);
    this.add.bitmapText(100, 150, 'pixelFont', 'LEADERBOARD', 24);

    for (let i = 0; i < Math.min(5, this.scoreList.length); i += 1) {
      this.add.bitmapText(
        100,
        190 + i * 30,
        'pixelFont',
        `${i + 1}.  ${this.scoreList[i].user}: ${this.scoreList[i].score}`,
        22,
      );
    }

    this.playButton = new Button(this, 150, 450, 'blueButton1', 'blueButton2', 'Try again', 'Game');
    this.playButton = new Button(this, 350, 450, 'blueButton1', 'blueButton2', 'Main menu', 'Title');
  }
}