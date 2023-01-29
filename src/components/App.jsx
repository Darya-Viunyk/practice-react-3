import { Component } from 'react';
import  fetchMovies  from '../moviesApi';
import Button from './Button/Button';
import MoviesGallery from './MoviesGallery/MoviesGallary';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    isMoviesShow: false,
    page: 1,
    movies: [],
    isLoading: false,
    currentImege: null,
  };
  componentDidUpdate(_, prevState) {
    const { isMovieShown, page } = this.state;
    if (
      (isMovieShown !== prevState.isMovieShown && isMovieShown) ||
      (prevState.page !== page && isMovieShown)
    ) {
      this.getMovies();
    }
    if (!isMovieShown && isMovieShown !== prevState.isMovieShown) {
      this.setState({ movies: [], page: 1 });
    }
  };

  showFilmsList = () => {
    this.setState(({ isMoviesShow })=>({isMoviesShow: !isMoviesShow}));
  };

  getMovies() {
    this.setState({ isLoading: true });
    const { page } = this.state;
    fetchMovies(page)
      .then(({ data: { results } }) => {
        this.setState(prevState => {
          return { movies: [...prevState.movies, ...results] };
        });
      })
      .catch(e => {
        console.log(e.message);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });

  loadMore = () => {
    this.setState ( prevState =>({page: prevState.page + 1})); 
  };
  openModal = data => {
    this.setState({currentImege: data});
  };
  closeModal = () =>{
    this.setState({currentImege: null});
  }
  render() {
    const { showFilmsList, loadMore } = this;
    const { isMovieShown, movies, currentImage } = this.state;
    return (
      <>
        <Button
          clickHandler={showFilmsList}
          text={isMovieShown ? 'Hide movies list' : 'Show movies list'}
        />

        {isMovieShown && (
          <>
            <MoviesGallery movies={movies} showModal={this.openModal} />
            <Button text="Load more" clickHandler={loadMore} />
          </>
        )}
        {currentImage && (
          <Modal currentImage={currentImage} closeModal={this.closeModal} />
        )}
      </>
    );
  }
