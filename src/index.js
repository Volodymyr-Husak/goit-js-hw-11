// import './css/styles.css';
// import Notiflix from 'notiflix';
// import fetchCountries from './fetchCountries.js';
// // import countryListMarkup from './countryListMarkup';

// import debounce from 'lodash.debounce';

// const DEBOUNCE_DELAY = 300;

// const refs = {
//   inputEl: document.querySelector('#search-box'),
//   countryListEl: document.querySelector('.country-list'),
//   countryInfoEl: document.querySelector('.country-info'),
// };
// const { inputEl, countryListEl, countryInfoEl } = refs;

// inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// function onInput(event) {
//   let inputValue = event.target.value.trim();
//   if (inputValue === '') {
//     deleteCountryMarkup();
//     return;
//   }

//   const country = inputValue;

//   fetchCountries(country)
//     .then(country => {
//       // console.log(country);
//       renderCountryMarkup(country);
//     })
//     .catch(error => {
//       // console.warn(error);
//       deleteCountryMarkup();
//       Notiflix.Notify.failure('Oops, there is no country with that name.');
//     });
// }

// function deleteCountryMarkup() {
//   let itemCountryEl = document.querySelectorAll('.item-country');
//   let countryInfoItemEl = document.querySelector('.country-info-item');

//   itemCountryEl?.forEach(item => item.remove());
//   countryInfoItemEl?.remove();
// }

// function renderCountryMarkup(country) {
//   // console.log(country.length);
//   if (country.length > 10) {
//     deleteCountryMarkup();

//     return Notiflix.Notify.info(
//       'Too many matches found. Please enter a more specific name.'
//     );
//   }

//   if (country.length === 1) {
//     deleteCountryMarkup();

//     const countryObj = country[0];

//     // const countryLanguagesArr = Object.values(countryObj.languages);
//     let countryLanguagesArr = [];

//     const countryLanguagesArrObj = countryObj.languages;

//     countryLanguagesArrObj.map(countryLanguage =>
//       countryLanguagesArr.push(countryLanguage.name)
//     );

//     const markupInfo = `<div class="country-info-item">
//        <div class="country-flag-container">
//            <img class="country-info__flags" src="${countryObj.flags.svg}"
//                alt="flags ${countryObj.name}" width=30 >
//           <p class="country-info__text">${countryObj.name}</p>
//        </div>

//      <ul class="country-info__list">
//          <li class="country-info__item"><span class="country-info__bold-text">Capital:</span> ${countryObj.capital}</li>
//          <li class="country-info__item"><span class="country-info__bold-text">Population:</span> ${countryObj.population}</li>
//          <li class="country-info__item"><span class="country-info__bold-text">Languages:</span> ${countryLanguagesArr}</li>
//      </ul>
//      </div>`;

//     return countryInfoEl.insertAdjacentHTML('beforeend', markupInfo);
//   }

//   deleteCountryMarkup();

//   const markupList = country
//     .map(
//       count =>
//         `<li class="item-country">
//             <img class="country-flag" src="${count.flags.svg}"
//                alt="flags ${count.name}" width=30>
//             <p class="country-list__text">${count.name}</p>
//       </li>`
//     )
//     .join('');

//   return countryListEl.insertAdjacentHTML('beforeend', markupList);
// }

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
import './css/styles.css';
import Notiflix from 'notiflix';
import fetchPhoto from './fetchPhoto.js';

// import debounce from 'lodash.debounce';

const refs = {
  formEl: document.querySelector('#search-form'),
  inputEl: document.querySelector('input'),
  galleryEl: document.querySelector('.gallery'),
};

const { formEl, inputEl } = refs;
// console.log(inputEl);
let inputValue = '';

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
  const userSearch = inputValue;
  console.log(userSearch);

  fetchPhoto(userSearch)
    .then(search => console.log(search))
    .catch(error => console.log(error));

  // console.log(event.currentTarget);
}

function renderCountryMarkup(search) {
  const markupCard = `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;

  return galleryEl.insertAdjacentHTML('beforeend', markupCard);
}
// }
