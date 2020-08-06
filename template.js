const data = require('./data')

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
}