const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const idKanap = urlParams.get('idKanap');
console.log('idKanap : ', idKanap);


fetch('http://localhost:3000/api/products/' + idKanap)/*appel de l'api*/
  .then((reponse) => reponse.json())
  .then((data) => {
    createProduct(data);
  })
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
  /* récupération du choix du (des) canapés*/
  let btn = document.querySelector("#addToCart");
  btn.onclick = function() {
    addToCart(monCanape);      
  }    
}/* fermeture finale

       
      
    
        /* ci dessous les conditions cas 1: si le localstorage est vide*/

        /*localStorage.setItem("monPanier", JSON stringify(monCanape));
        console.log(JSON.parse(localStorage.getItem('monPanier')));*/

        //cas 1: le localStorage est vide
        //cas 2: il n'est pas vide
        //cas 3: il n'est pas vide, ET il contient déja un canapé du meme type

        //POUR METTRE UN OBJET DANS LE LOCAL STORAGE
        //localStorage.setItem('monPanier', JSON.stringify(monCanape));

        //POUR RECUPERER UN OBJET DU LOCAL SOTRAGE
        //console.log(JSON.parse(localStorage.getItem('monPanier')));
        
     
function addToCart(monCanape) {
  let myQuantity = document.querySelector("#quantity");
  console.log ("aburasan", myQuantity);
  let maVraieQuantité = myQuantity.value;
  console.log ( "quantité", maVraieQuantité);
  console.log ("couleur", typeof "colors");
  let maCouleur = document.querySelector("#colors");
  console.log ("jijilamoro", maCouleur);
  let choixDuCanape = {
    quantity : maVraieQuantité,
    color : maCouleur.value,
    id : monCanape._id
  };
  console.log("choix", choixDuCanape);

  if (choixDuCanape.color == "") alert("Veuillez choisir une couleur");

  //Je récupère mon panier du localStorage
  let myCart = JSON.parse(localStorage.getItem('monPanier'));
  //Je controle si mon Panier est vide (egal a undefined ou null)
   //SI OUI on créé le localstorage et on y ajoute notre canapé
  if (myCart == null) {
    let monTableauDeCanapes = [];
    monTableauDeCanapes.push(choixDuCanape);
    localStorage.setItem("monPanier", JSON.stringify(monTableauDeCanapes));
  } else { 
    let find = false;
    for (let i = 0; i < myCart.length; i++) {      
      if (myCart[i].id === choixDuCanape.id && myCart[i].color == choixDuCanape.color) {
        myCart[i].quantity = myCart[i].quantity + choixDuCanape.quantity;
        find = true;
      }
    }
    if (!find) myCart.push(choixDuCanape);
    localStorage.setItem("monPanier", JSON.stringify(myCart));
  //Si NON: Je controle  si le canapé que j'essaie d'ajouter est déja présent
  //SI oui, simplement modifier la quantité déja présente dans le lpanier du localstorage
  //le panier existe + notre canapé n'y est pas présent//SI non :  on ajoute le choixducanape à mycart
  }    
}