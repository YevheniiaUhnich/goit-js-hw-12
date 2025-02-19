import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export async function  imagesTemplate(arrPict, tagGallery) {
    const gallery = document.querySelector(tagGallery);
    gallery.innerHTML = '';
  
    await new Promise(resolve => setTimeout(resolve, 0));

    const markup = arrPict.map((image) =>
      `<li class="gallery-item">
        <a class='gallery-link' href="${image.largeImageURL}">
          <img class="li-img" src="${image.webformatURL}" alt="${image.tags}" />
          <div class="li-text">
            <table class="table">
              <tr><td>Likes</td><td>Views</td><td>Comment</td><td>Downloads</td></tr>
              <tr><td>${image.likes}</td><td>${image.views}</td><td>${image.comments}</td><td>${image.downloads}</td></tr>
            </table>
          </div>
        </a>
      </li>`
    ).join("");
  
    gallery.insertAdjacentHTML("afterbegin", markup);
  
    const lightbox = new SimpleLightbox(tagGallery + " a", {
      captionsData: 'alt',
      captionDelay: 250,
      close: true,
    });

    await new Promise(resolve => setTimeout(resolve, 0));

    lightbox.refresh();

    gallery.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
          lightbox.close(); 
        }
      });
  }
  




