const { app, BrowserWindow, ipcMain } = require('electron');

app.on('ready', () => {
    console.log('PORRRAAAAAAAAA');
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    });

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
