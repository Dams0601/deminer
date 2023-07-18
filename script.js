function verif(sousListe, listeFinale){
    const estPresente = listeFinale.some(liste => {
        return liste.length === sousListe.length && liste.every((element, index) => {
        return element === sousListe[index];
        });
    });
    return estPresente;
}

// Générer les positions des bombes
let listeFinale = [];
let cmp = 0;
while(cmp!=40){
    let num1 = Math.floor(Math.random() * (18));
    let num2 = Math.floor(Math.random() * (18));
    let res = verif([num1, num2], listeFinale);
    
    while (res){
        num1 = Math.floor(Math.random() * (10));
        num2 = Math.floor(Math.random() * (10));
        res = verif([num1, num2], listeFinale);
    }
    listeFinale.push([num1, num2]);
    cmp+=1;

}


// Initialisation des cases
for (let i = 0; i<18; i++){
    let ligne = document.createElement('div');
    ligne.classList.add('ligne');
    document.getElementById("grille").appendChild(ligne);
    for (let j = 0; j<18; j++){
        let colonne = document.createElement('div');
        colonne.classList.add('colonne');
        let span = document.createElement('span');
        span.textContent = '10';
        span.classList.add("invisible");
        colonne.appendChild(span);
        ligne.appendChild(colonne);
        if ((i+j)%2==0){
            colonne.classList.add('vertClair');
        }
        else{
            colonne.classList.add('vertFonce');
        }
    }
}

// Placer les bombes
let lignes = document.getElementsByClassName("ligne");
for (let i = 0; i<lignes.length ; i++){
    for (let j = 0; j<lignes.length ; j++){
        if (verif([i, j], listeFinale)){
            lignes[i].childNodes[j].childNodes[0].textContent = "💣";
            //lignes[i].childNodes[j].classList.add('bombe'); // A enlever
        }
        else {
            lignes[i].childNodes[j].childNodes[0].textContent = compteBombe(i, j);
            if (compteBombe(i, j)==1){
                lignes[i].childNodes[j].childNodes[0].style.color="blue";
            }
            else if (compteBombe(i, j)==2){
                lignes[i].childNodes[j].childNodes[0].style.color="green";
            }
            else {
                lignes[i].childNodes[j].childNodes[0].style.color="red";
            }
        }
    }
}


// Gère le click sur une case
const divs = document.querySelectorAll(".colonne");

for (const div of divs) {
  div.addEventListener("click", function() {
    if (document.getElementById('drapeau').classList.contains('red') && !this.classList.contains('decouvert')) {
        this.classList.toggle("pointer");
    } 
    else if (!this.classList.contains('pointer')){
        this.classList.add("decouvert");
        let cases = document.getElementsByClassName('colonne');
        let decouvertentier = document.getElementsByClassName('decouvert');
        if (cases.length-40 == decouvertentier.length || this.childNodes[0].innerHTML == "💣"){
            clearInterval(timer);
            let timeFinal = document.getElementById('chrono').innerHTML;
            if (cases.length-40 == decouvertentier.length && this.childNodes[0].innerHTML != "💣"){
                document.getElementById("time").textContent = timeFinal+' sec';
            }
            setTimeout(function(){
                document.getElementById("center").style.display = "none";
                document.getElementById("score").style.display = "flex";
            }, 2000);
        }


        this.childNodes[0].classList.remove("invisible");
        this.childNodes[0].classList.add("visible");
        if (this.childNodes[0].innerHTML == "💣"){
            lignes = document.getElementsByClassName("ligne");
            for (const element of listeFinale){
                lignes[element[0]].childNodes[element[1]].classList.add("decouvert");
                lignes[element[0]].childNodes[element[1]].childNodes[0].classList.remove("invisible");
                lignes[element[0]].childNodes[element[1]].childNodes[0].classList.add("visible");
        }
        }
        else if (this.childNodes[0].innerHTML == ""){
            repeteDestruction(this);
        }
        
    }
    
});
}


