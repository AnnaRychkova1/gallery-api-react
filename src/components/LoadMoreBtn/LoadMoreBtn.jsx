import { forwardRef } from 'react';
import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = forwardRef(({ onLoadMore }, ref) => {
  return (
    <button ref={ref} className={css.loadMoreBtn} onClick={onLoadMore}>
      Load More
    </button>
  );
});

LoadMoreBtn.displayName = 'LoadMoreBtn';

export default LoadMoreBtn;
