export default class Preference {
  constructor() {
    this.psoundOn = true;
    this.pmusicOn = true;
    this.pbgMusicPlaying = false;
  }

  set musicOn(value) {
    this.pmusicOn = value;
  }

  get musicOn() {
    return this.pmusicOn;
  }

  set soundOn(value) {
    this.psoundOn = value;
  }

  get soundOn() {
    return this.psoundOn;
  }

  set bgMusicPlaying(value) {
    this.pbgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this.pbgMusicPlaying;
  }
}