// Création de la fonction compteBombe qui va compter le nombre de bombes autour d'une case
function compteBombe(i, j){
    let compteur = 0;
    if (i==0){
        if (j==0){
            if (verif([i+1, j], listeFinale)){
                compteur +=1;
            }
            if (verif([i+1, j+1], listeFinale)){
                compteur +=1;
            }
            if (verif([i, j+1], listeFinale)){
                compteur +=1;
            }
        }
        else if (j==17){
            if (verif([i+1, j], listeFinale)){
                compteur +=1;
            }
            if (verif([i+1, j-1], listeFinale)){
                compteur +=1;
            }
            if (verif([i, j-1], listeFinale)){
                compteur +=1;
            }
        }
        else {
            if (verif([i, j-1], listeFinale)){
                compteur +=1;
            }
            if (verif([i+1, j-1], listeFinale)){
                compteur +=1;
            }
            if (verif([i+1, j], listeFinale)){
                compteur +=1;
            }
            if (verif([i+1, j+1], listeFinale)){
                compteur +=1;
            }
            if (verif([i, j+1], listeFinale)){
                compteur +=1;
            }
        }
    }
    else if (j==0){
        if (i==17){
            if (verif([i-1, j], listeFinale)){
                compteur +=1;
            }
            if (verif([i-1, j+1], listeFinale)){
                compteur +=1;
            }
            if (verif([i, j+1], listeFinale)){
                compteur +=1;
            }
        }
        else {
            if (verif([i-1, j], listeFinale)){
                compteur +=1;
            }
            if (verif([i-1, j+1], listeFinale)){
                compteur +=1;
            }
            if (verif([i, j+1], listeFinale)){
                compteur +=1;
            }
            if (verif([i+1, j], listeFinale)){
                compteur +=1;
            }
            if (verif([i+1, j+1], listeFinale)){
                compteur +=1;
            }
        }
    }
    else if (i==17){
        if(j==17){
            if (verif([i-1, j-1], listeFinale)){
                compteur +=1;
            }
            if (verif([i, j-1], listeFinale)){
                compteur +=1;
            }
            if (verif([i-1, j], listeFinale)){
                compteur +=1;
            }
        }
        else{
            if (verif([i, j-1], listeFinale)){
                compteur +=1;
            }
            if (verif([i-1, j-1], listeFinale)){
                compteur +=1;
            }
            if (verif([i-1, j], listeFinale)){
                compteur +=1;
            }
            if (verif([i-1, j+1], listeFinale)){
                compteur +=1;
            }
            if (verif([i, j+1], listeFinale)){
                compteur +=1;
            }
        }
    }
    else if (j==17){
        if (verif([i, j-1], listeFinale)){
            compteur +=1;
        }
        if (verif([i-1, j-1], listeFinale)){
            compteur +=1;
        }
        if (verif([i-1, j], listeFinale)){
            compteur +=1;
        }
        if (verif([i+1, j-1], listeFinale)){
            compteur +=1;
        }
        if (verif([i+1, j], listeFinale)){
            compteur +=1;
        }
    }
    else {
        if (verif([i-1, j-1], listeFinale)){
            compteur +=1;
        }
        if (verif([i, j-1], listeFinale)){
            compteur +=1;
        }
        if (verif([i-1, j], listeFinale)){
            compteur +=1;
        }
        if (verif([i+1, j+1], listeFinale)){
            compteur +=1;
        }
        if (verif([i, j+1], listeFinale)){
            compteur +=1;
        }
        if (verif([i+1, j], listeFinale)){
            compteur +=1;
        }
        if (verif([i-1, j+1], listeFinale)){
            compteur +=1;
        }
        if (verif([i+1, j-1], listeFinale)){
            compteur +=1;
        }
    }
    if (compteur==0){
        return "";
    }
    return compteur;
}

