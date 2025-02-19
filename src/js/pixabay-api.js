import axios from 'axios';

// const baseUrl = "https://pixabay.com/api";
// const endPoint = "/api";

export default async function searchImages(searchWord) {
  const options = {
    params: {
      key: '48866244-bc210103fc5496976cb537971',
      q: searchWord,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

//   const url = baseUrl + endPoint + `?key=${options.params.key}&q=${options.params.q}&image_type=${options.params.image_type}&orientation=${options.params.orientation}&safesearch=${options.params.safesearch}`;
  const url = `https://pixabay.com/api/?key=${options.params.key}&q=${options.params.q}&image_type=${options.params.image_type}&orientation=${options.params.orientation}&safesearch=${options.params.safesearch}`;

  return axios.get(url);
}




