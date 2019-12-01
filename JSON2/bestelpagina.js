

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


const keerTekstOn = (string) => {
    if(string.indexOf(',') != -1) {
        let array = string.split(',');
        string = array[1] + ' ' + array[0];
    }
    return string;
}
//voor de winkelwagen
let winkelwagen = {
  items: [],

  haalItemsOp: function() {
     let bestelling;
    if ( localStorage.getItem('besteldeBoeken') == null ) {
      bestelling = [];
    } else {
      bestelling = JSON.parse(localStorage.getItem('besteldeBoeken'));
      document.querySelector('.winkelwagen__aantal').innerHTML = bestelling.length;

    }
    bestelling.forEach( item => {
      this.items.push(item);
    })
    return bestelling;
  },


  uitvoeren: function() {
    //Uitvoer leeg maken
    document.getElementById("boeken").innerHTML = "";

    this.items.forEach(boek => {
        let sectie = document.createElement('section');
        sectie.className = 'BesteldBoek';


        //maak cover
        let afbeelding = document.createElement('img');
        afbeelding.className = 'BesteldBoek__cover';
        afbeelding.setAttribute("src", boek.cover);
        afbeelding.setAttribute("alt", keerTekstOn(boek.titel));

        //title opmaak
        let titel = document.createElement('h3');
        titel.className = 'BesteldBoek__titel';
        titel.textContent = keerTekstOn(boek.titel);


        // de prijs
        let prijs = document.createElement('div');
        prijs.className = 'BesteldBoek__prijs';
        prijs.textContent = boek.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: "currency"});


        //verwijder
        let verwijder = document.createElement('div');
        verwijder.className = "besteldBoek__verwijder";


        sectie.appendChild(afbeelding);
        sectie.appendChild(titel);
        sectie.appendChild(prijs);
        sectie.appendChild(verwijder);
        document.getElementById("boeken").appendChild(sectie);
    });

  }

}
winkelwagen.haalItemsOp();
winkelwagen.uitvoeren();
