"use strict";
document.addEventListener('DOMContentLoaded', () =>{
// Date
    const time = document.querySelector('.wrapper__date-time');
    const date = document.querySelector('.wrapper__date-date');
    const greetings = document.querySelector('.wrapper__date-greetings');
    const hourSpan = document.querySelectorAll('.time_hour');
    const minSpan = document.querySelectorAll('.time_min');
    const secSpan = document.querySelectorAll('.time_sec');
    const spanPM = document.createElement('span');
    const spanAM = document.createElement('span');
    spanPM.innerText = 'PM';
    spanAM.innerText = 'AM';
    if ((new Date()).toTimeString().substring(0,2) >= 1 && (new Date()).toTimeString().substring(0,2) <= 12) {
        time.append(spanAM);
    } else if ((new Date()).toTimeString().substring(0,2) >= 13 || (new Date()).toTimeString().substring(0,2) === '00') {
        time.append(spanPM);
    }

    setInterval(()=> {
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
            hourSpan[1].innerHTML = (currentHours-12).toString()[1];
        } else if (currentHours == '00') {
            hourSpan[0].innerHTML = '1';
            hourSpan[1].innerHTML = (+currentHours + 12).toString()[1];
        }
        minSpan[0].innerHTML = currentMin[0];
        minSpan[1].innerHTML = currentMin[1];
        secSpan[0].innerHTML = currentSec[0];
        secSpan[1].innerHTML = currentSec[1];

    },1000);
    const dateNow = new Date();
    let currentWeekday = dateNow.getDay();
    let currentDay = dateNow.getDate();
    let currentMonth = dateNow.getMonth();
    let currentTimeGreetings = +dateNow.toTimeString().substring(0,2);

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

    const spans = document.querySelectorAll('.wrapper__date-span');
    const nameTitle = document.querySelector('[data-name]');
    const focusTitle = document.querySelector('[data-focus]');

    spans.forEach((item,i) => {
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

        item.addEventListener('focus', (e)=> {
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



    function init(localKey,title,name,backup) {
        getDataFromLocalStorage(localKey, title,name);
        saveToLocalStorage(backup, title.textContent);
    }

    function changeTitle(e,nameOfTitle, backup) {
        if (e.keyCode === 13) {
            saveToLocalStorage(nameOfTitle, e.target.textContent);
            saveToLocalStorage(backup,e.target.textContent);
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

    function getDataFromLocalStorage(localKey,title,name) {
        let data = localStorage.getItem(localKey);
        if (data) {
            title.textContent = data;
            return;
        }
        title.textContent = `[ENTER ${name}]`;
    }
    function saveToLocalStorageAfterBlur(e, nameTitle,backup) {
        saveToLocalStorage(backup, e.target.textContent)
        saveToLocalStorage(nameTitle, e.target.textContent)
    }



    window.addEventListener('load', init.bind(null,'nameTitle',nameTitle,'NAME', 'backupTitle'));
    window.addEventListener('load', init.bind(null,'focusTitle',focusTitle,'FOCUS', 'backupFocus'));
    nameTitle.addEventListener('keydown', e => changeTitle(e,'nameTitle', 'backupTitle'));
    nameTitle.addEventListener('blur', e => saveToLocalStorageAfterBlur(e, 'nameTitle', 'backupTitle'));


    focusTitle.addEventListener('keydown', e => changeTitle(e,'focusTitle', 'backupFocus'));
    focusTitle.addEventListener('blur', e => saveToLocalStorageAfterBlur(e, 'focusTitle', 'backupFocus'));

// Api background image

     function backgroundImage(api, initFlag) {
        fetch(api)
            .then(response => {
                const img = document.createElement('img');
                img.src = response.url;
                img.addEventListener('load', () => {
                    if (initFlag) {
                        document.body.style.backgroundImage = `url("${img.src}")`;
                        document.body.style.backgroundRepeat = 'no-repeat';
                    } else if (!initFlag) {
                        const backgroundFrame =  document.querySelector('.background');
                        document.body.style.backgroundColor = 'rgba(0,0,0,.1)';
                        document.body.style.backgroundImage = `url("${img.src}")`;
                        document.body.style.backgroundRepeat = 'no-repeat';
                        backgroundFrame.classList.add('opacityBG');
                        setTimeout(()=> {
                            backgroundFrame.classList.remove('opacityBG');
                        },400)
                    }

                })
            })
            .catch(err => {
                console.log(err)
            })

    }
        backgroundImage('https://random.imagecdn.app/1920/1080', true);


    // Refresh

    const refreshBtn = document.querySelector('.refresh');

    refreshBtn.addEventListener('click', () => {
        refreshBtn.classList.add('rotateClass');
        setTimeout(() => {
            refreshBtn.classList.remove('rotateClass');
        }, 800)
    });

    refreshBtn.addEventListener('click', () => {
        backgroundImage('https://random.imagecdn.app/1920/1080', false);
    })
})






