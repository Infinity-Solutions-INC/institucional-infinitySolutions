let openButtonMenu = document.getElementById('open-hamburguer-menu');
let menu = document.getElementById('hamburguer-menu');

openButtonMenu.addEventListener('click', () => {
    menu.classList.add('open-menu');
})

menu.addEventListener('click', () => {
    menu.classList.remove('open-menu');
})