import './css/styles.css';
import Notiflix from 'notiflix';
import fetchPhoto from './fetchPhoto.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// import debounce from 'lodash.debounce';

const refs = {
  formEl: document.querySelector('#search-form'),
  inputEl: document.querySelector('input'),
  galleryEl: document.querySelector('.gallery'),
};

const { formEl, inputEl, galleryEl } = refs;
// console.log(galleryEl);
let inputValue = '';

inputEl.addEventListener('input', onInput);

function onInput(event) {
  // console.log(event.currentTarget.value);
  inputValue = event.currentTarget.value;
  return;
}
// console.log(onInput());
formEl.addEventListener('submit', onSubmit);

let page = 1;

function onSubmit(event) {
  event.preventDefault();
  const userSearch = inputValue;
  console.log(userSearch);
  deleteCountryMarkup();
  fetchPhoto(userSearch)
    .then(search => {
      console.log(search);
      return renderPhotoMarkup(search);
    })
    .catch(error => console.log(error));

  // console.log(event.currentTarget);
}

function deleteCountryMarkup() {
  let photoCardEl = document.querySelectorAll('.photo-card');
  photoCardEl?.forEach(element => element.remove());
}

function renderPhotoMarkup(search) {
  console.log(search.data);
  const hitsArr = search.data.hits;
  console.log(hitsArr);
  if (!hitsArr.length) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  const totalHits = search.totalHits;
  // console.log(search.totalHits);
  Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

  const markupCard = hitsArr
    .map(
      hit => `      
      <a class="photo-link" href="${hit.largeImageURL}">
        <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width=300 height=200/>
      </a>`
    )
    .join('');

  return galleryEl.insertAdjacentHTML('beforeend', markupCard);
}

new SimpleLightbox('.gallery a', {
  /* options */
  captionsData: 'alt',
  captionDelay: 250,
});
// var gallery = $('.gallery a').simpleLightbox();

// gallery.next(); // Next Image

// `
//       <a class="photo-link" href="${hit.largeImageURL}">
//       <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width=300 height=200/>
//       </a>
//       <div class="photo-card">
//     <div class="info">
//     <p class="info-item">
//       <b>Likes</b><br>${hit.likes}
//     </p>
//     <p class="info-item">
//       <b>Views</b><br>${hit.views}
//     </p>
//     <p class="info-item">
//       <b>Comments</b><br>${hit.comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads</b><br>${hit.downloads}
//     </p>
//   </div>
// </div>`;
