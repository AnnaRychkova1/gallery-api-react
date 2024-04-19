import ImageCard from '../ImageCard/ImageCard';

import css from './ImageGallery.module.css';

const ImageGallery = ({ pictures, onImageClick }) => {
  return (
    <ul className={css.gallery}>
      {pictures !== null &&
        Array.isArray(pictures) &&
        pictures.map(picture => {
          return (
            <li className={css.itemsGallery} key={picture.id}>
              <ImageCard picture={picture} onImageClick={onImageClick} />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
