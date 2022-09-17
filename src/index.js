import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import './css/styles.css';
import Notiflix from 'notiflix';
import fetchPhoto from './fetchPhoto.js';

const refs = {
  formEl: document.querySelector('#search-form'),
  inputEl: document.querySelector('input'),
  galleryEl: document.querySelector('.gallery'),
  sentinelEl: document.querySelector('#sentinel'),
};

const { formEl, inputEl, galleryEl, sentinelEl } = refs;
// console.log(galleryEl.query);

let inputValue = '';
let page = 0;
let userSearch = '';
let totalHits = 0;
let hitsArr = [];

inputEl.addEventListener('input', onInput);

function onInput(event) {
  inputValue = event.currentTarget.value;
  return;
}

formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  userSearch = inputValue;
  page = 1;
  if (!userSearch) {
    deleteCountryMarkup();
    return;
  }

  deleteCountryMarkup();
  fetchPhoto(userSearch, page)
    .then(search => {
      // console.log(search);
      totalHits = search.data.totalHits;
      // console.log(totalHits);
      if (totalHits > 0) {
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
        return renderPhotoMarkup(search);
      }
      hitsArr = search.data.hits;
      // console.log(hitsArr);
      if (!hitsArr.length) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    })
    .catch(error => console.log(error));
}

let photoCardEl = [];
function deleteCountryMarkup() {
  photoCardEl = document.querySelectorAll('.photo-card');
  console.log(photoCardEl.length);
  photoCardEl?.forEach(element => element.remove());
}

function renderPhotoMarkup(search) {
  hitsArr = search.data.hits;

  const markupCard = hitsArr
    .map(
      hit =>
        `
      <a class="photo-link" href="${hit.largeImageURL}">
        <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width=300 height=200 />
        <div class="photo-card">
          <div class="info">
            <p class="info-item">
              <b>Likes</b><br>${hit.likes}
            </p>
            <p class="info-item">
              <b>Views</b><br>${hit.views}
            </p>
            <p class="info-item">
              <b>Comments</b><br>${hit.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b><br>${hit.downloads}
            </p>
          </div>
        </div>
      </a>>`
    )
    .join('');

  return galleryEl.insertAdjacentHTML('beforeend', markupCard);
}

const galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

galleryLightbox.refresh();
galleryLightbox.on('show.simplelightbox', function () {
  // do something…
});

// ========================================IntersectionObserver(Нескінченний скрол)=============================================
// setTimeout(() => {
const onEntry = entries => {
  // console.log(entries);
  entries.forEach(entry => {
    if (entry.isIntersecting && userSearch !== '') {
      console.log('Пора грузити ще');

      galleryLightbox.refresh();

      page += 1;
      let numberPages = totalHits / 40;

      if (page > Math.ceil(numberPages)) {
        return Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }

      fetchPhoto(userSearch, page)
        .then(search => {
          return renderPhotoMarkup(search);
        })
        .catch(error => console.log(error));
    }
  });
};

const options = {
  rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);

observer.observe(sentinelEl);
// }, 5000);

// ============================================================================================================================
