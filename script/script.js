"use strict";
document.addEventListener('DOMContentLoaded', () => {
// Date
    const time = document.querySelector('.momentum__date-time');
    const date = document.querySelector('.momentum__date-date');
    const greetings = document.querySelector('.momentum__date-greetings');
    const hourSpan = document.querySelectorAll('.time_hour');
    const minSpan = document.querySelectorAll('.time_min');
    const secSpan = document.querySelectorAll('.time_sec');
    const spanPM = document.createElement('span');
    const spanAM = document.createElement('span');
    spanPM.innerText = 'PM';
    spanAM.innerText = 'AM';
    if ((new Date()).toTimeString().substring(0, 2) >= 1 && (new Date()).toTimeString().substring(0, 2) <= 12) {
        time.append(spanAM);
    } else if ((new Date()).toTimeString().substring(0, 2) >= 13 || (new Date()).toTimeString().substring(0, 2) === '00') {
        time.append(spanPM);
    }
    setInterval(() => {
        const date = new Date();
        const currentHours = date.toTimeString().substring(0, 2);
        const currentMin = date.toTimeString().substring(3, 5);
        const currentSec = date.toTimeString().substring(6, 8);
        if (currentHours >= 1 && currentHours <= 12) {
            hourSpan[0].innerHTML = currentHours[0];
            hourSpan[1].innerHTML = currentHours[1];
        } else if (currentHours >= 13 && currentHours <= 21) {
            hourSpan[0].innerHTML = '0';
            hourSpan[1].innerHTML = currentHours - 12;
        } else if (currentHours >= 23) {
            hourSpan[0].innerHTML = '1';
            hourSpan[1].innerHTML = (currentHours - 12).toString()[1];
        } else if (currentHours === '00') {
            hourSpan[0].innerHTML = '1';
            hourSpan[1].innerHTML = (+currentHours + 12).toString()[1];
        }
        minSpan[0].innerHTML = currentMin[0];
        minSpan[1].innerHTML = currentMin[1];
        secSpan[0].innerHTML = currentSec[0];
        secSpan[1].innerHTML = currentSec[1];

    }, 1000);
    const dateNow = new Date();
    let currentWeekday = dateNow.getDay();
    let currentDay = dateNow.getDate();
    let currentMonth = dateNow.getMonth();
    let currentTimeGreetings = +dateNow.toTimeString().substring(0, 2);

    if (currentTimeGreetings >= 0 && currentTimeGreetings <= 5) {
        greetings.innerText += ' Night,';
    } else if (currentTimeGreetings >= 6 && currentTimeGreetings <= 11) {
        greetings.innerText += ' Morning,';
    } else if (currentTimeGreetings >= 12 && currentTimeGreetings <= 17) {
        greetings.innerText += ' Afternoon,';
    } else if (currentTimeGreetings >= 18 && currentTimeGreetings <= 23) {
        greetings.innerText += ' Evening,';
    }

    switch (currentWeekday) {
        case 1:
            currentWeekday = 'Monday';
            break;
        case 2:
            currentWeekday = 'Tuesday';
            break;
        case 3:
            currentWeekday = 'Wednesday';
            break;
        case 4:
            currentWeekday = 'Thursday';
            break;
        case 5:
            currentWeekday = 'Friday';
            break;
        case 6:
            currentWeekday = 'Saturday';
            break;
        case 0:
            currentWeekday = 'Sunday';
            break;
    }
    switch (currentDay) {
        case 1:
        case 21:
        case 31:
            currentDay += 'st';
            break;
        case 2:
        case 22:
            currentDay += 'nd';
            break;
        case 3:
        case 23:
            currentDay += 'rd';
            break;
        case 8:
        case 28:
            currentDay += 'ht'
            break;
        default:
            currentDay += 'th';
            break;
    }
    switch (currentMonth) {
        case 0:
            currentMonth = 'January';
            break;
        case 1:
            currentMonth = 'February';
            break;
        case 2:
            currentMonth = 'March';
            break;
        case 3:
            currentMonth = 'April';
            break;
        case 4:
            currentMonth = 'May';
            break;
        case 5:
            currentMonth = 'June';
            break;
        case 6:
            currentMonth = 'July';
            break;
        case 7:
            currentMonth = 'August';
            break;
        case 8:
            currentMonth = 'September';
            break;
        case 9:
            currentMonth = 'October';
            break;
        case 10:
            currentMonth = 'November';
            break;
        case 11:
            currentMonth = 'December';
            break;
    }
    date.innerText = `${currentWeekday}, ${currentDay} of ${currentMonth}`;


    // Localstorage

    const spans = document.querySelectorAll('.momentum__date-span');
    const nameTitle = document.querySelector('[data-name]');
    const focusTitle = document.querySelector('[data-focus]');

    spans.forEach((item, i) => {
        item.addEventListener('keydown', (e) => {
            if (e.target.innerText.length >= 26 && i === 0) {
                if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 37 || e.keyCode === 39) {
                    return;
                }
                e.preventDefault();
            } else if (i === 1 && e.target.innerText.length >= 39) {
                if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 37 || e.keyCode === 39) {
                    return;
                }
                e.preventDefault();
            }
        });

        item.addEventListener('focus', (e) => {
            if (e.target.textContent === '[ENTER NAME]' || e.target.textContent === '[ENTER FOCUS]') {
                e.target.textContent = null;
            }
        })
        item.addEventListener('blur', (e) => {
            if (e.target.textContent === '' && i === 0) {
                e.target.textContent = '[ENTER NAME]';
            }
            if (e.target.textContent === '' && i === 1) {
                e.target.textContent = '[ENTER FOCUS]';
            }
        })
    });


    function init(localKey, title, name, backup) {
        getDataFromLocalStorage(localKey, title, name);
        saveToLocalStorage(backup, title.textContent);
    }

    function changeTitle(e, nameOfTitle, backup) {
        if (e.keyCode === 13) {
            saveToLocalStorage(nameOfTitle, e.target.textContent);
            saveToLocalStorage(backup, e.target.textContent);
            e.target.blur();
        }
        if (e.keyCode === 27) {
            e.target.textContent = localStorage.getItem(backup);
            e.target.blur();
        }
    }

    function saveToLocalStorage(name, value) {
        localStorage.setItem(name, value);
    }

    function getDataFromLocalStorage(localKey, title, name) {
        let data = localStorage.getItem(localKey);
        if (data) {
            title.textContent = data;
            return;
        }
        title.textContent = `[ENTER ${name}]`;
    }

    function saveToLocalStorageAfterBlur(e, nameTitle, backup) {
        saveToLocalStorage(backup, e.target.textContent)
        saveToLocalStorage(nameTitle, e.target.textContent)
    }


    window.addEventListener('load', init.bind(null, 'nameTitle', nameTitle, 'NAME', 'backupTitle'));
    window.addEventListener('load', init.bind(null, 'focusTitle', focusTitle, 'FOCUS', 'backupFocus'));
    nameTitle.addEventListener('keydown', e => changeTitle(e, 'nameTitle', 'backupTitle'));
    nameTitle.addEventListener('blur', e => saveToLocalStorageAfterBlur(e, 'nameTitle', 'backupTitle'));


    focusTitle.addEventListener('keydown', e => changeTitle(e, 'focusTitle', 'backupFocus'));
    focusTitle.addEventListener('blur', e => saveToLocalStorageAfterBlur(e, 'focusTitle', 'backupFocus'));

