import './assets/style/styles.scss';
import 'regenerator-runtime';
import Phaser from 'phaser';
import config from './config/config';
import GameScene from './scenes/game';
import BootScene from './scenes/boot';
import PreloaderScene from './scenes/preloader';
import TitleScene from './scenes/title';
import NameScene from './scenes/name';
import OptionsScene from './scenes/options';
import CreditsScene from './scenes/credits';
import Preference from './preference';
import Leaderboard from './scenes/leaderboard';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const preference = new Preference();
    this.globals = { preference, bgMusic: null, name: 'Player' };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Name', NameScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Leaderboard', Leaderboard);
    this.scene.start('Boot');
  }
}

window.game = new Game();