import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <button className={css.loadMoreBtn} onClick={onLoadMore}>
      Load More
    </button>
  );
};

LoadMoreBtn.displayName = 'LoadMoreBtn';

export default LoadMoreBtn;
