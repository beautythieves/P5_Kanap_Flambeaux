/* recuperation du panier*/
let monPanier = JSON.parse(localStorage.getItem("monPanier"));
console.log ("youpi", monPanier);

/*message d'alerte si le panier est vide*/
if (monPanier == null) {alert ("Votre panier est vide. Veuillez choisir un ou plusieurs article(s)")
}

else {
    for (let i = 0; i < monPanier.length; i++) {
        /*création de la balise article dans la section*/
        let articleProduit = document.createElement("article");
        document.querySelector("#cart__items").appendChild(articleProduit);
        console.log ("article", articleProduit);
        articleProduit.className = "cart__item";
        articleProduit.setAttribute("data-id", monPanier[i]._id);
        console.log ("article", articleProduit);
        /* pb ici insertion data id, data color?*/

        /*insertion DIV image produit*/
        let divImage = document.createElement("div");
        document.querySelector("article").appendChild(divImage);
        divImage.classname = "cart__item__img";
        console.log("divimage", divImage);

        /*insertion image canapé*/
        let photoCanape = document.createElement("img");
        divImage.appendChild(photoCanape);
        photoCanape.src = monPanier[i].imageUrl;
        console.log("photo du canapé", photoCanape);
        /*!!pb ci dessus insertion image?*/

        let contentItem = document.createElement("div");
        

        

    }
}