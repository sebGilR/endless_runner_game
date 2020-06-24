import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    this.add.image(255, 200, 'logo');

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(125, 370, 250, 30);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 + 80,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 + 111,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 150,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(130, 375, 240 * value, 20);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(2000, this.ready, [], this);

    this.load.image('blueButton1', 'src/assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'src/assets/ui/blue_button03.png');
    this.load.image('phaserLogo', 'src/assets/logo.png');
    this.load.image('box', 'src/assets/ui/grey_box.png');
    this.load.image('checkedBox', 'src/assets/ui/blue_boxCheckmark.png');
    this.load.image('background', 'src/assets/img/background.png');
    this.load.image('block1', 'src/assets/img/block1.png');
    this.load.image('block2', 'src/assets/img/block2.png');
    this.load.image('block3', 'src/assets/img/block3.png');
    this.load.spritesheet('ship1', 'src/assets/img/ship.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('ship2', 'src/assets/img/ship2.png', { frameWidth: 32, frameHeight: 16 });
    this.load.spritesheet('ship3', 'src/assets/img/ship3.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('explosion', 'src/assets/img/explosion.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('power-up', 'src/assets/img/power-up.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('player', 'src/assets/img/player.png', { frameWidth: 16, frameHeight: 24 });
    this.load.spritesheet('beam', 'src/assets/img/beam.png', { frameWidth: 16, frameHeight: 16 });
    this.load.bitmapFont('pixelFont', 'src/assets/font/font.png', 'src/assets/font/font.xml');
    this.load.audio('bgMusic', ['src/assets/sounds/sci-fi_platformer12.mp3', 'src/assets/sounds/sci-fi_platformer12.ogg']);
    this.load.audio('audio_beam', ['src/assets/sounds/beam.ogg', 'src/assets/sounds/beam.mp3']);
    this.load.audio('audio_explosion', ['src/assets/sounds/explosion.ogg', 'src/assets/sounds/explosion.mp3']);
    this.load.audio('audio_pickup', ['src/assets/sounds/pickup.ogg', 'src/assets/sounds/pickup.mp3']);
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }

  create() {
    this.anims.create({
      key: 'ship1_anim',
      frames: this.anims.generateFrameNumbers('ship1'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'ship2_anim',
      frames: this.anims.generateFrameNumbers('ship2'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'ship3_anim',
      frames: this.anims.generateFrameNumbers('ship3'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: 'red',
      frames: this.anims.generateFrameNumbers('power-up', {
        start: 0,
        end: 1,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'gray',
      frames: this.anims.generateFrameNumbers('power-up', {
        start: 2,
        end: 3,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'thrust',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'beam_anim',
      frames: this.anims.generateFrameNumbers('beam'),
      frameRate: 20,
      repeat: -1,
    });
  }
}