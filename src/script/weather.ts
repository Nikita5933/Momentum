import {saveToLocalStorage} from "./date";
import {IChangeIcon, IWeather, IWeatherObj} from "./interfaces";

document.addEventListener('DOMContentLoaded', () => {
    const CURRENT_API_WEATHER_KEY = '161d11578995b0dd48447acb004b6a41';
    const momentum = <HTMLElement>document.querySelector('.momentum__weather-block');
    const city = <HTMLSpanElement>document.querySelector('.city');

    let status: number;

    function getWeather(value:string) {
        function changeIcon(value:IChangeIcon) {
            const div = document.createElement('div');
            div.classList.add('momentum__weather-pict');

            switch (value.id) {
                case 200:
                case 201:
                case 202:
                case 230:
                case 231:
                case 232:
                    div.style.backgroundPosition = "-70px 617px";
                    div.style.backgroundSize = "865%";
                    break;
                case 210:
                case 211:
                case 212:
                case 221:
                    div.style.backgroundPosition = "-275px 617px";
                    div.style.backgroundSize = "865%";
                    break;
                case 300:
                case 310:
                    div.style.backgroundPosition = "-70px 420px";
                    div.style.backgroundSize = "865%";
                    break;
                case 301:
                case 311:
                    div.style.backgroundPosition = "-407px 224px";
                    div.style.backgroundSize = "725%";
                    break;
                case 302:
                case 312:
                case 313:
                case 314:
                case 321:
                    div.style.backgroundPosition = "-231px 224px";
                    div.style.backgroundSize = "725%";
                    break;
                case 500:
                case 501:
                case 520:
                case 531:
                    div.style.backgroundPosition = "-580px 547px";
                    div.style.backgroundSize = "725%";
                    break;
                case 511:
                case 613:
                case 615:
                case 616:
                    div.style.backgroundPosition = "-484px 422px";
                    div.style.backgroundSize = "865%";
                    break;
                case 502:
                case 503:
                case 504:
                case 522:
                    div.style.backgroundPosition = "-690px 423px";
                    div.style.backgroundSize = "865%";
                    break;
                case 600:
                case 611:
                case 612:
                    div.style.backgroundPosition = "207px 439px";
                    div.style.backgroundSize = "865%";
                    break;
                case 601:
                case 602:
                case 620:
                case 621:
                case 622:
                    div.style.backgroundPosition = "-70px 246px";
                    div.style.backgroundSize = "865%";
                    break;
                case 701:
                case 711:
                case 721:
                case 731:
                case 741:
                case 751:
                case 762:
                    div.style.backgroundPosition = "408px 246px";
                    div.style.backgroundSize = "865%";
                    break;
                case 771:
                case 781:
                    div.style.backgroundPosition = "219px 246px";
                    div.style.backgroundSize = "865%";
                    break;
                case 800:
                    div.style.backgroundPosition = "390px 645px";
                    div.style.backgroundSize = "865%";
                    break;
                case 801:
                    div.style.backgroundPosition = "-231px 381px";
                    div.style.backgroundSize = "725%";
                    break;
                case 802:
                    div.style.backgroundPosition = "344px 381px";
                    div.style.backgroundSize = "725%";
                    break;
                case 803:
                    div.style.backgroundPosition = "-481px 636px";
                    div.style.backgroundSize = "865%";
                    break;
                case 804:
                    div.style.backgroundPosition = "508px 228px";
                    div.style.backgroundSize = "725%";
                    break;

            }
            momentum.append(div)
        }
        function renderHTML(obj:IWeatherObj) {
            const div = `
            <div class="momentum__weather-info">
            <div class="momentum__weather-temp"><span>${obj.temp}</span> C°</div>
            <div class="momentum__weather-description">Weather:<span> ${obj.desc}</span></div>
            <div class="momentum__weather-humidity">Humidity:<span> ${obj.humidity} %</span></div>
            <div class="momentum__weather-wind">Wind speed: <span>${obj.wind} m/s</span></div>
            </div>
            `;

            momentum.innerHTML = '';
            changeIcon(obj)
            momentum.insertAdjacentHTML('beforeend', div)
        }
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=3&appid=${CURRENT_API_WEATHER_KEY}`)
            .then(response => {
                if (response.ok) return response.json();
                status = response.status;
            })
            .then(([geo]) => {
                fetch(`https://api.openweathermap.org/data/2.5/weather?lang=en&units=metric&lat=${geo.lat}&lon=${geo.lon}&appid=${CURRENT_API_WEATHER_KEY}`)
                    .then(data => {
                        if (data.ok) return data.json();
                    })
                    .then(({main, weather, wind}:IWeather) => {
                        const dataObj:IWeatherObj = {
                            temp: Math.round(main.temp),
                            humidity: main.humidity,
                            desc: weather[0].description,
                            id: weather[0].id,
                            wind: wind.speed
                        };
                        return dataObj
                    })
                    .then((obj) => {
                        renderHTML(obj);
                    })
                    .catch(err => {
                        const error = `<div class="momentum__weather-error">Server error! Try later!</div>`;
                        momentum.innerText = '';
                        momentum.insertAdjacentHTML('beforeend', error);
                        console.log(err);
                    })
            })
            .catch(err => {
                let error = `<div class="momentum__weather-error">City data search error, please try to enter the city correctly!</div>`;
                if (status) {
                    error = `<div class="momentum__weather-error">Server error! Try later!</div>`;
                }
                momentum.innerText = '';
                momentum.insertAdjacentHTML('beforeend', error);
                console.log(err);
            })

    }
    function initWeather() {
        if (localStorage.getItem('city')) {
            getWeather(localStorage.getItem('city'));
            city.innerText = localStorage.getItem('city')
        }
    }
    city.addEventListener('keydown', e => {
        if (e.keyCode === 13 || e.keyCode === 27) {
            city.blur();
            const value = city.innerText.trim();
            saveToLocalStorage('city',value);
            getWeather(value);
        }
    })
    city.addEventListener('focus', (e)=> {
        const elem = e.target as HTMLElement;
        if (elem.innerText === '[ENTER CITY]' || momentum.children[0].classList.value === 'momentum__weather-error') {
            elem.innerText = '';
            saveToLocalStorage('city', '')
        }
    })
    city.addEventListener('blur', (e) => {
        const elem = e.target as HTMLElement;
        if (elem.innerText === '') {
            elem.innerText = '[ENTER CITY]';
            saveToLocalStorage('city', '')
            momentum.innerText = '';
            return;
        }
        const value = city.innerText.trim();
        saveToLocalStorage('city',value);
        getWeather(value);
    })
    initWeather();
})