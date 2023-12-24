import usdIcon from '../assets/img/USD.png';
import bynIcon from '../assets/img/BYN.png';
import eurIcon from '../assets/img/EUR.png';
import rubIcon from '../assets/img/RUB.png';
import cnyIcon from '../assets/img/CNY.png';
document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelectorAll('.select');
    const selectLiFrom = select[0].querySelectorAll('.select ul li');
    const selectLiTo = select[1].querySelectorAll('.select ul li');
    const selectBtnFrom = <HTMLButtonElement>select[0].querySelector('label button');
    const selectBtnTo = <HTMLButtonElement>select[1].querySelector('label button');
    const currencyFrom = <NodeListOf<HTMLSpanElement>>document.querySelectorAll('.fromCurrency');
    const currencyTo = <NodeListOf<HTMLSpanElement>>document.querySelectorAll('.toCurrency');
    const cFirst = <HTMLSpanElement>document.querySelector('.currencyFirst');
    const cSecond = <HTMLSpanElement>document.querySelector('.currencySecond');
    const lUpdate = <HTMLSpanElement>document.querySelector('.lastUpdate');
    const cInput = <HTMLInputElement>document.querySelector('.amount');
    const inputChange = <HTMLSpanElement>document.querySelector('.inputChange');
    const currentChange = <HTMLSpanElement>document.querySelector('.currentChange');
    const changeBtn = document.querySelector('.change');


    select.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        })
    })
    function changeImageBtn(text: string) {
        switch (text) {
            case "BYN":
                return bynIcon;
            case "USD":
                return usdIcon;
            case "EUR":
                return eurIcon;
            case "RUB":
                return rubIcon;
            case "CNY":
                return cnyIcon;
        }
    }
    function changeBtnFn(btn:HTMLButtonElement,text:string) {
        btn.innerText = text;
        btn.style.cssText = `background-image: url('${changeImageBtn(text)}');
                                        background-size: contain;
                                        background-repeat: no-repeat;
                                        background-position: 55% 50%;`;
    }

    function currInit() {
        const map = new Map();
        fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_hGAkXQlAtUCtm6IPwsosNiAbtbAhPeNQTpnTPAW5&currencies=EUR%2CUSD%2CRUB%2CBYN%2CCNY&base_currency=USD')
            .then(data => {
                if (data.ok) return data.json();
            })
            .then((data) => {
                map.set('update', data.meta["last_updated_at"]);
                map.set('USD',data.data);
                console.log(`curr date - ${map.get('update')}`);
            })
            .then(()=> {
                fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_hGAkXQlAtUCtm6IPwsosNiAbtbAhPeNQTpnTPAW5&currencies=EUR%2CUSD%2CRUB%2CBYN%2CCNY&base_currency=BYN')
                    .then(data => {
                        if (data.ok) return data.json();
                    })
                    .then((data) => {
                        map.set('BYN',data.data);
                    })
            })
            .then(()=> {
                fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_hGAkXQlAtUCtm6IPwsosNiAbtbAhPeNQTpnTPAW5&currencies=EUR%2CUSD%2CRUB%2CBYN%2CCNY&base_currency=RUB')
                    .then(data => {
                        if (data.ok) return data.json();
                    })
                    .then((data) => {
                        map.set('RUB',data.data);
                    })
            })
            .then(()=> {
                fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_hGAkXQlAtUCtm6IPwsosNiAbtbAhPeNQTpnTPAW5&currencies=EUR%2CUSD%2CRUB%2CBYN%2CCNY&base_currency=EUR')
                    .then(data => {
                        if (data.ok) return data.json();
                    })
                    .then((data) => {
                        map.set('EUR',data.data);
                    })
            })
            .then(()=> {
                fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_hGAkXQlAtUCtm6IPwsosNiAbtbAhPeNQTpnTPAW5&currencies=EUR%2CUSD%2CRUB%2CBYN%2CCNY&base_currency=CNY')
                    .then(data => {
                        if (data.ok) return data.json();
                    })
                    .then((data) => {
                        map.set('CNY',data.data);
                        cFirst.innerText = map.get('USD')['BYN'].value.toFixed(5);
                        lUpdate.innerText = map.get('update').replace(/Z|T/ig, ' ') + 'UTC';
                        cSecond.innerText = map.get('BYN')['USD'].value.toFixed(5);
                        cInput.addEventListener('focus', async e => {
                            const from = document.querySelector('#id-from li.active').textContent;
                            const to = document.querySelector('#id-to li.active').textContent;
                            let value:number;
                            cInput.addEventListener('keydown',(e:KeyboardEvent) => {
                                const elem = e.target as HTMLInputElement;
                                if (e.keyCode === 13 || e.keyCode === 27) {
                                    elem.blur()
                                }
                                if (elem.value.at(-2) === '.' || elem.value.length >= 12) {
                                    if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 37 || e.keyCode === 39) {
                                        return;
                                    }
                                    e.preventDefault();
                                }
                            })
                            cInput.addEventListener('input',e => {
                                const elem = e.target as HTMLInputElement;
                                if (elem.value === '') {
                                    value = 0;
                                    inputChange.innerText = value.toString();
                                    currentChange.innerText = '0.00';
                                    return;
                                }
                                value = +elem.value
                                inputChange.innerText = value.toString();
                                currentChange.innerText = (map.get(from)[to].value * value).toFixed(2);
                            })
                        })
                        changeBtn.addEventListener('click', () => {
                            const textTo = currencyTo[2].innerText;
                            const textFrom = currencyFrom[2].innerText;
                            const fromActive = <HTMLLIElement>select[0].querySelector('.select ul > li.active');
                            const toActive = <HTMLLIElement>select[1].querySelector('.select ul > li.active');
                            selectLiFrom.forEach((item:HTMLLIElement) => {
                                if (item.innerText === toActive.innerText) {
                                    item.classList.add('active')
                                    return;
                                }
                                item.classList.remove('active')
                            })
                            selectLiTo.forEach((item:HTMLLIElement) => {
                                if (item.innerText === fromActive.innerText) {
                                    item.classList.add('active')
                                    return;
                                }
                                item.classList.remove('active')
                            })
                            currencyFrom[2].innerText = textTo;
                            currencyTo[2].innerText = textFrom;
                            changeBtnFn(selectBtnFrom,textTo);
                            changeBtnFn(selectBtnTo,textFrom);
                            if (cInput.value) {
                                currentChange.innerText = (map.get(textTo)[textFrom].value * +cInput.value).toFixed(2);
                            }
                        });
                        selectLiFrom.forEach(item => {
                            item.addEventListener('click', () => {
                                const text = item.textContent;
                                item.classList.add('active');
                                selectLiFrom.forEach(elem =>{
                                    if (item !== elem) {
                                        elem.classList.remove('active');
                                    }
                                })
                                changeBtnFn(selectBtnFrom,text);
                                currencyFrom.forEach(item => {
                                    item.textContent = text;
                                });
                                const toSelectCurrency = document.querySelector('#id-to li.active').textContent;
                                cFirst.innerText = map.get(text)[toSelectCurrency].value.toFixed(5);
                                cSecond.innerText = map.get(toSelectCurrency)[text].value.toFixed(5);
                                if (cInput.value) {
                                    currentChange.innerText = (map.get(text)[toSelectCurrency].value * +cInput.value).toFixed(2);
                                }

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
                                changeBtnFn(selectBtnTo,text)
                                currencyTo.forEach(item => {
                                    item.textContent = text;
                                })
                                const baseCurrency = document.querySelector('#id-from li.active').textContent;
                                cFirst.innerText = map.get(baseCurrency)[text].value.toFixed(5);
                                cSecond.innerText = map.get(text)[baseCurrency].value.toFixed(5);
                                if (cInput.value) {
                                    currentChange.innerText = (map.get(baseCurrency)[text].value * +cInput.value).toFixed(2);
                                }
                            })
                        })
                    })
            })
            .catch(err => {
                console.log(err);
                const elem = lUpdate.parentNode as HTMLElement;
                elem.innerText = `Server Error !`;
            })

    }
    // currInit();
})