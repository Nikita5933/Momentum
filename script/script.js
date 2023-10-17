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

    // Span

    const spans = document.querySelectorAll('.wrapper__date-span');

    spans.forEach((item,i) => {
        item.addEventListener('keydown', (e) => {
            if (e.target.innerText.length >= 34 && i === 0) {
                e.target.innerText = e.target.innerText.substring(0,34);
            } else {
                e.target.innerText = e.target.innerText.substring(0,49);
            }
        })
    });
})

