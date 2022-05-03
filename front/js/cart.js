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
        divImage.classList.add("cart__item__img");
        console.log("divimage", divImage);

        /*insertion image canapé l.53 (cf.cart.html)*/
        let photoCanape = document.createElement("img");
        divImage.appendChild(photoCanape);
        photoCanape.src = monPanier[i].imageUrl;
        console.log("photo du canapé", photoCanape);
        /*!!pb ci dessus insertion image?*/

        /*insertion div l.55 à l.70(cf cart.html)*/
        let cartItemContent = document.createElement("div");
        articleProduit.appendChild(cartItemContent);
        cartItemContent.classList.add("cart__item__content");
        console.log("cart item", cartItemContent);

        /*insertion div l.56 à l.60 (cf cart.html)*/
        let cartItemContentDescription = document.createElement("div");
        cartItemContent.appendChild(cartItemContentDescription);
        cartItemContentDescription.classList.add("cart__item__content__description");
        console.log("div56 à 60", cartItemContentDescription);
        
        /*insertion h2 nom du produit(cf l.57 cart.html)*/
        let nomDuProduit = document.createElement("h2");
        cartItemContentDescription.appendChild(nomDuProduit);
        nomDuProduit.innerText = monPanier[i].name;
        console.log("nom", nomDuProduit);
        
        /* insertion de la couleur (balise p, l.58 cart.html)*/
        let couleurDuProduit = document.createElement("p");
        cartItemContentDescription.appendChild(couleurDuProduit);
        couleurDuProduit.innerText = monPanier[i].color;
        console.log("coloro", couleurDuProduit);

        /*insertion de la balise p "prix", l.59 cart.html*/
        let prixDuProduit = document.createElement("p");
        cartItemContentDescription.appendChild(prixDuProduit);
        prixDuProduit.innerText = monPanier[i].prixDuCanape;
        console.log("atouprix!", prixDuProduit);

        /*insertion de la balise div l.61 à l.69 cart.html*/
        let cartItemContentSettings = document.createElement("div");
        cartItemContent.appendChild(cartItemContentSettings);
        cartItemContentSettings.classList.add("cart__item__content__settings");
        console.log("lalala", cartItemContentSettings);

        /*insertion de la balise div l.62 à l.65 cart.html*/
        let cartItemContentSettingsQuantity = document.createElement("div");
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
        cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
        console.log("ketafé", cartItemContentSettingsQuantity);

        /*insertion de la balise p "Qté", l.63 cart.html*/
        let quantité = document.createElement("p");
        cartItemContentSettingsQuantity.appendChild(quantité);
        quantité.innerText = "Qté :";

        /*insertion de la balise input quantité, l.64 cart.html*/
        
    
    }
}