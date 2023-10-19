"use strict";
document.addEventListener('DOMContentLoaded', () =>{
// Date
    const time = document.querySelector('.wrapper__date-time');
    const date = document.querySelector('.wrapper__date-date');
    const greetings = document.querySelector('.wrapper__date-greetings')
    const hourSpan = document.querySelectorAll('.time_hour');
    const minSpan = document.querySelectorAll('.time_min');
    const secSpan = document.querySelectorAll('.time_sec');
    const checkerAMPM = (new Date()).toLocaleString('en-US', { hour: 'numeric', hour12: true })[2];
    const spanPM = document.createElement('span');
    const spanAM = document.createElement('span');
    spanPM.innerText = 'PM';
    spanAM.innerText = 'AM';
    if (checkerAMPM === 'A') {
        time.append(spanAM);
    }
    time.append(spanPM)
    setInterval(()=> {
        const date = new Date();
        const currentHours = date.toTimeString().substring(0,2)
        const currentMin = date.toTimeString().substring(3,5)
        const currentSec = date.toTimeString().substring(6,8)
        if (checkerAMPM === 'A') {
            hourSpan[0].innerHTML = currentHours[0];
            hourSpan[1].innerHTML = currentHours[1];
            minSpan[0].innerHTML = currentMin[0];
            minSpan[1].innerHTML = currentMin[1];
            secSpan[0].innerHTML = currentSec[0];
            secSpan[1].innerHTML = currentSec[1];
        } else if (checkerAMPM === 'P') {
            minSpan[0].innerHTML = currentMin[0];
            minSpan[1].innerHTML = currentMin[1];
            secSpan[0].innerHTML = currentSec[0];
            secSpan[1].innerHTML = currentSec[1];
            if(currentHours - 12 < 10) {
                hourSpan[0].innerHTML = '0';
                hourSpan[1].innerHTML = currentHours - 12;
            } else if (currentHours >= 10) {
                hourSpan[0].innerHTML = currentHours[0];
                hourSpan[1].innerHTML = currentHours[1];
            }

        }
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

    // Refresh

    const refreshBtn = document.querySelector('.refresh');

    refreshBtn.addEventListener('click', () => {
        refreshBtn.classList.add('rotateClass');
        setTimeout(() => {
            refreshBtn.classList.remove('rotateClass');
        }, 800)
    })

    // Localstorage

    const spans = document.querySelectorAll('.wrapper__date-span');
    const nameTitle = document.querySelector('[data-name]');
    const focusTitle = document.querySelector('[data-focus]');

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
    nameTitle.addEventListener('keydown', e => changeTitle(e,'nameTitle', 'backupTitle'));
    nameTitle.addEventListener('blur', e => saveToLocalStorageAfterBlur(e, 'nameTitle', 'backupTitle'));

    window.addEventListener('load', init.bind(null,'focusTitle',focusTitle,'FOCUS', 'backupFocus'));
    focusTitle.addEventListener('keydown', e => changeTitle(e,'focusTitle', 'backupFocus'));
    focusTitle.addEventListener('blur', e => saveToLocalStorageAfterBlur(e, 'focusTitle', 'backupFocus'));
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

        // item.addEventListener('focus', (e)=> {
        //     e.target.textContent = '';
        // })
        // item.addEventListener('blur', (e) => {
        //     // console.log(backupTitle)
        //     e.target.textContent = backupTitle;
        // })
    });

})