// API background image

    function backgroundImage(api, initFlag) {
        fetch(api,{ headers: { 'X-Api-Key': 'LIZy/oRMSBzGuJGljz/ePA==z2C33S6Tv8rW4nzN', 'Accept': 'image.jpg'}})
            .then(data => {
                data.text().then(d => {
                    const img = document.createElement('img');
                    img.src = `data:image/png;base64,${d}`;
                    img.addEventListener('load', () => {
                        if (initFlag) {
                            document.body.style.backgroundImage = `url("${img.src}")`;
                            document.body.style.backgroundRepeat = 'no-repeat';
                        } else if (!initFlag) {
                            const backgroundFrame = document.querySelector('.background');
                            document.body.style.backgroundColor = 'rgba(0,0,0,.1)';
                            document.body.style.backgroundImage = `url("${img.src}")`;
                            document.body.style.backgroundRepeat = 'no-repeat';
                            backgroundFrame.classList.add('opacityBG');
                            setTimeout(() => {
                                backgroundFrame.classList.remove('opacityBG');
                            }, 400)
                        }

                    })
            })
            })
            .catch(err => {
                console.log(err)
            })

    }

    backgroundImage('https://api.api-ninjas.com/v1/randomimage?category=nature&width=1920&height=1080', true);

    // Refresh

    const refreshBtn = document.querySelector('.refresh');

    refreshBtn.addEventListener('click', () => {
        refreshBtn.classList.add('rotateClass');
        setTimeout(() => {
            refreshBtn.classList.remove('rotateClass');
        }, 800)
    });

    refreshBtn.addEventListener('click', () => {
        backgroundImage('https://api.api-ninjas.com/v1/randomimage?category=nature&width=1920&height=1080', false);
    })

    // Weather API
    const CURRENT_API_WEATHER_KEY = '161d11578995b0dd48447acb004b6a41';
    const momentum = document.querySelector('.momentum__weather-block');
    const city = document.querySelector('.city');

    let status;

    function getWeather(value) {
        const dataObj= {};
        function changeIcon(value) {
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
        function renderHTML(obj) {
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
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=3&appid=${CURRENT_API_WEATHER_KEY}`)
            .then(response => {
                if (response.ok) return response.json();
                status = response.status;
            })
            .then(([geo]) => {
                fetch(`https://api.openweathermap.org/data/2.5/weather?lang=en&units=metric&lat=${geo.lat}&lon=${geo.lon}&appid=${CURRENT_API_WEATHER_KEY}`)
                    .then(data => {
                        if (data.ok) return data.json();
                    })
                    .then(({main, weather, wind}) => {
                        dataObj.temp = Math.round(main.temp);
                        dataObj.humidity = main.humidity;
                        dataObj.desc = weather[0].description;
                        dataObj.id = weather[0].id;
                        dataObj.wind = wind.speed;
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
        if (e.target.innerText === '[ENTER CITY]' || momentum.children[0].classList.value === 'momentum__weather-error') {
           e.target.innerText = '';
           saveToLocalStorage('city', '')
        }
    })
    city.addEventListener('blur', (e) => {
        if (e.target.innerText === '') {
            e.target.innerText = '[ENTER CITY]';
            saveToLocalStorage('city', '')
            momentum.innerText = '';
            return;
        }
        const value = city.innerText.trim();
        saveToLocalStorage('city',value);
        getWeather(value);
    })
    initWeather();

    // fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_hGAkXQlAtUCtm6IPwsosNiAbtbAhPeNQTpnTPAW5&currencies=EUR%2CUSD%2CRUB%2CBYN')
    //     .then(data => {
    //         return data.json();
    //     })
    //     .then(res => {
    //         console.log(res)
    //     })

    // Currencies

    const select = document.querySelectorAll('.select');
    const selectLiFrom = select[0].querySelectorAll('.select ul li');
    const selectLiTo = select[1].querySelectorAll('.select ul li');
    const selectBtnFrom = select[0].querySelector('label button');
    const selectBtnTo = select[1].querySelector('label button');
    const currencyFrom = document.querySelectorAll('.fromCurrency');
    const currencyTo = document.querySelectorAll('.toCurrency');


    select.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        })
    })

    selectLiFrom.forEach(item => {
        item.addEventListener('click', () => {
            const text = item.textContent;
            item.classList.add('active');
            selectLiFrom.forEach(elem =>{
                if (item !== elem) {
                    elem.classList.remove('active');
                }
            })
            selectBtnFrom.innerText = text;
            selectBtnFrom.style.cssText = `background-image: url('assets/img/${text}.png');
                                        background-size: contain;
                                        background-repeat: no-repeat;
                                        background-position: 55% 50%;`;
            currencyFrom.forEach(item => {
                item.textContent = text;
            });
        })
    })
    selectLiTo.forEach(item => {
        item.addEventListener('click', () => {
            const text = item.textContent;
            item.classList.add('active');
            selectLiTo.forEach(elem =>{
                if (item !== elem) {
                    elem.classList.remove('active');
                }
            })
            selectBtnTo.innerText = text;
            console.log(text)
            selectBtnTo.style.cssText = `background-image: url('assets/img/${text}.png');
                                        background-size: contain;
                                        background-repeat: no-repeat;
                                        background-position: 55% 50%;`;
            currencyTo.forEach(item => {
                item.textContent = text;
            })
        })
    })
})