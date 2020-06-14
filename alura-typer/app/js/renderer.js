const { ipcRenderer } = require('electron');
const timer = require('./timer');

let link = document.querySelector('#link');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');

console.log('link'+ link);
link.addEventListener('click', function() {
    ipcRenderer.send('abrir-janela-sobre');

});


let imagens = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
botaoPlay.addEventListener('click', () => {

    if (play){
        timer.parar();
        play = false;

    }else{
        timer.iniciar(tempo);
        play = true;
    }
     imagens = imagens.reverse()
    botaoPlay.src = imagens[0];
})