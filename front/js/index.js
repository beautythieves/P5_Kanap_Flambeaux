//j'appelle l'api (en utilisant fetch) pour recevoir la liste de tous les canapés
// cette liste, la parcourir, et pour chacun des canapés, créer des éléments <a>, <div>, etc ..., y ajouter les bonnes infos
//ET on ajoute ces éléments au noeud HTML déja exisatnt section.items

//js how to use fetch to call api

var test = [
    { name: 'tpot', id:'64565465', colors: ['black, yellow'] },
    { name: 'yuyu', id:'213754654', colors: ['black, yellow'] },
    { name: 'sqdsqd', id:'56546546', colors: ['black, yellow'] }
]
console.log(test);

test.forEach((item, index) => {
    console.log('je regarde quel item de la liste :', item);
    console.log('il est a la position :', inde);
});