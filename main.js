const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
const data = require('./data')
const templateGenerator = require('./template')

let mainWindow = null
let splash = null
let sobreWindow = null
let tray = null

app.on('ready', () => {

    mainWindow = new BrowserWindow(
        {
            titleBarStyle: 'hidden',
            width: 600,
            height: 400,
            show: false,
            webPreferences: {
                nodeIntegration: true
            },
        }
    )

    splash = new BrowserWindow(
        {
            width: 600, 
            height: 400,
            transparent: true, 
            frame: false, 
            alwaysOnTop: true,
            webPreferences: {
                nodeIntegration: true
            },
        }
    )

    tray = new Tray(__dirname + '/app/img/icon-tray.png')
    let template = templateGenerator.geraTrayTemplate(mainWindow)
    let trayMenu = Menu.buildFromTemplate(template)
    tray.setContextMenu(trayMenu)

    splash.loadURL(`file://${__dirname}/app/splash.html`);
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    mainWindow.on('ready-to-show', () => {

        setTimeout(function(){
            splash.destroy()
            mainWindow.show()
        }, 3000)

    })

})

app.on('window-all-closed', () => {
    app.quit()
})

ipcMain.on('open-about', () => {
    if(sobreWindow == null){
        sobreWindow = new BrowserWindow(
            {
                width: 300,
                height: 220,
                alwaysOnTop: true,
                webPreferences: {
                    nodeIntegration: true
                },
                frame: false
            }
        )
        sobreWindow.on('closed', () => {
            sobreWindow = null
        })
    }
    
    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`)
})

ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close()
})

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
    data.salvaDados(curso, tempoEstudado)
})

ipcMain.on('curso-adicionado', (event, novoCurso) => {
    let novoTemplate = templateGenerator.adicionaCursoNoTray(novoCurso, mainWindow)
    let novoTrayMenu = Menu.buildFromTemplate(novoTemplate)
    tray.setContextMenu(novoTrayMenu)
})