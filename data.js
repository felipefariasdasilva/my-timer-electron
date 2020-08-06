const jsonfile = require('jsonfile-promised')
const filesystem = require('fs')

module.exports = {

    salvaDados(curso, tempoEstudado){
        let arquivoCurso = __dirname + '/data/' + curso + '.json'

        if(filesystem.existsSync(arquivoCurso)){
            this.adicionaTempoAoCurso(arquivoCurso, tempoEstudado)
        }else{
            this.criaArquivosDeCurso(arquivoCurso, {})
                .then(()=>{
                    this.adicionaTempoAoCurso(arquivoCurso, tempoEstudado)
                })
        }
    },

    adicionaTempoAoCurso(arquivoCurso, tempoEstudado){
        
        let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempoEstudado
        }

        jsonfile.writeFile(arquivoCurso, dados, { spaces: 2})
            .then(() => {

            })
            .catch((err) => {
                console.log(err);
            })
    },

    criaArquivosDeCurso(nomeArquivo, conteudoArquivo){
        
        return jsonfile.writeFile(nomeArquivo, conteudoArquivo)
            .then(() => {

            })
            .catch( (err) => {
                console.log(err);
            })

    },

    pegaDadosCurso(curso){

        let arquivoCurso = __dirname + '/data/' + curso + '.json'
        return jsonfile.readFile(arquivoCurso)
        
    },

    pegaNomeCursos(){
        let arquivos = filesystem.readdirSync(__dirname + '/data/')
        let cursos = arquivos.map((arquivo) => {
            return arquivo.substr(0, arquivo.lastIndexOf('.'))
        })

        return cursos
    }

}