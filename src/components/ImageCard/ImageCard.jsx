// import css from './ImageCard.module.css';

// // eslint-disable-next-line react/display-name
// const ImageCard = ({ picture }) => {
//   return (
//     <div>
//       <img
//         className={css.imgItem}
//         width={250}
//         height={250}
//         src={picture.urls.small}
//         alt={picture.alt_description}
//       />
//       {/* <img width={250} src={picture.urls.regular} alt={picture.alt_description} /> */}

//       <div className={css.description}>
//         <span>
//           <span className={css.descrItem}>Likes:</span> {picture.likes}
//         </span>
//         <span>
//           <span className={css.descrItem}>Author:</span> {picture.user.name}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default ImageCard;

import { forwardRef } from 'react';
import css from './ImageCard.module.css';

// eslint-disable-next-line react/display-name
const ImageCard = forwardRef(({ picture }, ref) => {
  return (
    <div ref={ref}>
      <img
        className={css.imgItem}
        width={250}
        height={250}
        src={picture.urls.small}
        alt={picture.alt_description}
      />
      {/* <img width={250} src={picture.urls.regular} alt={picture.alt_description} /> */}

      <div className={css.description}>
        <span>
          <span className={css.descrItem}>Likes:</span> {picture.likes}
        </span>
        <span>
          <span className={css.descrItem}>Author:</span> {picture.user.name}
        </span>
      </div>
    </div>
  );
});

export default ImageCard;
