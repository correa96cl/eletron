const { ipcRenderer } = require('electron');

let link = document.querySelector('#link');

console.log('link'+ link);
link.addEventListener('click', function() {
    ipcRenderer.send('abrir-janela-sobre');

});