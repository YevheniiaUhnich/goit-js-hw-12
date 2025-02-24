import searchImages from './js/pixabay-api';
import { imagesTemplate } from './js/render-function';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const gallery = document.querySelector(".gallery");
const loadingMessage = document.querySelector("#loading-message");
const loadMoreBtn = document.querySelector("#load-more");
const endOfResultsMessage = document.querySelector("#end-message");

let searchWord = "";
let page = 1;
const per_page = 40;
let totalHits = 0;

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  searchWord = input.value.trim();

  if (!searchWord) {
    iziToast.show({
      backgroundColor: 'rgba(239, 64, 64, 1)',
      messageColor: 'rgba(255, 255, 255, 1)',
      close: true,
      position: "topRight",
      title: 'Error',
      titleColor: '#fff',
      titleSize: '16px',
      message: 'Input search string'
    });
    return;
  }

  gallery.innerHTML = ''; 
  page = 1; 
  loadMoreBtn.style.display = 'none'; 

  const response = await searchImages(searchWord, page, per_page);
    loadingMessage.style.display = 'none';
    try {
  if (response.data.hits.length === 0) {
    iziToast.show({
      backgroundColor: 'rgba(239, 64, 64, 1)',
      messageColor: 'rgba(255, 255, 255, 1)',
      close: true,
      position: "topRight",
      title: 'Error',
      titleColor: '#fff',
      titleSize: '16px',
      message: 'Sorry, there are no images matching your search query. Please try again'
    });
    return;
  }
  imagesTemplate(response.data.hits);
  totalHits = response.data.totalHits;
  input.value='';

  if (totalHits>per_page){
   loadMoreBtn.style.display = 'block'
}
}catch (error) {
    loadingMessage.style.display = 'none';
    console.error(error);
    iziToast.show({
      backgroundColor: 'rgba(239, 64, 64, 1)',
      messageColor: 'rgba(255, 255, 255, 1)',
      close: true,
      position: 'topRight',
      title: 'Error',
      titleColor: '#fff',
      titleSize: '16px',
      message: 'Sorry, there was an error fetching images. Please try again.',
    });
  }
});

async function loadMore() {
  loadingMessage.style.display = 'block';
  page += 1;

  try {
    const response = await searchImages(searchWord, page, per_page);
    totalHits = response.data.totalHits;
    console.log(`Total images available: ${totalHits}`);
    console.log(`Images received: ${response.data.hits.length}`);

    imagesTemplate(response.data.hits);
   
    loadMoreBtnEl.classList.remove('is-hidden');

    const lastPage = Math.ceil(totalHits / pixabayApi.perPage);

    if (lastPage === pixabayApi.page) {
      loadMoreBtnEl.classList.add('is-hidden');

      iziToast.info({
position: 'topRight',
message: "We're sorry, but you've reached the end of search results",
      })
    }

    smoothScroll();
  } catch (error) {
    loadingMessage.style.display = 'none';
    console.error(error);
    iziToast.show({
      backgroundColor: 'rgba(239, 64, 64, 1)',
      messageColor: 'rgba(255, 255, 255, 1)',
      close: true,
      position: 'topRight',
      title: 'Error',
      titleColor: '#fff',
      titleSize: '16px',
      message: 'Sorry, there was an error fetching images. Please try again.',
    });
  }
}

loadMoreBtn.addEventListener('click', loadMore);
  
function smoothScroll() {
  const galleryItem = document.querySelector('.gallery img');
  if (galleryItem) {
    const cardHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}