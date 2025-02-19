import searchImages from './js/pixabay-api';
import { imagesTemplate } from './js/render-function';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const waitMessage = document.querySelector(".wait-msg");
const loadingMessage = document.querySelector("#loading-message");

form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const searchWord = input.value.trim();

  if (!searchWord) {
    iziToast.show({
      backgroundColor: 'rgba(239, 64, 64, 1)',
      messageColor: `rgba(255, 255, 255, 1)`,
      close: `true`,
      position: "topRight",
      title: 'Error',
      titleColor: '#fff',
      titleSize: '16px',
      message: 'Input search string'
    });
    form.reset();
    return;
  }

  loadingMessage.style.display = 'block';
  
  searchImages(searchWord)
    .then(response => {
        loadingMessage.style.display = 'none'; 
      if (response.data.hits.length === 0) {
        iziToast.show({
          backgroundColor: 'rgba(239, 64, 64, 1)',
          messageColor: `rgba(255, 255, 255, 1)`,
          close: `true`,
          position: "topRight",
          title: 'Error',
          titleColor: '#fff',
          titleSize: '16px',
          message: ''
        });
      } else {
        imagesTemplate(response.data.hits, '.gallery');
      }
    })
    .catch(error => {
        loadingMessage.style.display = 'none';
      iziToast.show({
        backgroundColor: 'rgba(239, 64, 64, 1)',
        messageColor: `rgba(255, 255, 255, 1)`,
        close: `true`,
        position: "topRight",
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        message: 'Sorry, there are no images matching your search query. Please try again'
      });
      console.log(error);
    });

  form.reset();
}










