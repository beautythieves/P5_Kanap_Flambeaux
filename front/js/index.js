principale();

function principale(){
  /*appel de l'api*/
  fetch('http://localhost:3000/api/products')
  .then((reponse) => reponse.json())
  .then((data) => listeProduits(data))
  .catch((erreur) => console.log(erreur));
}

function listeProduits(mesCanapes) {
  for (let i = 0; i < mesCanapes.length; i++) {
    /* création et insertion élément ancre*/
    let ancre = document.createElement("a"); 
    document.querySelector("#items").appendChild(ancre);
    ancre.href = "./product.html?idKanap=" + mesCanapes[i]._id;

    /*création et insertion élément article*/
    let article = document.createElement("article");
    ancre.appendChild(article);
    
    /*création et insertion élément image*/
    let image = document.createElement("img");
    article.appendChild(image);
    image.src = mesCanapes[i].imageUrl;
    image.alt = mesCanapes[i].altTxt;

    /*création et insertion élément nom du canapé*/
    let nomDuCanap = document.createElement("h3");
    article.appendChild(nomDuCanap);
    nomDuCanap.classList.add("productName");
    nomDuCanap.innerText = mesCanapes[i].name;

    /*création et insertion élément description du produit*/
    let paragrapheDescription = document.createElement("p");
    article.appendChild(paragrapheDescription);
    paragrapheDescription.classList.add("productDescription");
    paragrapheDescription.innerText = mesCanapes[i].description;
  }
}



  