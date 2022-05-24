main();

function main() {
    loadId();
}

function loadId() {
    console.log (window.location);
    let searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams);
    let orderIdUrl = new URL(location.href).searchParams.get("orderId");
    console.log ("order", orderIdUrl);
    let numeroCommande = document.querySelector("#orderId");
    orderId.textContent = orderIdUrl;;
}









