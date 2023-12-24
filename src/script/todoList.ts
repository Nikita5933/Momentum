import {ITaskObj} from "./interfaces";
import editIcon from '../assets/img/icons/edit.svg';
import saveIcon from '../assets/img/icons/save.svg';
import deleteIcon from '../assets/img/icons/delete.svg';

document.addEventListener('DOMContentLoaded', () => {
    // Settings

    const settings = document.getElementById('settings');
    const settingsWrapper = document.getElementById('settingsWrapper');
    const settingsClose = document.getElementById('settingsClose');
    const toDoWrapper = document.getElementById('toDoWrapper');

    function fadeOut() {
        settingsWrapper.classList.remove('settings-active');
        settingsWrapper.classList.add('settings-disable');
        setTimeout(()=> {
            settingsWrapper.style.visibility = 'hidden';
        },401);
    }
    function fadeIn() {
        settingsWrapper.style.visibility = 'visible';
        settingsWrapper.classList.add('settings-active');
        settingsWrapper.classList.remove('settings-disable');
        settingsWrapper.focus();
    }

    settings.addEventListener('click', fadeIn.bind(null));
    settingsClose.addEventListener('click',fadeOut.bind(null));

    settingsWrapper.addEventListener('keydown', e => {
        if(e.keyCode === 27) {
            fadeOut();
        }
    })

    toDoWrapper.addEventListener('click', e => {
        if (e.target === settingsWrapper) {
            fadeOut();
        }
    })

    // To-do list

    let tasksObj:ITaskObj = {
        pendingArray: [],
        completedArray: []
    };

    type TypePosition = 'pending' | 'completed';

    const PENDING_LIST = 'pending';
    const COMPLETED_LIST = 'completed';

    const addTask = <HTMLInputElement>document.getElementById('task');
    const addBtn = document.getElementById('addBtn');
    const pendingTasks = document.getElementById('pendingWrapper');
    const completedTasks = document.getElementById('completedWrapper');


    addBtn.addEventListener('click', () => {
        const value = addTask.value.trim();
        if (value) {
            tasksObj.pendingArray.push(value);
            addTask.value = '';
            updateList(PENDING_LIST);
        }
    })
    addTask.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            const value = addTask.value.trim();
            if (value) {
                tasksObj.pendingArray.push(value);
                addTask.value = '';
                updateList(PENDING_LIST);
            }
            addTask.blur();
        }
        if (e.keyCode === 27) {
            addTask.blur();
        }
    })

    function taskRender(message:string, position:TypePosition, index:number) {
        const task = `
        <div class="task ${position === COMPLETED_LIST ? 'task-completed' : ''}" data-type="${position}" data-index="${index}">
                    <button class="ticket"></button>
                    <p class="text">${message}</p>
                    <input class="edit" type="text">
                    <div class="task-buttons__wrapper">
                        <button class="tool-button edit-btn"><img src="${editIcon}" alt="edit"></button>
                        <button class="tool-button save-btn"><img src="${saveIcon}" alt="save"></button>
                        <button class="tool-button delete-btn"><img src="${deleteIcon}" alt="delete"></button>
                    </div>
                </div>
        `;
        switch (position) {
            case PENDING_LIST:
                pendingTasks.insertAdjacentHTML('beforeend', task);
                break;
            case COMPLETED_LIST:
                completedTasks.insertAdjacentHTML('beforeend', task);
                break;
        }
    }
    function updateList(list:TypePosition) {
        list === PENDING_LIST ? pendingTasks.innerHTML = '' : completedTasks.innerHTML = '';
        tasksObj[`${list}Array`].forEach((item, ind) => taskRender(item, list, ind));
        updateEvents(list);
    }


    function updateEvents(list:TypePosition) {
        const currentList = document.getElementById(`${list}Wrapper`);
        const tasks = currentList.querySelectorAll('.task');

        tasks.forEach((item:HTMLElement) => {
            const text = <HTMLElement>item.querySelector('.text');
            const edit = <HTMLInputElement>item.querySelector('.edit');
            const saveBtn = <HTMLButtonElement>item.querySelector('.save-btn');
            const editBtn = <HTMLButtonElement>item.querySelector('.edit-btn');
            const deleteBtn = item.querySelector('.delete-btn');
            const ticket = item.querySelector('.ticket');

            function saveBtnFn(){
                editBtn.style.display = 'block';
                saveBtn.style.display = 'none';
                text.style.display = 'block';
                edit.style.display = 'none';
                text.innerHTML = edit.value;
                tasksObj[`${list}Array`][+item.dataset.index] = edit.value;
            }

            ticket.addEventListener('click', (e:MouseEvent) => {
                const secondList = list === COMPLETED_LIST ? PENDING_LIST : COMPLETED_LIST;
                const elem = tasksObj[`${list}Array`].splice(+item.dataset.index, 1);
                tasksObj[`${secondList}Array`].unshift(elem.toString());
                updateList(list);
                updateList(secondList);
            })

            edit.addEventListener('keydown', (e:KeyboardEvent) => {
                if (e.keyCode === 13) {
                    saveBtnFn();
                }
                if (e.keyCode === 27) {
                    edit.blur();
                }
            })
            editBtn.addEventListener('click', () => {
                saveBtn.style.display = 'block';
                editBtn.style.display = 'none';
                text.style.display = 'none';
                edit.style.display = 'block';
                edit.value = tasksObj[`${list}Array`][+item.dataset.index];
                edit.focus();
            });
            saveBtn.addEventListener('click', () => {
                saveBtnFn();
            })
            deleteBtn.addEventListener('click', () => {
                tasksObj[`${list}Array`].splice(+item.dataset.index, 1);
                updateList(list);
            })
        })
    }

    // To-do localStorage

    const toDoSave = document.getElementById('to-doSave');
    const toDoReset = document.getElementById('to-doReset');

    toDoSave.addEventListener('click', () => {
        if(tasksObj.pendingArray.length !== 0 || tasksObj.completedArray.length !== 0) {
            localStorage.setItem('list', JSON.stringify(tasksObj));
        }
        fadeOut();

    })
    toDoReset.addEventListener('click', () => {
        localStorage.setItem('list', '');
        fadeOut();
    })
    function listInit() {
        if (localStorage.getItem('list')) {
            tasksObj = JSON.parse(localStorage.getItem('list'));
            updateList(PENDING_LIST);
            updateList(COMPLETED_LIST);
        }
    }
    listInit();
})