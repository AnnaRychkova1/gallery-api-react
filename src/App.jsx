import { useEffect, useRef, useState } from 'react';

// import css from './App.module.css';
import requestPictures from './components/services/requestPictures';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  const itemRef = useRef(null);
  const heightRef = useRef(null);

  useEffect(() => {
    if (itemRef.current) {
      const height = itemRef.current.getBoundingClientRect().height;
      heightRef.current = height;
      window.scrollTo({
        top: heightRef.current,
        behavior: 'smooth',
      });
      console.log(heightRef.current);
    }
  });

  useEffect(() => {
    if (searchQuery === null) return;

    async function fetchPicturesByQuery() {
      try {
        setLoadMore(false);
        setIsLoading(true);
        setIsError(false);
        const data = await requestPictures(searchQuery, page);
        console.log(data.results);

        if (data.total === 0) {
          console.log('nothing found');
        }

        if (data.total_pages > page) {
          setLoadMore(true);
        }
        console.log(data.total_pages);
        console.log(data.total);

        setPictures(prevState => prevState.concat(data.results));
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPicturesByQuery();
  }, [searchQuery, page, heightRef]);

  const handleSearchQuery = query => {
    setSearchQuery(query);
    setPage(1);
    setPictures([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchQuery} />
      {isError && <ErrorMessage />}
      <ImageGallery ref={itemRef} pictures={pictures} />
      {isLoading && <Loader />}
      {loadMore && <LoadMoreBtn onLoadMore={handleLoadMore} />}
      <ImageModal />
    </>
  );
};

export default App;

// import { useEffect, useState } from 'react';

// // import css from './App.module.css';
// import requestPictures from './components/services/requestPictures';
// import ErrorMessage from './components/ErrorMessage/ErrorMessage';
// import Loader from './components/Loader/Loader';
// import ImageGallery from './components/ImageGallery/ImageGallery';
// import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
// import ImageModal from './components/ImageModal/ImageModal';
// import SearchBar from './components/SearchBar/SearchBar';

// const App = () => {
//   const [loadMore, setLoadMore] = useState(false);
//   const [searchQuery, setSearchQuery] = useState(null);
//   const [pictures, setPictures] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   let page = 0;

//   useEffect(() => {
//     if (searchQuery === null) return;

//     async function fetchPicturesByQuery() {
//       try {
//         setLoadMore(false);
//         setIsLoading(true);
//         const data = await requestPictures(searchQuery, page);
//         console.log(data);
//         if (data.total_pages > 1) {
//           setLoadMore(true);
//         }

//         setPictures(data.results);
//       } catch (err) {
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchPicturesByQuery();
//   }, [searchQuery, page]);

//   const handleSearchQuery = query => {
//     setSearchQuery(query);
//   };

//   return (
//     <>
//       <SearchBar onSubmit={handleSearchQuery} />
//       {isError && <ErrorMessage />}
//       <ImageGallery pictures={pictures} />
//       {isLoading && <Loader />}
//       {loadMore && <LoadMoreBtn />}
//       <ImageModal />
//     </>
//   );
// };

// export default App;
