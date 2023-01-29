import axios from 'axios';

const API_KEY = '6c57fb02719926393bb8c06aa147886f';
axios.defaults.baseURL = `https://api.themoviedb.org/3/`;

const fetchMovies = page => {
  return axios('trending/movie/week', { params: { api_key: API_KEY, page } });
};
export default fetchMovies;
