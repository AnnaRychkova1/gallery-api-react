import css from './ImageModal.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageModal = ({
  closeModal,
  isModalOpen,
  imgSrc,
  imgDescription,
  imgAltDescription,
}) => {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className={css.modal}
        overlayClassName={css.overlay}
      >
        <button onClick={closeModal}>Close Modal</button>
        <div className={css.imageContainer}>
          <img className={css.image} src={imgSrc} alt={imgAltDescription} />
        </div>
        <div className={css.imageDescription}>
          <p className={css.imageInfo}>{imgDescription}</p>
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