function decouvre(i, j){
    if (i==0){
        if (j==0){
            decouvreUn([i+1, j]); 
            decouvreUn([i+1, j+1]);
            decouvreUn([i, j+1]);
        }
        else if (j==17){
            decouvreUn([i+1, j]); 
            decouvreUn([i+1, j-1]); 
            decouvreUn([i, j-1]);
        }
        else {
            decouvreUn([i, j-1]); 
            decouvreUn([i+1, j-1]); 
            decouvreUn([i+1, j]); 
            decouvreUn([i+1, j+1]); 
            decouvreUn([i, j+1]);
        }
    }
    else if (j==0){
        if (i==17){
            decouvreUn([i-1, j]); 
            decouvreUn([i-1, j+1]); 
            decouvreUn([i, j+1]);
        }
        else {
            decouvreUn([i-1, j]); 
            decouvreUn([i-1, j+1]); 
            decouvreUn([i, j+1]); 
            decouvreUn([i+1, j]); 
            decouvreUn([i+1, j+1]); 
        }
    }
    else if (i==17){
        if(j==17){
            decouvreUn([i-1, j-1]); 
            decouvreUn([i, j-1]); 
            decouvreUn([i-1, j]);
        }
        else{
            decouvreUn([i, j-1]); 
            decouvreUn([i-1, j-1]); 
            decouvreUn([i-1, j]); 
            decouvreUn([i-1, j+1]); 
            decouvreUn([i, j+1]);
        }
    }
    else if (j==17){
        decouvreUn([i, j-1]); 
        decouvreUn([i-1, j-1]); 
        decouvreUn([i-1, j]); 
        decouvreUn([i+1, j-1]); 
        decouvreUn([i+1, j]);
    }
    else {
        decouvreUn([i-1, j+1]);
        decouvreUn([i+1, j-1]);
        decouvreUn([i-1, j-1]);
        decouvreUn([i, j+1]);
        decouvreUn([i, j-1]);
        decouvreUn([i+1, j]);
        decouvreUn([i-1, j]);
        decouvreUn([i+1, j+1]);
    }
}


function decouvreUn(list){
    lignes = document.getElementsByClassName("ligne");
    lignes[list[0]].childNodes[list[1]].classList.add("decouvert");
    lignes[list[0]].childNodes[list[1]].childNodes[0].classList.remove("invisible");
    lignes[list[0]].childNodes[list[1]].childNodes[0].classList.add("visible");
}

function findRang(ele){
    let rang = 0;
    for (let i=0; i<divs.length; i++){
        if (ele == divs[i]){
            rang = i;
        }
    }
    return rang;
}

function repeteDestruction(ele){
    let decouvertsClique = [ele];
    let rang = findRang(ele);
    
    decouvre(Math.floor(rang/18), rang%18);
    let decouverts = document.querySelectorAll(".decouvert");
    let decouvertVide = diffList(findVide(decouverts), decouvertsClique);

    while (decouvertVide.length > 0){
        rang = findRang(decouvertVide[0]);
        decouvertsClique.push(decouvertVide[0]);
        decouvre(Math.floor(rang/18), rang%18);

        decouverts = document.querySelectorAll(".decouvert");
        decouvertVide = diffList(findVide(decouverts), decouvertsClique);
    }
}

function findVide(list){
    let listFinal = []
    for (let i = 0; i<list.length; i++){
        if (list[i].childNodes[0].innerHTML == ""){
            listFinal.push(list[i]);
        }
    }
    return listFinal;
}

function diffList(list1, list2){
    let newList = []
    for (let i = 0; i<list1.length ; i++){
        if (list2.includes(list1[i])){
            console.log("commun");
        }
        else {
            newList.push(list1[i]);
        }
    }
    console.log(list1);
    console.log(list2);
    console.log(newList);
    return newList;
}

let time = 0;
let timer = setInterval(function(){
    console.log(time)
    document.getElementById("chrono").textContent = time;
    time+=1;
}, 1000);

document.getElementById("retry").addEventListener("click", function() {
    location.reload();
})

document.getElementById("drapeau").addEventListener("click", function(){
    this.classList.toggle("red");
})

let compteurDrapeau = setInterval(function(){
    document.getElementById('restant').textContent = 40-document.getElementsByClassName('pointer').length;
}, 100);