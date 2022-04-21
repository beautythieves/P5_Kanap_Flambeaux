const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const idKanap = urlParams.get('idKanap');
console.log('idKanap : ', idKanap);


fetch('http://localhost:3000/api/products/' + idKanap)/*appel de l'api*/
  .then((reponse) => reponse.json())
  .then((data) => createProduct(data))
  .catch((erreur) => console.log(erreur));

  function createProduct(monCanape) {
    console.log(monCanape);
  }