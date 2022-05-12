main();

function main() {
    let monPanier = JSON.parse(localStorage.getItem("monPanier"));
    displayCanaps(monPanier);
    setFormValidation();
}

function displayCanaps(monPanier) {
    //clear tous les articles HTML présent sur la page!!!!!!!!!!!
    let suppressionArticles = document.getElementsByClassName("cart__item");
    console.log(suppressionArticles);
    //tableaux d'éléments, queryselector all section puis vider*/
    suppressionArticles.remove;
    /*cidessus, marche pas*/
    /*message d'alerte si le panier est vide*/

    if (monPanier == null || monPanier.length == 0) {
        alert ("Votre panier est vide. Veuillez choisir un ou plusieurs article(s)")
    }
    else {
        let quantity = 0;
        let price = 0;
        for (let i = 0; i < monPanier.length; i++) {
            fetch('http://localhost:3000/api/products/' + monPanier[i].id)/*appel de l'api*/
            .then((reponse) => reponse.json())
            .then((data) => {                
                //J'ajoute le prix et la quantité
                quantity += monPanier[i].quantity;
                price += data.price;
                console.log('quantity', quantity)
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
        console.log(quantity, price);
        document.querySelector("#totalQuantity").innerText = quantity;
        document.querySelector("#totalPrice").innerText = price;    
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
    displayCanaps(monPanier);
}

function setFormValidation() {
    /*FORMULAIRE */
    /*déclaration des regex*/
    let regexPrenom = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    let regexNom =  /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    let regexAdresse = /[0-9,'a-zA-Zéèàêëï]/g;
    let regexVille = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    let regexEmail =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    /* récupération des données des saisies des champs du formulaire*/
    let form = document.querySelector(".cart__order__form").value;
    let prenom = document.getElementById("firstName").value;
    let nom = document.getElementById("lastName").value;
    let adresse = document.getElementById("address").value;
    let ville = document.getElementById("city").value;
    let email = document.getElementById("email").value;
    let boutonValidationCommande = document.getElementById("order");
    
    /* si au clic "commander", les champs sont remplis
    incorrectement, message d'erreur*/

    boutonValidationCommande.addEventListener("click", function() {
        if (regexPrenom.test(prenom) === false){
            alert ("Veuillez saisir un prénom");
        }
        if (regexNom.test(nom) == false){
            alert ("Veuillez saisir un nom");
        }
        if (regexAdresse.test(adresse) == false){
            alert ("Veuillez saisir une adresse valide");
        }
        if (regexEmail.test(email) == false){
            alert ("Veuillez saisir une adresse email valide");
        } else {
            fetch('', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: {firstname: ''},
            }).then((data) => {
                //le data doit contenir l'id de la commande
                console.log(data)
                //redirigera vers la page confirmation en passant l'id dans l'url
            });
        }
    });
}

/* else= bouton commabder renvoi vers la page confirmation*/

