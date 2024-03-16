import css from './ImageGallery.module.css';

import ImageCard from '../ImageCard/ImageCard';
import { forwardRef } from 'react';

const ImageGallery = forwardRef(({ pictures, onImageClick }, ref) => {
  return (
    <ul ref={ref} className={css.gallery}>
      {pictures !== null &&
        Array.isArray(pictures) &&
        pictures.map(picture => {
          return (
            <li className={css.itemsGallery} key={picture.id}>
              <ImageCard
                ref={ref}
                picture={picture}
                onImageClick={onImageClick}
              />
            </li>
          );
        })}
    </ul>
  );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;

// import css from './ImageGallery.module.css';

// import ImageCard from '../ImageCard/ImageCard';

// const ImageGallery = ({ pictures }, ref) => {
//   return (
//     <ul className={css.gallery}>
//       {pictures !== null &&
//         Array.isArray(pictures) &&
//         pictures.map(picture => {
//           return (
//             <li ref={ref} className={css.itemsGallery} key={picture.id}>
//               <ImageCard picture={picture} />
//             </li>
//           );
//         })}
//     </ul>
//   );
// };

// export default ImageGallery;
