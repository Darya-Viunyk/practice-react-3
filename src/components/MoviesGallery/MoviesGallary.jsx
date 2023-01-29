export const MoviesGallery = ({ movies, showModal }) => {
  return (
    <ul>
      {movies.map(({ id, title, vote_count: votes, backdrop_path: image }) => {
        return (
          <li key={id}>
            <p>{title}</p>
            <p>Votes - {votes}</p>
            <button
              type="button"
              onClick={() => {
                showModal({ src: image, alt: title });
              }}
            >
              Shou poster
            </button>
          </li>
        );
      })}
    </ul>
  );
};
export default MoviesGallery;
