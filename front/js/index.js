


fetch('http://localhost:3000/api/products')/*appel de l'api*/
  .then((reponse) => reponse.json())
  .then((data) => listeProduits(data))
  .catch((erreur) => console.log(erreur));



function listeProduits(mesCanapes) {
  //console.log('voici le param que jutilise', mesCanapes);
  for (let i = 0; i < mesCanapes.length; i++) {
    let ancre = document.createElement("a"); /* création élément ancre*/
    document.querySelector("#items").appendChild(ancre);
    ancre.href = "./product.html?idKanap=" + mesCanapes[i]._id;/*insertion de "ancre"après "item" et du lien*/
    console.log('a chaque passage de boucle, voici litem que jai sous la main', mesCanapes[i]);
   

    let article = document.createElement("article");
    ancre.appendChild(article);
    
    let image = document.createElement("img");
    article.appendChild(image);
    image.src = mesCanapes[i].imageUrl;/*insere ici lien vers source image api*/
    image.alt = mesCanapes[i].altTxt;

    let nomDuCanap = document.createElement("h3");
    article.appendChild(nomDuCanap);
    nomDuCanap.classList.add("productName");
    nomDuCanap.innerText = mesCanapes[i].name;

    let paragrapheDescription = document.createElement("p");
    article.appendChild(paragrapheDescription);
    paragrapheDescription.classList.add("productDescription");
    paragrapheDescription.innerText = mesCanapes[i].description;
  }
}



  