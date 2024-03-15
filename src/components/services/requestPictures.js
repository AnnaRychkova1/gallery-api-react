import axios from 'axios';

const ACCESS_KEY = 'ND8oz0aY_3XkRT-fyTvYL4F-lbiSjPoBeEjnx7f7xh4';

const requestPictures = async (query, page) => {
  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos?page=${page}&query=${query}`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );
  return data;
};

export default requestPictures;
