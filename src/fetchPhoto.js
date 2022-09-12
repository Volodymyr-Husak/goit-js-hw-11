// export default function fetchCountries(name) {
//   return fetch(
//     `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .catch(error => {
//       console.warn(error);
//     });
// }

export default async function fetchPhoto(userSearch) {
  // return fetch(
  //   // `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  //   `https://pixabay.com/api/?key=29882224-53e6cb6eb5c61ad27904c20c4&q=yellow+flowers&image_type=photo`
  // )
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return response.json();
  // })
  // .catch(error => {
  //   console.warn(error);
  // });
  // userSearch
  const response = await fetch(
    `https://pixabay.com/api/?key=29882224-53e6cb6eb5c61ad27904c20c4&q=${userSearch}}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  const result = await response.json();
  return result;
}

// const fetchUsers = async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/users');
//   const users = await response.json();
//   return users;
// };
