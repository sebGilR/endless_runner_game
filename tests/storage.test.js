import { getScores, saveScore } from '../src/storage';
jest.mock('../src/storage');

describe('Score Service tests', () => {
  getScores.mockResolvedValue({
    data: {
      result: [
        { name: 'Player', score: 15 },
        { name: 'Seb', score: 30 }
      ],
    },
  });

  saveScore.mockImplementation((name, score) => new Promise((resolve, reject) => {
    if (!name) {
      reject({ result: 'Name not provided' });
    } else if (!score) {
      reject({ result: 'Score invalid' });
    } else {
      resolve({ result: 'Succcess' });
    }
  }));

  test('should fetch users', () => {
    getScores().then(response => expect(response).toEqual({
      data: {
        result: [
          { name: 'Player', score: 15 },
          { name: 'Seb', score: 30 }
        ],
      },
    }));
  });

  test('should create new score', () => {
    saveScore('Seb', 15).then(response => expect(response)
      .toEqual({ result: 'Succcess' }));
  });

  test('When a name is not giving, it should reject', () => {
    saveScore().catch(err => expect(err)
      .toEqual({ result: 'Name not provided' }));
  });

  test('When a score is not giving, it should reject', () => {
    saveScore('Seb').catch(err => expect(err)
      .toEqual({ result: 'Score invalid' }));
  });
});