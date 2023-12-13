document.addEventListener('DOMContentLoaded', () => {
    const time = document.querySelector('.momentum__date-time');
    const date = <HTMLElement>document.querySelector('.momentum__date-date');
    const greetings = <HTMLElement>document.querySelector('.momentum__date-greetings');
    const hourSpan = document.querySelectorAll('.time_hour');
    const minSpan = document.querySelectorAll('.time_min');
    const secSpan = document.querySelectorAll('.time_sec');
    const spanPM = document.createElement('span');
    const spanAM = document.createElement('span');
    const AMPM_CHECK = +(new Date()).toTimeString().substring(0, 2);
    spanPM.innerText = 'PM';
    spanAM.innerText = 'AM';
    if (AMPM_CHECK >= 0 && AMPM_CHECK <= 11) {
        time.append(spanAM);
    } else if (AMPM_CHECK >= 12 || AMPM_CHECK.toString() === '00') {
        time.append(spanPM);
    }
    setInterval(() => {
        const date = new Date();
        const currentHours = +(date.toTimeString().substring(0, 2));
        const currentMin = date.toTimeString().substring(3, 5);
        const currentSec = date.toTimeString().substring(6, 8);
        if (currentHours >= 1 && currentHours <= 12) {
            hourSpan[0].innerHTML = currentHours[0];
            hourSpan[1].innerHTML = currentHours[1];
        } else if (currentHours >= 13 && currentHours <= 21) {
            hourSpan[0].innerHTML = '0';
            hourSpan[1].innerHTML = (currentHours - 12).toString();
        } else if (currentHours >= 23) {
            hourSpan[0].innerHTML = '1';
            hourSpan[1].innerHTML = (currentHours - 12).toString()[1];
        } else if (currentHours.toString() === '00') {
            hourSpan[0].innerHTML = '1';
            hourSpan[1].innerHTML = (+currentHours + 12).toString()[1];
        }
        minSpan[0].innerHTML = currentMin[0];
        minSpan[1].innerHTML = currentMin[1];
        secSpan[0].innerHTML = currentSec[0];
        secSpan[1].innerHTML = currentSec[1];

    }, 1000);
    const dateNow = new Date();
    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
        return date.toLocaleDateString("en-US", options);
    }
    const currentWeekday = formatDate(dateNow).match(/\w+/gm)[0];
    let currentDay = formatDate(dateNow).match(/\d+/gm)[0];
    const currentMonth = formatDate(dateNow).match(/\w+/gm)[1];
    const currentTimeGreetings = +dateNow.toTimeString().substring(0, 2);
    if (currentTimeGreetings >= 0 && currentTimeGreetings <= 5) {
        greetings.innerText += ' Night,';
    } else if (currentTimeGreetings >= 6 && currentTimeGreetings <= 11) {
        greetings.innerText += ' Morning,';
    } else if (currentTimeGreetings >= 12 && currentTimeGreetings <= 17) {
        greetings.innerText += ' Afternoon,';
    } else if (currentTimeGreetings >= 18 && currentTimeGreetings <= 23) {
        greetings.innerText += ' Evening,';
    }

    switch (currentDay) {
        case "1":
        case "21":
        case "31":
            currentDay += 'st';
            break;
        case "2":
        case "22":
            currentDay += 'nd';
            break;
        case "3":
        case "23":
            currentDay += 'rd';
            break;
        case "8":
        case "28":
            currentDay += 'ht'
            break;
        default:
            currentDay += 'th';
            break;
    }
    date.innerText = `${currentWeekday}, ${currentDay} of ${currentMonth}`;

    // Localstorage

    const spans = document.querySelectorAll('.momentum__date-span');
    const nameTitle = document.querySelector('[data-name]');
    const focusTitle = document.querySelector('[data-focus]');

    spans.forEach((item, i) => {
        item.addEventListener('keydown', (e:KeyboardEvent) => {
            const elem = e.target as HTMLSpanElement;
            if (elem.innerText.length >= 26 && i === 0) {
                if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 37 || e.keyCode === 39) {
                    return;
                }
                e.preventDefault();
            } else if (i === 1 && elem.innerText.length >= 39) {
                if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 37 || e.keyCode === 39) {
                    return;
                }
                e.preventDefault();
            }
        });

        item.addEventListener('focus', (e:FocusEvent) => {
            const elem = e.target as HTMLSpanElement;
            if (elem.textContent === '[ENTER NAME]' || elem.textContent === '[ENTER FOCUS]') {
                elem.textContent = null;
            }
        })
        item.addEventListener('blur', (e:FocusEvent) => {
            const elem = e.target as HTMLSpanElement;
            if (elem.textContent === '' && i === 0) {
                elem.textContent = '[ENTER NAME]';
            }
            if (elem.textContent === '' && i === 1) {
                elem.textContent = '[ENTER FOCUS]';
            }
        })
    });


    function init(localKey:string, title:HTMLElement, name:string, backup:string) {
        getDataFromLocalStorage(localKey, title, name);
        saveToLocalStorage(backup, title.textContent);
    }

    function changeTitle(e:KeyboardEvent, nameOfTitle:string, backup:string) {
        const elem = e.target as HTMLSpanElement;
        if (e.keyCode === 13) {
            saveToLocalStorage(nameOfTitle, elem.textContent);
            saveToLocalStorage(backup, elem.textContent);
            elem.blur();
        }
        if (e.keyCode === 27) {
            elem.textContent = localStorage.getItem(backup);
            elem.blur();
        }
    }

    function getDataFromLocalStorage(localKey:string, title:HTMLElement, name:string) {
        let data = localStorage.getItem(localKey);
        if (data) {
            title.textContent = data;
            return;
        }
        title.textContent = `[ENTER ${name}]`;
    }

    function saveToLocalStorageAfterBlur(e:FocusEvent, nameTitle:string, backup:string) {
        const elem = e.target as HTMLSpanElement;
        saveToLocalStorage(backup, elem.textContent)
        saveToLocalStorage(nameTitle, elem.textContent)
    }


    window.addEventListener('load', init.bind(null, 'nameTitle', nameTitle, 'NAME', 'backupTitle'));
    window.addEventListener('load', init.bind(null, 'focusTitle', focusTitle, 'FOCUS', 'backupFocus'));
    nameTitle.addEventListener('keydown', (e:KeyboardEvent) => changeTitle(e, 'nameTitle', 'backupTitle'));
    nameTitle.addEventListener('blur', (e:FocusEvent) => saveToLocalStorageAfterBlur(e, 'nameTitle', 'backupTitle'));


    focusTitle.addEventListener('keydown', (e:KeyboardEvent) => changeTitle(e, 'focusTitle', 'backupFocus'));
    focusTitle.addEventListener('blur', (e:FocusEvent) => saveToLocalStorageAfterBlur(e, 'focusTitle', 'backupFocus'));

// API background image

    function backgroundImage(api:string, initFlag:boolean) {
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
})
export function saveToLocalStorage(name:string, value:string) {
    localStorage.setItem(name, value);
}