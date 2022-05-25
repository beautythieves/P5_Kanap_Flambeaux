principale();

function principale() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  const idKanap = urlParams.get('idKanap');
    
  /*appel de l'api*/
  fetch('http://localhost:3000/api/products/' + idKanap)
    .then((reponse) => reponse.json())
    .then((data) => {
      créationproduit(data);
    })
    .catch((erreur) => console.log(erreur));
  
}


function créationproduit(monCanape) {

  /*insertion de la photo du canapé*/
  let photo = document.createElement("img");
  document.querySelector(".item__img").appendChild(photo);
  photo.src = monCanape.imageUrl;
  photo.alt = monCanape.alt;

  /*insertion du nom du canapé*/
  let nomDuCanape = document.createElement("h1");
  document.querySelector("#title").appendChild(nomDuCanape);
  nomDuCanape.innerText = monCanape.name;

  /*insertion du prix du canapé*/
  let prixDuCanape = document.createElement("p");
  document.querySelector ("#price").appendChild(prixDuCanape);
  prixDuCanape.innerText = monCanape.price;

  /*insertion du descriptif du canapé*/
  let DescriptifCanape = document.getElementById("description");
  DescriptifCanape.innerHTML = monCanape.description;

  /* choix de la couleur du canapé*/
  for (let couleur of monCanape.colors) {
    let choix = document.createElement("option");
    document.querySelector("#colors").appendChild(choix);
    choix.value = couleur;
    choix.textContent = couleur;
  }
  /* récupération du choix du (des) canapés*/
  let btn = document.querySelector("#addToCart");
  btn.onclick = function() {
    addToCart(monCanape);      
  }    
}
       
         
        //cas 1: le localStorage est vide
        //cas 2: il n'est pas vide
        //cas 3: il n'est pas vide, ET il contient déja un canapé du meme type

        //POUR METTRE UN OBJET DANS LE LOCAL STORAGE
        //localStorage.setItem('monPanier', JSON.stringify(monCanape));

        //POUR RECUPERER UN OBJET DU LOCAL SOTRAGE
        //console.log(JSON.parse(localStorage.getItem('monPanier')));
        
     
function addToCart(monCanape) {
  let maQuantité = document.querySelector("#quantity");
  let maVraieQuantité = maQuantité.value;
  let maCouleur = document.querySelector("#colors");
  let choixDuCanape = {
    quantity : maVraieQuantité,
    color : maCouleur.value,
    id : monCanape._id
  };

  if (choixDuCanape.color == "") alert("Veuillez choisir une couleur");

  /*Je récupère mon panier du localStorage*/
  let monPanier = JSON.parse(localStorage.getItem('monPanier'));
  /*Je controle si mon Panier est vide (egal à null).
   Si Oui on créé le localstorage et on y ajoute notre canapé*/
  if (monPanier == null) {
    let monTableauDeCanapes = [];
    monTableauDeCanapes.push(choixDuCanape);
    localStorage.setItem("monPanier", JSON.stringify(monTableauDeCanapes));
  } else { 
    let find = false;
    for (let i = 0; i < monPanier.length; i++) {      
      if (monPanier[i].id === choixDuCanape.id && monPanier[i].color == choixDuCanape.color) {
        monPanier[i].quantity = monPanier[i].quantity + choixDuCanape.quantity;
        find = true;
      }
    }
    if (!find) monPanier.push(choixDuCanape);
    localStorage.setItem("monPanier", JSON.stringify(monPanier));
  //Si NON: Je controle  si le canapé que j'essaie d'ajouter est déja présent
  //SI oui, simplement modifier la quantité déja présente dans le lpanier du localstorage
  //le panier existe + notre canapé n'y est pas présent//SI non :  on ajoute le choixducanape à monPanier
  }    
}
