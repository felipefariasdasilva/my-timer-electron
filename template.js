const data = require('./data')
const { ipcMain } = require('electron') 
module.exports = {

    templateInicial: null,

    geraTrayTemplate(win){

        let template = [
            {
                'label': 'cursos'
            },
            {
                'type': 'separator',
            }
        ]
        
        let cursos = data.pegaNomeCursos()
        cursos.forEach((curso) => {
            
            let menuItem = {
                label: curso,
                type: 'radio',
                click: () => {
                    win.send('curso-trocado', curso)
                }
            }
            
            template.push(menuItem)

        })

        this.templateInicial = template

        return template
    },

    adicionaCursoNoTray(nomeCurso, win){

        this.templateInicial.push(
            {
                label: nomeCurso,
                type: 'radio',
                checked: true,
                click: () => {
                    win.send('curso-trocado', nomeCurso)
                }
            }
        )

        return this.templateInicial
    },

    geraMenuPrincipalTemplate(app){

        let templateMenu = [
            {
                label: 'View',
                submenu: [
                    {
                        role: 'reload'
                    },
                    {
                        role: 'toggledevtools'
                    },
                ]
            },
            {
                label: 'Window',
                submenu: [
                    {
                        role: 'minimize',
                        accelerator: 'Alt+M'
                    },
                    {
                        role: 'maximize',
                        accelerator: 'Shift+M'
                    },
                    {
                        role: 'close'
                    },
                ]
            },
            {
                label: 'Sobre',
                submenu: [
                    {
                        label: 'Sobre o MyTimer',
                        accelerator: 'CommandOrControl+I',
                        click: () => {
                            ipcMain.emit('abrir-janela-sobre')
                        }
                    },
                ]
            }
        ]
    
        if(process.platform == 'darwin'){
            templateMenu.unshift(
                {
                    label: app.getName(),
                    submenu: [
                        {
                            label: 'MyTimer no Mac'
                        },
                    ]
                }
            )
        }

        return templateMenu

    },
}