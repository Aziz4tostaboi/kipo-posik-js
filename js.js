


const API_KEY = "e3d4222b-f20f-42ae-92fd-4935a860065c";
const API_URL_NEWS = "https://kinopoiskapiunofficial.tech/api/v1/media_posts?page=3";
// getMoviesNews(API_URL_NEWS)
async function getMoviesNews(url) {
    try {
        const resp = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
            },
        });
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        const respData = await resp.json();
        showNewMovies(respData); // Показываем полученные карточки
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function showNewMovies(data) {
    const items = data.items;
    const moviesContainer = document.getElementById("container-movie-news-card");
    moviesContainer.style.display="flex"
    // Очищаем контейнер перед добавлением новых карточек
    moviesContainer.innerHTML = "";

    // Создаем и добавляем карточки в контейнер
    items.forEach(movieItem => {
        const movieCard = createMovieCard(movieItem);
        moviesContainer.appendChild(movieCard);
    });
}
function createMovieCard(movieItem) {

    const movieCardD = document.createElement("div");
    movieCardD.classList.add("movie-card-news");
    const movieTopCard=document.getElementById(`container-movie-top-card`)
    const movieSearchCard=document.getElementById("movie-info-card")
    function movieSearchCardFun(){
        // movieSearchCard.style.display="none"
        movieTopCard.style.display="none"
    }
    const img = document.createElement("img");
    img.classList.add("img-news")
    img.src = movieItem.imageUrl;
    movieCardD.appendChild(img);

    const title = document.createElement("h1");
    title.textContent = movieItem.title;
    title.classList.add("title-news")
    movieCardD.appendChild(title);

    const text=document.createElement("span")
    text.textContent=`${movieItem.description}`
    text.classList.add("text-news")
    movieCardD.appendChild(text)

    const readMore = document.createElement("a");
    readMore.textContent = `Read More`
    readMore.href=`${movieItem.url}`
    movieCardD.appendChild(readMore);
    readMore.classList.add("read-more")
    movieSearchCardFun()
    return movieCardD;
}

const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

async function searchMovie() {
    const movieInput = document.getElementById("search-input").value;
    const url = `${API_URL_SEARCH}${encodeURIComponent(movieInput)}`;
    try {
        const resp = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
            },
        });

        const respData = await resp.json();
        displayMovieInfo(respData);
    } catch (error) {
        console.error("Ошибка при запросе к API");
    }
}

function displayMovieInfo(data,fun) {
    const movieResultDiv = document.getElementById("movie-info-card");
    const movieContainerInfo=document.getElementById('container-movie-news-card')
    const movieContainerTop=document.getElementById("container-movie-top-card")
    function movieContainerDisplayNone(){
        movieContainerInfo.style.display="none"
        movieContainerTop.style.display='none'
    }
    movieResultDiv.innerHTML = "";
    const inputValue=document.getElementById("search-input")
    if (data.films.length > 0) {
        const movie = data.films[0];
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");


        const movieCardImgBox=document.createElement("div")
        movieCardImgBox.classList.add("movie-card-info-img-box")

        const posterImg = document.createElement("img");
        posterImg.classList.add("movie-card-info-img-poster")
        posterImg.src = movie.posterUrl;
        posterImg.alt = movie.nameRu;



        const title = document.createElement("h2");
        title.classList.add("movie-card-info-title")
        title.textContent = movie.nameRu;

        const description = document.createElement("p");
        description.classList.add("movie-card-info-description")
        description.textContent = movie.description;

        const year = document.createElement("p");
        year.classList.add("movie-card-info-year")
        year.textContent = `Год: ${movie.year}`;

        const timeLength = document.createElement("p");
        timeLength.classList.add("movie-card-info-time-length")
        timeLength.textContent = `Продолжительность: ${movie.filmLength} мин.`;

        const rating=document.createElement("p")
        rating.classList.add("movie-card-info-rating")
        rating.textContent=`рейтинг ${movie.rating}`


        const titleEn=document.createElement("p")
        titleEn.classList.add("movie-card-info-title-en")
        titleEn.textContent=`nameEn -${movie.nameEn}`


        const genres=document.createElement("p")
        genres.textContent=` жанр-${movie.genres.map((el)=>`${el.genre} `)}`

        movieCardImgBox.appendChild(posterImg)
        movieCard.appendChild(title);
        movieCard.appendChild(description);
        movieCard.appendChild(year);
        movieCard.appendChild(timeLength);
        movieCard.appendChild(rating)
        movieCard.appendChild(titleEn)
        movieCard.appendChild(genres)
        movieResultDiv.appendChild(movieCardImgBox)
        movieResultDiv.appendChild(movieCard);
        inputValue.value=""
        movieContainerDisplayNone()
    } else {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Фильм не найден";
        movieResultDiv.appendChild(errorMessage);
    }
}
const API_URL_TOP_MOVIE=
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=2";

async  function getTopMovie(urlD){
    try{
        const resp=await  fetch(urlD,{
            headers:{
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
            }
        })
        const respData = await resp.json();
        ShowMovieTop(respData)
        console.log(respData)
    }catch (error){
        const errorMessge=document.createElement('p')
        const boxError=document.getElementById('article')
        errorMessge.textContent=`error Api${error}`
        boxError.appendChild(errorMessge)
    }
}


function ShowMovieTop(data){
    const films =data.films
    const containerTopMovie=document.getElementById("container-movie-top-card")
    containerTopMovie.style.display="flex"
    containerTopMovie.innerHTML=""

    films.forEach(movieItem=>{
        const movieCard=createDisplayMovieTop(movieItem)
        containerTopMovie.appendChild(movieCard)
    })
}
function createDisplayMovieTop(movieItem){
        const containerMovieNews=document.getElementById("container-movie-news-card")


        function closeMovieInfoCardAndContainerMovieNews(){
            containerMovieNews.style.display="none"
        }
        const movieTopCard=document.createElement("div")
        movieTopCard.classList.add("movie-top-card")

        const img=document.createElement("img")
        img.classList.add("movie-card-top-img")
        img.src=movieItem.posterUrl

        const title=document.createElement("h2")
        title.textContent=`${movieItem.nameRu}`

        movieTopCard.appendChild(img)
        movieTopCard.appendChild(title)


        closeMovieInfoCardAndContainerMovieNews()

        return movieTopCard
}
