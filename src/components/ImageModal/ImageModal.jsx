import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({
  closeModal,
  isModalOpen,
  imgSrc = 'https://pixabay.com/vectors/default-emblem-icon-icons-matt-1294448/',
  imgDescription = 'Image according to your request',
  imgAlt = 'Image according to your request',
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
        <button className={css.btnCloseModal} onClick={closeModal}>
          <MdClose size={36} />
        </button>
        <div className={css.imageContainer}>
          <img className={css.image} src={imgSrc} alt={imgAlt} />
          <p className={css.imageInfo}>{imgDescription}</p>
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
