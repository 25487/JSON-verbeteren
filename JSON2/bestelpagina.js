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


    }
    bestelling.forEach( item => {
      this.items.push(item);
    })
    return bestelling;
  },

  verwijderItem: function(ean) {
       this.items.forEach((item, index) => {
           if (item.ean == ean) {
               this.items.splice(index, 1);
               ean = 4;
           }
       })
       localStorage.setItem('besteldeBoeken', JSON.stringify(this.items));
       document.querySelector('.winkelwagen__aantal').innerHTML = this.items.length;
       if (this.items.length > 0) {
           document.querySelector('.winkelwagen__aantal').innerHTML = this.items.length;
       } else {
           document.querySelector('.winkelwagen__aantal').innerHTML = "";
       }
       this.uitvoeren();

  },
  totaalPrijs: function() {
      let totaal = 0;
      this.items.forEach( boek => {
          totaal += boek.prijs;
      });
      return totaal;
  },

  uitvoeren: function() {
    //Uitvoer leeg maken
    document.getElementById('bestelling').innerHTML = "";

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
        verwijder.addEventListener('click', () => {
                this.verwijderItem(boek.ean);
            });

        sectie.appendChild(afbeelding);
        sectie.appendChild(titel);
        sectie.appendChild(prijs);
        sectie.appendChild(verwijder);
        document.getElementById('bestelling').appendChild(sectie);

    });
      let sectie = document.createElement('sectie');
      sectie.className = 'besteldBoek';

      let totaalTekst = document.createElement('div');
       totaalTekst.className = 'besteldBoek__totaal-tekst';
       totaalTekst.innerHTML = 'Totaal: ';

       let totaalPrijs = document.createElement('div');
        totaalPrijs.className = 'besteldBoek__totaal-prijs';
        totaalPrijs.textContent = this.totaalPrijs().toLocaleString('nl-NL', { currency: 'EUR', style: 'currency' });

        sectie.appendChild(totaalTekst);
        sectie.appendChild(totaalPrijs);
        document.getElementById('bestelling').appendChild(sectie);

    if (this.items.length > 0) {
        document.querySelector('.winkelwagen__aantal').innerHTML = this.items.length;
    } else {
        document.querySelector('.winkelwagen__aantal').innerHTML = '';
    }

  }

}
winkelwagen.haalItemsOp();
winkelwagen.uitvoeren();
