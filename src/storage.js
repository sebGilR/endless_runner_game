import Axios from 'axios';

const API_KEY = 'aZLwSe2SAUOVSVqJzFqh';
const BASE = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';

const saveScore = (name, score) => Axios.post(`${BASE}/${API_KEY}/scores`, {
  user: name,
  score: parseInt(score, 10),
});

const getScores = () => Axios.get(`${BASE}/${API_KEY}/scores`);

export { saveScore, getScores };
