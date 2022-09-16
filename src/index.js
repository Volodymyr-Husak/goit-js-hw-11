import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// import InfiniteScroll from 'infinite-scroll';

import './css/styles.css';
import Notiflix from 'notiflix';
import fetchPhoto from './fetchPhoto.js';

// import debounce from 'lodash.debounce';
// console.log(SimpleLightbox);

const refs = {
  formEl: document.querySelector('#search-form'),
  inputEl: document.querySelector('input'),
  galleryEl: document.querySelector('.gallery'),
  // photoCardEl,
  sentinelEl: document.querySelector('#sentinel'),
};

const { formEl, inputEl, galleryEl, sentinelEl } = refs;
// console.log(galleryEl.query);

let inputValue = '';
let page = 0;
let userSearch = '';
let totalHits = 0;

inputEl.addEventListener('input', onInput);

function onInput(event) {
  // console.log(event.currentTarget.value);
  inputValue = event.currentTarget.value;
  return;
}
// console.log(onInput());
formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  userSearch = inputValue;
  page = 1;
  if (!userSearch) {
    deleteCountryMarkup();
    return;
  }
  // console.log(userSearch);
  deleteCountryMarkup();
  fetchPhoto(userSearch, page)
    .then(search => {
      // console.log(search);
      totalHits = search.data.totalHits;
      // console.log(totalHits);
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

      return renderPhotoMarkup(search);
    })
    .catch(error => console.log(error));

  // console.log(event.currentTarget);
}
// let photoCardEl = document.querySelectorAll('.photo-card');
// console.log(photoCardEl);
let photoCardEl = [];
function deleteCountryMarkup() {
  photoCardEl = document.querySelectorAll('.photo-card');
  console.log(photoCardEl.length);
  photoCardEl?.forEach(element => element.remove());
}

function renderPhotoMarkup(search) {
  // console.log(search.data);
  const hitsArr = search.data.hits;
  // console.log(hitsArr);
  if (!hitsArr.length) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  // totalHits = 0;
  // totalHits = search.data.totalHits;
  // // console.log(totalHits);
  // Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

  const markupCard = hitsArr
    .map(
      hit =>
        `
      <a class="photo-link" href="${hit.largeImageURL}">
      
      
      <div class="photo-card">
      <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width=300 height=200/>
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
</div> </a>`
    )
    .join('');

  return galleryEl.insertAdjacentHTML('beforeend', markupCard);
}
// `<a class="photo-link" href="${hit.largeImageURL}">
//       <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width=300 height=200/>
//     </a>`
new SimpleLightbox('.gallery a', {
  /* options */
  captionsData: 'alt',
  captionDelay: 250,
});

// ========================================IntersectionObserver(Нескінченний скрол)=============================================
const onEntry = entries => {
  // console.log(entries);
  entries.forEach(entry => {
    if (entry.isIntersecting && userSearch !== '') {
      // console.log('Пора грузити ще');
      page += 1;
      let numberPages = totalHits / page;
      console.log('page', page);
      console.log('totalHits', totalHits);
      console.log('numberPages', numberPages);
      fetchPhoto(userSearch, page)
        .then(search => {
          // console.log(search);

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
// ============================================================================================================================
