//j'appelle l'api (en utilisant fetch) pour recevoir la liste de tous les canapés
// cette liste, la parcourir, et pour chacun des canapés, créer des éléments <a>, <div>, etc ..., y ajouter les bonnes infos
//ET on ajoute ces éléments au noeud HTML déja exisatnt section.items

//js how to use fetch to call api


fetch('http://localhost:3000/api/products')/*appel de l'api*/
  .then((reponse) => reponse.json())
  .then((data) => listeProduits(data))
  .catch((erreur) => console.erreur(erreur));

  function listeProduits {/* ci-dessous création boucle*/
  for (let i = 0 < data.length;i++){ 

  let ancre = document.createElement("a"); /* création élément ancre*/
  document.querySelector("#item").appendChild(ancre);
  ancre.href="./product.html?id=42";/*insertion de "ancre"après "item" et du lien*/
}
}



  