main();

function main() {
    maFonction();
}
function maFonction() {
    let getId = window.location.search.substring(1);
    let IdUrl = getId.split("=");
    let ID= IdUrl[1];
    console.log ("id", ID);
    let numeroCommande = document.querySelector("#orderId");
    orderId.textContent = ID;
}









