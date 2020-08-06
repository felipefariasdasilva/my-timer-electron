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
        new Notification('MyTimer', {
            body: `O curso ${curso.textContent} foi parado!!` ,
            icon: 'img/stop-button.png'
        })
    }else{
        timer.iniciar(tempo)
        play = true
        new Notification('MyTimer', {
            body: `O curso ${curso.textContent} foi iniciado!!`,
            icon: 'img/play-button.png'
        })
    }

    imgs = imgs.reverse()
    botaoplay.src = imgs[0]
})

ipcRenderer.on('curso-trocado', (event, nomeCurso) => {

    timer.parar(curso.textContent)
    data.pegaDadosCurso(nomeCurso)
        .then((dados)=>{
            tempo.textContent = dados.tempo
        })
        .catch((err)=>{
            tempo.textContent = '00:00:00'
        })

    curso.textContent = nomeCurso
})

botaoAdicionar.addEventListener('click', function(){

    if(campoAdicionar == ''){
        return
    }

    let novoCurso = campoAdicionar.value
    curso.textContent = novoCurso
    tempo.textContent = '00:00:00'
    campoAdicionar.value = ''

    ipcRenderer.send('curso-adicionado', novoCurso)
})

ipcRenderer.on('atalho-iniciar-parar', () => {
    let click = new MouseEvent('click')
    botaoplay.dispatchEvent(click)
})