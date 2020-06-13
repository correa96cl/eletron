const {ipcRenderer, shell}  = require('electron');
let linkFechar = document.querySelector('#link-fechar');
let link = document.querySelector('#link-bradesco');
let versaoElectron = document.querySelector('#versao-electron');

window.onload = function(){
    versaoElectron.textContent = this.process.versions.electron;
}

linkFechar.addEventListener('click', () => {
    ipcRenderer.send('fechar-janela-sobre');
})

link.addEventListener('click', () => {
    shell.openExternal("https://www.bradescoseguros.com.br/clientes");
})
