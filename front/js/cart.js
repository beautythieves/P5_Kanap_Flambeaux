main();

function main() {
    let monPanier = JSON.parse(localStorage.getItem("monPanier"));
    displayCanaps(monPanier);
}

/*message d'alerte si le panier est vide*/
function displayCanaps(monPanier) {
    //clear tous les articles HTML présent sur la page!!!!!!!!!!!
    if (monPanier == null || monPanier.length == 0) {
        alert ("Votre panier est vide. Veuillez choisir un ou plusieurs article(s)")
    }
    else {
        for (let i = 0; i < monPanier.length; i++) {
            fetch('http://localhost:3000/api/products/' + monPanier[i].id)/*appel de l'api*/
            .then((reponse) => reponse.json())
            .then((data) => {
                /*création de la balise article dans la section*/
                let articleProduit = document.createElement("article");
                document.querySelector("#cart__items").appendChild(articleProduit);
                console.log ("article", articleProduit);
                articleProduit.className = "cart__item";
                articleProduit.dataset.id = monPanier[i].id;
                articleProduit.dataset.color = monPanier[i].color;
                console.log ("article", articleProduit);

                /*insertion DIV image produit*/
                let divImage = document.createElement("div");
                articleProduit.appendChild(divImage);
                divImage.classList.add("cart__item__img");
                console.log("divimage", divImage);

                /*insertion image canapé l.53 (cf.cart.html)*/
                let photoCanape = document.createElement("img");
                divImage.appendChild(photoCanape);
                photoCanape.src = data.imageUrl;
                photoCanape.alt = "Photographie d'un canapé";
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
                nomDuProduit.innerText = data.name;
                console.log("nom", nomDuProduit);
                
                /* insertion de la couleur (balise p, l.58 cart.html)*/
                let couleurDuProduit = document.createElement("p");
                cartItemContentDescription.appendChild(couleurDuProduit);
                couleurDuProduit.innerText = monPanier[i].color;
                console.log("coloro", couleurDuProduit);

                /*insertion de la balise p "prix", l.59 cart.html*/
                let prixDuProduit = document.createElement("p");
                cartItemContentDescription.appendChild(prixDuProduit);
                prixDuProduit.innerText = data.price * monPanier[i].quantity;
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
                let input = document.createElement("input");
                cartItemContentSettingsQuantity.appendChild(input);
                input.classList.add("itemQuantity");
                input.name="itemQuantity";
                input.type= "number";
                input.min="1";
                input.max="100";
                input.value= monPanier[i].quantity;
                input.onchange = function() {
                    updateQuantity(input.value, data.id, monPanier[i].color);      
                }  

                    /* pas compris les valeurs de updateQuantity*/

                /*insertion de la balise div l.66 à l;68 cart.html*/
                let cartItemContentSettingsDelete = document.createElement("div");
                cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
                cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");

                /* insertion de la balise p "supprimer", l.67*/
                let supprimer = document.createElement("p")
                cartItemContentSettingsDelete.appendChild(supprimer);
                supprimer.classList.add("deleteItem");
                supprimer.innerText ="Supprimer";
                supprimer.onclick = function() {
                    removeFromCart(monPanier[i].color, monPanier[i].id);      
                }  
            });
        }
    }
}

function removeFromCart(color, id) {
    console.log('je supprime larticle');   
    let monPanier = JSON.parse(localStorage.getItem("monPanier")); 
     /*boucle pour suprimer le(s) article(s*/
    for (let i = 0; i < monPanier.length; i++) {      
        if (monPanier[i].id === id && monPanier[i].color == color) {
            monPanier.splice(i, 1);
            console.log("no", monPanier);
        }
    }
    localStorage.setItem("monPanier", JSON.stringify(monPanier));
    //reprendre le panierLS, et l'afficher dans la page html
    displayCanaps(monPanier);
} 

function updateQuantity(newQuantity, idKanap, colorKanap) {
    console.log('je change la quantite'); 
    let monPanier = JSON.parse(localStorage.getItem("monPanier")); 
    console.log("monpanier", monPanier);
    
    for (let i = 0; i < monPanier.length; i++) {      
        if (monPanier[i].id === idKanap && monPanier[i].color == colorKanap) {
            monPanier[i].quantity = newQuantity;
            console.log("monPanier", monPanier); 
        }
    }
    localStorage.setItem("monPanier", JSON.stringify(monPanier));
    //petite erreurà corriger avec Julien
    //parcourir mon panier pour trouver le bon canapé
    //une fois que j'ai trouvé le bon canapé, je modifie la quantité
    //une fois que c'est fait, remettre notre panier mis a jour dans le local storage
};

function validate() {
    let regexPrenom = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    
    let firstName = document.getElementById("firstName");

    if (regexPrenom.test(firstName.value) === false) {
        alert ("Veuillez saisir un prénom valide")
        console.log("nom", firstName);
    }
};
/* REGEX du formulaire*/

let regexNom =  /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
/*regex pour le champ adresse
pb: 1:est possible numéro (ou pas) ex: 11 rue toto /ou lieu-dit tintin
puis,2: chaine de caratères, espaces possible, tiret etc...
puis 3:code postal 6 chiffres obligatoire */


/* regex pour le champ ville (identique à regex nom*/
let regexVille = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
/* regex pour le champ email*/
let regexEmail =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


