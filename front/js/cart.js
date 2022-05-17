main();

function main() {
    let monPanier = JSON.parse(localStorage.getItem("monPanier"));
    displayCanaps(monPanier);
    setFormValidation();
}

function displayCanaps(monPanier) {
    //clear tous les articles HTML présent sur la page!!!!!!!!!!!
    let suppressionArticles = document.querySelector("#cart__items");
    suppressionArticles.innerHTML = '';

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
                /*création de la balise article dans la section*/
                let articleProduit = document.createElement("article");
                document.querySelector("#cart__items").appendChild(articleProduit);
                articleProduit.className = "cart__item";
                articleProduit.dataset.id = monPanier[i].id;
                articleProduit.dataset.color = monPanier[i].color;

                /*insertion DIV image produit*/
                let divImage = document.createElement("div");
                articleProduit.appendChild(divImage);
                divImage.classList.add("cart__item__img");

                /*insertion image canapé l.53 (cf.cart.html)*/
                let photoCanape = document.createElement("img");
                divImage.appendChild(photoCanape);
                photoCanape.src = data.imageUrl;
                photoCanape.alt = "Photographie d'un canapé";

                /*insertion div l.55 à l.70(cf cart.html)*/
                let cartItemContent = document.createElement("div");
                articleProduit.appendChild(cartItemContent);
                cartItemContent.classList.add("cart__item__content");

                /*insertion div l.56 à l.60 (cf cart.html)*/
                let cartItemContentDescription = document.createElement("div");
                cartItemContent.appendChild(cartItemContentDescription);
                cartItemContentDescription.classList.add("cart__item__content__description");
                
                /*insertion h2 nom du produit(cf l.57 cart.html)*/
                let nomDuProduit = document.createElement("h2");
                cartItemContentDescription.appendChild(nomDuProduit);
                nomDuProduit.innerText = data.name;
                
                /* insertion de la couleur (balise p, l.58 cart.html)*/
                let couleurDuProduit = document.createElement("p");
                cartItemContentDescription.appendChild(couleurDuProduit);
                couleurDuProduit.innerText = monPanier[i].color;

                /*insertion de la balise p "prix", l.59 cart.html*/
                let prixDuProduit = document.createElement("p");
                cartItemContentDescription.appendChild(prixDuProduit);
                prixDuProduit.innerText = data.price * monPanier[i].quantity;

                /*insertion de la balise div l.61 à l.69 cart.html*/
                let cartItemContentSettings = document.createElement("div");
                cartItemContent.appendChild(cartItemContentSettings);
                cartItemContentSettings.classList.add("cart__item__content__settings");

                /*insertion de la balise div l.62 à l.65 cart.html*/
                let cartItemContentSettingsQuantity = document.createElement("div");
                cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
                cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");

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
                    updateQuantity(input.value, data._id, monPanier[i].color);      
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
    console.log('mouchard1'); 
    let monPanier = JSON.parse(localStorage.getItem("monPanier")); 
    console.log('mouchard2'); 
    for (let i = 0; i < monPanier.length; i++) {  
        console.log('bouclefor: mouchard1');
        console.log('ifr: mouchard1'); 
        if (monPanier[i].id === idKanap && monPanier[i].color == colorKanap) {
            console.log('ifr: mouchard1');  
            monPanier[i].quantity = newQuantity;
            console.log('ifr: mouchard2');
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
        /*console.log('on test le prenom', prenom, regexPrenom.test(prenom));
        if (regexPrenom.test(prenom) === false){
            alert ("Veuillez saisir un prénom");
        }
        if (regexNom.test(nom) === false){
            alert ("Veuillez saisir un nom");
        }
        if (regexAdresse.test(adresse) === false){
            alert ("Veuillez saisir une adresse valide");
        }
        if (regexVille.test(ville) === false){
            alert ("Veuillez saisir un nom de ville valide");
        }
        if (regexEmail.test(email) === false){
            alert ("Veuillez saisir une adresse email valide");*/
        //} else {
            /*Pour les routes POST, l’objet contact envoyé au serveur 
            doit contenir les champs firstName,lastName, address, city et email. 
            Le tableau des produits envoyé au back-end doit être un array de 
            strings product-ID. Les types de ces champs et leur présence
             doivent être validés avant l’envoi des données au serveur*/
            
            let monPanier = JSON.parse(localStorage.getItem("monPanier"));
            
            let products = [];
            for (let i = 0; i < monPanier.length; i++) {
                //pour chaque objet du panier, je met son id dans mon tableau products
                products.push(monPanier[i].id);
            }

            /*création objet contact*/
            let order = {
                contact : {
                  firstName : prenom,
                  lastName : document.getElementById("lastName").value,
                  address : document.getElementById("address").value,
                  city : document.getElementById("city").value,
                  email : document.getElementById("email").value
                },
                products: products,
            }
            console.log ("contact", order);
            fetch('http://localhost:3000/api/products/order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order),
                }).then((data) => {
                //le data doit contenir l'id de la commande
                console.log('voici la réponse de ma requete', data)
                //redirigera vers la page confirmation en passant l'id dans l'url
                }).catch((err) => {
                    console.log('error', err);
                });
        //}
    });
}

/* else= bouton commabder renvoi vers la page confirmation*/

