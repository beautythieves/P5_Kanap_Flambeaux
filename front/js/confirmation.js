principale();

function principale() {
    ChargementIdCommande();
}

function ChargementIdCommande() {
    let searchParams = new URLSearchParams(window.location.search);
    let UrlCommandeId = new URL(location.href).searchParams.get("orderId");
    let numeroCommande = document.querySelector("#orderId");
    orderId.textContent = UrlCommandeId;
}









