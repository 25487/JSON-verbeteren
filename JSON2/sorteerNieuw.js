
let xmlhttp = new XMLHttpRequest();

const giveMonthNumber = (month) => {
    let number;
    switch(month){
        case "januari":     number = 0; break;
        case "februari":    number = 1; break;
        case "maart":       number = 2; break;
        case "april":       number = 3; break;
        case "mei":         number = 4; break;
        case "juni":        number = 5; break;
        case "juli":        number = 6; break;
        case "augustus":    number = 7; break;
        case "september":   number = 8; break;
        case "oktober":     number = 9; break;
        case "november":    number = 10; break;
        case "december":    number = 11; break;

        default: number = 0;
    }
    return number;
}

const makeValidDate = (monthYear) => {
    let myArray = monthYear.split(" ");
    let date = new Date(myArray[1], giveMonthNumber(myArray[0]));
    return date;
}
}



//sorteer de boeken functies sorteren() + uitvoeren()
let sortBookObjects = {
    data: "",
    unique: "titelUpper",
    oplopend: 1,
    addJSDate: function () {
        this.data.forEach((item) => {
            item.JSDate = makeValidDate(item.uitgave);
        });
    },
    //Data sorteren
    sorteren: function(){
        this.data.sort( (a,b) => a[this.unique] > b[this.unique] ? 1*this.oplopend :  -1*this.oplopend);
        this.uitvoeren(this.data);
    },
    //Verwerking van tabel
    uitvoeren: function(data){
        //Uitvoer leeg maken
        document.getElementById("boeken").innerHTML = "";

        data.forEach(boek => {
            let sectie = document.createElement('section');
            sectie.className = 'boekSelectie';

            //De grid elementen
            let main = document.createElement('main');
            main.className = "boekSelectie__main";

            //maak cover
            let afbeelding = document.createElement("img");
            afbeelding.className = "boekSelectie__cover";
            afbeelding.setAttribute("src", boek.cover);
            afbeelding.setAttribute("alt", keerTekstOn(boek.titel));

            //maak title
            let titel = document.createElement('h3');
            titel.className = "boekSelectie__titel";
            titel.textContent = keerTekstOn(boek.titel);

            //Acteur
            let auteurs = document.createElement('p');
            auteurs.className = 'boekSelectie__auteurs';
            //voor en achter naam omdraaien
            boek.auteur[0] = keerTekstOn(boek.auteur[0]);
            auteurs.textContent = makeSummary(boek.auteur);

            //overige informatie
            let overig = document.createElement('p');
        sortBookObjects.oplopend = parseInt(e.target.value);
        sortBookObjects.sorteren();
    })
