import { Component } from 'react';
import fetchMovies from '../moviesApi';
import Button from './Button/Button';
import MoviesGallery from './MoviesGallery/MoviesGallary';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    isMoviesShown: false,
    page: 1,
    movies: [],
    isLoading: false,
    currentImage: null,
  };
  componentDidUpdate(_, prevState) {
    const { isMoviesShown, page } = this.state;
    console.log(435);
    if (
      (isMoviesShown !== prevState.isMoviesShown && isMoviesShown) ||
      (prevState.page !== page && isMoviesShown)
    ) {
      console.log(456);
      this.getMovies();
    }
    if (!isMoviesShown && isMoviesShown !== prevState.isMoviesShown) {
      this.setState({ movies: [], page: 1 });
    }
  }

  showFilmsList = () => {
    this.setState(({ isMoviesShown }) => ({ isMoviesShown: !isMoviesShown }));
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
  }
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  openModal = data => {
    this.setState({ currentImage: data });
  };
  closeModal = () => {
    this.setState({ currentImage: null });
  };
  render() {
    const { showFilmsList, loadMore } = this;
    const { isMoviesShown, movies, currentImage } = this.state;
    return (
      <>
        <Button
          clickHandler={showFilmsList}
          text={isMoviesShown ? 'Hide movies list' : 'Show movies list'}
        />

        {isMoviesShown && (
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
}
