const { app, BrowserWindow, ipcMain , Tray, Menu, globalShortcut} = require('electron');
const data = require('./data');
const templateGenerator = require('./template');


let tray = null;
let mainWindow = null;
app.on('ready', () => {
    console.log('PORRRAAAAAAAAA');
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    });

    tray = new Tray(__dirname+'/app/img/icon-tray.png');
    let template = templateGenerator.geraTrayTemplate(mainWindow);
    let templateMenu = templateGenerator.geraMenuPrincipalTemplate(app);
    let trayMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(trayMenu)
    globalShortcut.register('CommandOrControl+Shift+S', () =>{
       mainWindow.send('atalho-iniciar-parar');
    })


    console.log(`${__dirname}`);
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
    app.quit();

});

let sobreWindows = null;
ipcMain.on('abrir-janela-sobre', () => {

    if (sobreWindows == null) {
        sobreWindows = new BrowserWindow({
            width: 300,
            height: 200,
            alwaysOnTop: true,
            frame: false,
            webPreferences: {
                nodeIntegration: true
            }

        });

        sobreWindows.on('closed', () => {
            sobreWindows = null;
        });

    }
    sobreWindows.loadURL(`file://${__dirname}/app/sobre.html`)

});

ipcMain.on('fechar-janela-sobre', () =>{
    sobreWindows.close();
})

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
console.log(`O curso ${curso} foi estudado em um tempo de ${tempoEstudado}`);
data.salvaDados(curso, tempoEstudado);
});

ipcMain.on('curso-adicionado', (event, novoCurso)=> {
    let novoTemplate = templateGenerator.adicionaCursoNoTray(novoCurso, mainWindow);
    let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
    tray.setContextMenu(novoTrayMenu);
});
