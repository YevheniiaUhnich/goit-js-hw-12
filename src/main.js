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
  endOfResultsMessage.style.display = 'none';

  await fetchImages();
});

async function fetchImages() {
  loadingMessage.style.display = 'block';

  try {
    const response = await searchImages(searchWord, page, per_page);
    loadingMessage.style.display = 'none';

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

    totalHits = response.data.totalHits;
    console.log(`Total images available: ${totalHits}`);
    console.log(`Images received: ${response.data.hits.length}`);

    // Додаємо нові фото, а не замінюємо старі
    imagesTemplate(response.data.hits, '.gallery', true);

    page += 1;

    if ((page - 1) * per_page >= totalHits) {
      loadMoreBtn.style.display = 'none';
      endOfResultsMessage.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'block';
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

loadMoreBtn.addEventListener('click', async function () {
  await fetchImages();
});
  
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