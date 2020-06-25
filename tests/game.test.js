import GameScene from '../src/scenes/game';
import Explosion from '../src/objects/explosion';
jest.mock('../src/objects/explosion');

let game;
let ship;
let ship2;
beforeEach(() => {
  game = new GameScene();
  ship = { x: 5, y: 100 };
  ship2 = { x: 5, y: 600 };
});

describe('Game initial values', () => {
  it('Level is 1', () => {
    expect(game.level).toBe(1);
  });

  it('Points in this level are 0', () => {
    expect(game.levelPoints).toBe(0);
  });

  it('Score is set to 15', () => {
    expect(game.score).toBe(15);
  });

  it('The player has 3 lives', () => {
    expect(game.lives).toBe(3);
  });
});

describe('Game actions', () => {
  describe('moveShip', () => {
    it('Moves the ship vertically', () => {
      game.moveShip(ship, 1);
      expect(ship.y).toBe(101);
    });

    it('Calls livesHandler if position is beyond canvas height', () => {
      game.resetShipPos = jest.fn();
      game.livesHandler = jest.fn();
      game.moveShip(ship2, 1);
      expect(game.livesHandler.mock.calls.length).toBe(1);
    });

    it('livesHandler not called if position is within canvas height', () => {
      game.resetShipPos = jest.fn();
      game.livesHandler = jest.fn();
      game.moveShip(ship, 1);
      expect(game.livesHandler.mock.calls.length).toBe(0);
    });

    it('Calls resetShipPos if position is beyond canvas height', () => {
      game.livesHandler = jest.fn();
      game.resetShipPos = jest.fn();
      game.moveShip(ship2, 1);
      expect(game.resetShipPos.mock.calls.length).toBe(1);
    });

    it('resetShipPos not called if position is within canvas height', () => {
      game.livesHandler = jest.fn();
      game.resetShipPos = jest.fn();
      game.moveShip(ship, 1);
      expect(game.resetShipPos.mock.calls.length).toBe(0);
    });
  });

  describe('resetShipPos', () => {
    it('resets the ship\'s vertical position to -100', () => {
      game.resetShipPos(ship2);
      expect(ship2.y).toBe(-100);
    });

    it('sets a random x location within the canvas width', () => {
      game.resetShipPos(ship);
      expect(ship.x).toBeGreaterThan(0);
      expect(ship.x).toBeLessThan(511);
    });
  });

  describe('scoreHandler', () => {
    it('Increases the score by 15', () => {
      game.zeroPad = jest.fn();
      game.scoreLabel = {};
      game.scoreHandler();
      expect(game.score).toBe(30);
    });

    it('Calls zeroPad', () => {
      game.zeroPad = jest.fn();
      game.scoreLabel = {};
      game.scoreHandler();
      expect(game.zeroPad.mock.calls.length).toBe(1);
    });
  });

  describe('levelHandler', () => {
    it('Increases levelPoints by 15', () => {
      game.levelPoints = 0;
      game.levelLabel = {};
      game.levelHandler();
      expect(game.levelPoints).toBe(15);
    });

    it('Increases the level by 1 after reaching 500 levelPoints', () => {
      game.levelLabel = {};
      game.levelPoints = 501;
      game.levelHandler();
      expect(game.level).toBe(2);
    });

    it('Resets levelPoints to 0', () => {
      game.levelLabel = {};
      game.levelPoints = 501;
      game.levelHandler();
      expect(game.levelPoints).toBe(0);
    });
  });

  describe('livesHandler', () => {
    it('Decreases live count by 1', () => {
      game.pickupSound = { play: jest.fn() };
      game.livesLabel = {};
      game.livesHandler();
      expect(game.lives).toBe(2);
    });

    it('Plays pickup sound', () => {
      game.pickupSound = { play: jest.fn() };
      game.livesLabel = {};
      game.livesHandler();
      expect(game.pickupSound.play.mock.calls.length).toBe(1);
    });

    it('Updates global score variable if lives go below 0', () => {
      game.sys = { game: { globals: { score: 0 } } };
      game.pickupSound = { play: jest.fn() };
      game.scene = { start: jest.fn() }
      game.livesLabel = {};
      game.lives = 0;
      game.score = 30;
      game.livesHandler();
      expect(game.sys.game.globals.score).toBe(30);
    });

    it('Calls the leaderboard scene and the game is over', () => {
      game.sys = { game: { globals: { score: 0 } } };
      game.pickupSound = { play: jest.fn() };
      game.scene = { start: jest.fn() }
      game.livesLabel = {};
      game.lives = 0;
      game.score = 30;
      game.livesHandler();
      expect(game.scene.start.mock.calls.length).toBe(1);
    });

    it('Resets lives count to 3', () => {
      game.sys = { game: { globals: { score: 0 } } };
      game.pickupSound = { play: jest.fn() };
      game.scene = { start: jest.fn() }
      game.livesLabel = {};
      game.lives = 0;
      game.score = 30;
      game.livesHandler();
      expect(game.lives).toBe(3);
    });
  });

  describe('movePlayerManager', () => {
    it('Initially calls set velocity with 0', () => {
      game.player = {
        setVelocity: jest.fn(),
        setVelocityX: jest.fn(),
        setVelocityY: jest.fn(),
      };
      game.cursorKeys = {
        left: { isDown: false },
        right: { isDown: false },
        up: { isDown: false },
        down: { isDown: false },
      };
      game.movePlayerManager()
      expect(game.player.setVelocity).toHaveBeenCalledWith(0);
    });

    it('Calls setVelocityX with negative playerSpeed if the left key is down', () => {
      game.player = {
        setVelocity: jest.fn(),
        setVelocityX: jest.fn(),
        setVelocityY: jest.fn(),
      };
      game.cursorKeys = {
        left: { isDown: true },
        right: { isDown: false },
        up: { isDown: false },
        down: { isDown: false },
      };
      game.movePlayerManager()
      expect(game.player.setVelocityX).toHaveBeenCalledWith(-game.playerSpeed);
    });

    it('Calls setVelocityX with playerSpeed if the right key is down', () => {
      game.player = {
        setVelocity: jest.fn(),
        setVelocityX: jest.fn(),
        setVelocityY: jest.fn(),
      };
      game.cursorKeys = {
        left: { isDown: false },
        right: { isDown: true },
        up: { isDown: false },
        down: { isDown: false },
      };
      game.movePlayerManager()
      expect(game.player.setVelocityX).toHaveBeenCalledWith(game.playerSpeed);
    });

    it('Calls setVelocityY with negative playerSpeed if the up key is down', () => {
      game.player = {
        setVelocity: jest.fn(),
        setVelocityX: jest.fn(),
        setVelocityY: jest.fn(),
      };
      game.cursorKeys = {
        left: { isDown: false },
        right: { isDown: false },
        up: { isDown: true },
        down: { isDown: false },
      };
      game.movePlayerManager()
      expect(game.player.setVelocityY).toHaveBeenCalledWith(-game.playerSpeed);
    });

    it('Calls setVelocityY with playerSpeed if the up key is down', () => {
      game.player = {
        setVelocity: jest.fn(),
        setVelocityX: jest.fn(),
        setVelocityY: jest.fn(),
      };
      game.cursorKeys = {
        left: { isDown: false },
        right: { isDown: false },
        up: { isDown: false },
        down: { isDown: true },
      };
      game.movePlayerManager()
      expect(game.player.setVelocityY).toHaveBeenCalledWith(game.playerSpeed);
    });
  });

  describe('zeroPad', () => {
    it('returns a string of a size provided', () => {
      expect(game.zeroPad(5, 6).length).toBe(6);
    });

    it('returns a string with a number padded on the left by 0', () => {
      expect(game.zeroPad(24, 6)).toEqual('000024');
    });

    it('returns a string of size 2 if no size is provided and number is one digit', () => {
      expect(game.zeroPad(2)).toEqual('02');
    });

    it('returns the input number as string if it is greater than 2 and no size is provided', () => {
      expect(game.zeroPad(235)).toEqual('235');
    });
  });

  describe('destroyShip', () => {
    it('Calls a new Explosion object', () => {
      game.resetShipPos = jest.fn();
      game.scoreHandler = jest.fn();
      game.levelHandler = jest.fn();
      game.explosionSound = { play: jest.fn() };
      game.destroyShip(game.player, ship)
      expect(Explosion).toHaveBeenCalled();
    });

    it('Plays the explosion sound effect', () => {
      game.resetShipPos = jest.fn();
      game.scoreHandler = jest.fn();
      game.levelHandler = jest.fn();
      game.explosionSound = { play: jest.fn() };
      game.destroyShip(game.player, ship)
      expect(game.explosionSound.play).toHaveBeenCalled();
    });

    it('Calls levelHandler', () => {
      game.resetShipPos = jest.fn();
      game.scoreHandler = jest.fn();
      game.levelHandler = jest.fn();
      game.explosionSound = { play: jest.fn() };
      game.destroyShip(game.player, ship)
      expect(game.levelHandler).toHaveBeenCalled();
    });

    it('Calls scoreHandler', () => {
      game.resetShipPos = jest.fn();
      game.scoreHandler = jest.fn();
      game.levelHandler = jest.fn();
      game.explosionSound = { play: jest.fn() };
      game.destroyShip(game.player, ship)
      expect(game.scoreHandler).toHaveBeenCalled();
    });

    it('Calls resetShipPos', () => {
      game.resetShipPos = jest.fn();
      game.scoreHandler = jest.fn();
      game.levelHandler = jest.fn();
      game.explosionSound = { play: jest.fn() };
      game.destroyShip(game.player, ship)
      expect(game.resetShipPos).toHaveBeenCalled();
    });
  });
});