import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 510,
  height: 550,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};