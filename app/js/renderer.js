const { ipcRenderer } = require('electron');
const timer = require('./timer')
const data = require('../../data')

let linkSobre = document.querySelector('#link-sobre');
let botaoplay = document.querySelector(".botao-play")
let tempo = document.querySelector('.tempo')
let curso = document.querySelector('.curso')
let botaoAdicionar = document.querySelector('.botao-adicionar')
let campoAdicionar = document.querySelector('.campo-adicionar')

window.onload = () => {

    data.pegaDadosCurso(curso.textContent)
        .then((dados) => {
            tempo.textContent = dados.tempo
        })

}

linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg']
let play = false

botaoplay.addEventListener('click', function(){
    
    if(play){
        timer.parar(curso.textContent)
        play = false
    }else{
        timer.iniciar(tempo)
        play = true
    }

    imgs = imgs.reverse()
    botaoplay.src = imgs[0]
})

ipcRenderer.on('curso-trocado', (event, nomeCurso) => {

    data.pegaDadosCurso(nomeCurso)
        .then((dados)=>{
            tempo.textContent = dados.tempo
        })

    curso.textContent = nomeCurso
})

botaoAdicionar.addEventListener('click', function(){
    let novoCurso = campoAdicionar.value
    curso.textContent = novoCurso
    tempo.textContent = '00:00:00'
    campoAdicionar.value = ''

    ipcRenderer.send('curso-adicionado', novoCurso)
})