import { Component } from 'react';
import styles from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }
  closeByEsc = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };
  render() {
    const {
      currentImage: { alt, src },
      closeModal,
    } = this.props;

    return (
      <div className={styles.modalBackdrop}>
        <div className={styles.modalContent}>
          <button
            type="button"
            className={styles.buttonClose}
            onClick={closeModal}
          >
            Close
          </button>
          <img src={'https://image.tmdb.org/t/p/w500/' + src} alt={alt} />
        </div>
      </div>
    );
  }
}
export default Modal;
