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

      /* choix de la couleur du canapé*/
      /* meilleure méthode pour ce type de données*/
      for (let couleur of monCanape.colors) {
        let choix = document.createElement("option");
        document.querySelector("#colors").appendChild(choix);
        choix.value = couleur;
        choix.textContent = couleur;
        console.log ("choose", couleur);
      }

      let btn = document.querySelector("#addToCart");
      btn.onclick = function() {
        //récupérer le canapé en question, le foutre dans le localstorage
        let myQuantity = document.querySelector('#quantity');
        let mavraiquantit= myQuantity.value;
        console.log(mavraiquantit);

        let monCanapCustom = {
          quantity: mavraiquantit,
          id: monCanape._id,
          color: '',
        };
        console.log(monCanapCustom)
        
        //cas 1: le localStorage est vide
        //cas 2: il n'est pas vide
        //cas 3: il n'est pas vide, ET il contient déja un canapé du meme type

        //POUR METTRE UN OBJET DANS LE LOCAL STORAGE
        //localStorage.setItem('monPanier', JSON.stringify(monCanape));

        //POUR RECUPERER UN OBJET DU LOCAL SOTRAGE
        //console.log(JSON.parse(localStorage.getItem('monPanier')));
        
      }
    }
  