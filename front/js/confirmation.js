principale();

function principale() {
    ChargementIdCommande();
}

function ChargementIdCommande() {
    
    let UrlCommandeId = new URL(location.href).searchParams.get("orderId");
    let numeroCommande = document.querySelector("#orderId");
    numeroCommande.innerText = UrlCommandeId;
}









