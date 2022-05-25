principale();

function principale() {
    ChargementIdCommande();
}

function ChargementIdCommande() {
    console.log (window.location);
    let searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);
    let UrlCommandeId = new URL(location.href).searchParams.get("orderId");
    console.log ("order", UrlCommandeId);
    let numeroCommande = document.querySelector("#orderId");
    orderId.textContent = UrlCommandeId;
}









