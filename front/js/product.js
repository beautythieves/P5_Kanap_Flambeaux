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

    /*insertion de la photo du canapé*/
      let photo = document.createElement("img");
      document.querySelector(".item__img").appendChild(photo);
      photo.src = monCanape.imageUrl;
      photo.alt = monCanape.alt;
      console.log('photo', photo);
    
      /*insertion du nom du canapé*/
      let nomDuCanape = document.createElement("h1");
      document.querySelector("#title").appendChild(nomDuCanape);
      nomDuCanape.innerText = monCanape.name;
      console.log( "nom", nomDuCanape);

      /*insertion du prix du canapé*/
      let prixDuCanape = document.createElement("p");
      document.querySelector ("#price").appendChild(prixDuCanape);
      prixDuCanape.innerText = monCanape.price;
      console.log ("prix", prixDuCanape );

      /*insertion du descriptif du canapé*/
      let DescriptifCanape = document.getElementById("description");
      DescriptifCanape.innerHTML = monCanape.description;

      /*choix de la couleur
      for (let couleurs of )
      {

      }
      console.log ("coloro", couleurs)*/
    }
