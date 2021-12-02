const btnBurger = document.getElementById('btnBurger');
const btnCloseBurger = document.getElementById('btnCloseBurger');
console.log('teste');

function Drop(){
   const nav = document.getElementById('nav');
   nav.classList.add('active');
}

function Close(){
    nav.classList.remove('active');
}

btnBurger.addEventListener('click', Drop );
btnCloseBurger.addEventListener('click', Close);