import { useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { noquery, errorMes } from './components/services/toaster';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemRef = useRef(null);
  const heightRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState({
    imgSrc: '',
    imgDescription: '',
    imgAltDescription: '',
  });

  useEffect(() => {
    if (!searchQuery) {
      setLoadMore(false);
      setIsModalOpen(false);
      setIsError(false);
      return;
    }

    async function fetchPicturesByQuery() {
      try {
        setLoadMore(false);
        setIsError(false);
        setIsModalOpen(false);
        setIsLoading(true);

        const data = await requestPictures(searchQuery, page);
        console.log(data.results);
        console.log(data.total);

        if (data.total === 0) {
          noquery();
          return;
        }

        if (data.total_pages > page) {
          setLoadMore(true);
        }

        setPictures(prevState => prevState.concat(data.results));
      } catch (err) {
        setIsError(true);
        errorMes();
      } finally {
        setIsLoading(false);
      }
    }

    fetchPicturesByQuery();
  }, [searchQuery, page]);

  useEffect(() => {
    if (page <= 1) {
      return;
    }

    if (itemRef.current) {
      const height = itemRef.current.getBoundingClientRect().height;
      heightRef.current = height;
      console.log(heightRef.current);
      window.scrollBy({
        top: heightRef.current,
        behavior: 'smooth',
      });
    }
  }, [pictures, page]);

  const handleSearchQuery = query => {
    setSearchQuery(query);
    setPage(1);
    setPictures([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    openModal();
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchQuery} />
      {isError && <ErrorMessage />}
      <ImageGallery
        ref={itemRef}
        pictures={pictures}
        onImageClick={handleImageClick}
      />
      {isLoading && <Loader />}
      {loadMore && <LoadMoreBtn onLoadMore={handleLoadMore} />}
      {isModalOpen && (
        <ImageModal
          {...selectedImage}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
        />
      )}
      <Toaster
        toastOptions={{
          style: {
            background: '#4e75ff',
            color: '#fff',
          },
        }}
      />
    </>
  );
};

export default App;

// import { useEffect, useRef, useState } from 'react';

// // import css from './App.module.css';
// import requestPictures from './components/services/requestPictures';
// import ErrorMessage from './components/ErrorMessage/ErrorMessage';
// import Loader from './components/Loader/Loader';
// import ImageGallery from './components/ImageGallery/ImageGallery';
// import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
// import ImageModal from './components/ImageModal/ImageModal';
// import SearchBar from './components/SearchBar/SearchBar';

// const App = () => {
//   const [searchQuery, setSearchQuery] = useState(null);
//   const [pictures, setPictures] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [loadMore, setLoadMore] = useState(false);
//   const [page, setPage] = useState(1);

//   const itemRef = useRef(null);
//   const heightRef = useRef(null);

//   const btnRef = useRef();

//   useEffect(() => {
//     if (itemRef.current) {
//       const height = itemRef.current.getBoundingClientRect().height;
//       heightRef.current = height;
//       console.log(heightRef.current);
//     }
//   });

//   useEffect(() => console.log(btnRef.current));

//   useEffect(() => {
//     if (searchQuery === null) return;

//     async function fetchPicturesByQuery() {
//       try {
//         setLoadMore(false);
//         setIsLoading(true);
//         setIsError(false);
//         const data = await requestPictures(searchQuery, page);
//         console.log(data.results);

//         if (data.total === 0) {
//           console.log('nothing found');
//         }

//         if (data.total_pages > page) {
//           setLoadMore(true);
//         }
//         console.log(data.total_pages);
//         console.log(data.total);

//         setPictures(prevState => prevState.concat(data.results));
//       } catch (err) {
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchPicturesByQuery();
//   }, [searchQuery, page, heightRef]);

//   const handleSearchQuery = query => {
//     setSearchQuery(query);
//     setPage(1);
//     setPictures([]);
//   };

//   const handleLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//     window.scrollTo({
//       top: heightRef.current,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <>
//       <SearchBar onSubmit={handleSearchQuery} />
//       {isError && <ErrorMessage />}
//       <ImageGallery ref={itemRef} pictures={pictures} />
//       {isLoading && <Loader />}
//       {loadMore && <LoadMoreBtn ref={btnRef} onLoadMore={handleLoadMore} />}
//       <ImageModal />
//     </>
//   );
// };

// export default App;

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
