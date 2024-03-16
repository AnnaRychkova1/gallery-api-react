import { MdClose } from 'react-icons/md';
import { FcPicture } from 'react-icons/fc';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({
  closeModal,
  isModalOpen,
  imgSrc = <FcPicture size={360} />,
  imgDescription = 'Image according to your request',
  imgAltDescription = 'Image according to your request',
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
          <img className={css.image} src={imgSrc} alt={imgAltDescription} />
          <p className={css.imageInfo}>{imgDescription}</p>
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
