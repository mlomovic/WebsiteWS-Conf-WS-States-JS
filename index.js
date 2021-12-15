const searchStringElement = document.querySelector('.searchString');
const dgmPretragaElement = document.querySelector('.dgmPretraga');
const prikazElement = document.querySelector('.prikaz');
const prikazOdabranihElement = document.querySelector('.prikazOdabranih');
const levoElement = document.querySelector('.levo');
const desnoElement = document.querySelector('.desno');
const stranaElement = document.querySelector('.strana');


let film = [];
let odabraniFilmovi = [];
let strana = 1;



const setFilm = (list) => {
    film = [...list];
}


const setOdabraniFilmovi = (list) => {
    odabraniFilmovi = [...list];
}


const setStrana = (br) => {
    strana = br;

}


dgmPretragaElement.addEventListener('click', () => {

    dohvati();


});

 // Fetch your free api key from http://www.omdbapi.com/

const dohvati = () => {
    stranaElement.value = strana;
    fetch(`http://www.omdbapi.com/?apikey=[YourApiKey]&s=${searchStringElement.value}&page=${strana}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.Search);
            setFilm(data.Search);
            render();

        })
        .catch(err => console.log(err));
}


const render = () => {
    prikazElement.innerHTML = '';

    film.forEach((element, idx) => {
        prikazElement.innerHTML += `            
    <div class="col">
        <div class="card" style="width: 18rem;">
            <img src="${element.Poster}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.Title}</h5>
                <p class="card-text">Tip:${element.Type} Godina:${element.Year}</p>
                <a class="btn btn-primary" onClick="dodaj(${idx})">Dodaj u korpu</a>
            </div>
        </div>           
    </div>              
    `;
    });
}


const dodaj = (idx) => {
    setOdabraniFilmovi([...odabraniFilmovi, film[idx]]);
    console.log(odabraniFilmovi);
    renderOdabranih();
}


const renderOdabranih = () => {
    prikazOdabranihElement.innerHTML = '';

    odabraniFilmovi.forEach((element, idx) => {
        prikazOdabranihElement.innerHTML += `            
    <div class="col">
        <div class="card" style="width: 18rem;">
            <img src="${element.Poster}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.Title}</h5>
                <p class="card-text">Tip:${element.Type} Godina:${element.Year}</p>
                <a class="btn btn-primary" onClick="brisanje(${idx})">Obrisi</a>
            </div>
        </div>           
    </div>              
    `;
    });
}

const brisanje = (idx) => {
    let temp = [...odabraniFilmovi];
    temp.splice(idx, 1);
    setOdabraniFilmovi(temp);
    renderOdabranih();
}


levoElement.addEventListener('click', () => {
    strana <= 1 ? setStrana(1) : setStrana(strana - 1);
    setFilm([]);
    dohvati();
    render();

});


desnoElement.addEventListener('click', () => {
    setStrana(strana + 1);
    setFilm([]);
    dohvati();
    render();

});