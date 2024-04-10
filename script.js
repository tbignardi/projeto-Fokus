const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const iniciarBt = document.querySelector('.app__card-primary-button');
const timerDisplay = document.querySelector('#timer');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const trocaIcone = document.querySelector('.app__card-primary-butto-icon');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somPlay = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');
const somTimeOut = new Audio('/sons/beep.mp3');
musica.loop = true;
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})
//função para alternar as imagens e texto da página
function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto)
    imagem.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML= `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`            
            break;

        case "descanso-curto":
            titulo.innerHTML= `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa.</strong>`
            break;

        case "descanso-longo":
                titulo.innerHTML= `Hora de volar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`    
        default:
            break;
        
    }

}

    const contagemRegressiva = () => {
        if(tempoDecorridoEmSegundos <= 0){
            somTimeOut.play();
            alert ('Tempo esgotado! ');
            zerar();
        return;
        }
        //iniciar();
        tempoDecorridoEmSegundos -= 1;
        mostrarTempo();
    }

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        somPause.play();
        zerar();
        return;
    }
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    trocaIcone.setAttribute('src', '/imagens/pause.png');
    
}

function zerar(){
    clearInterval(intervaloId);
    trocaIcone.setAttribute('src', '/imagens/play_arrow.png');
    iniciarOuPausarBt.textContent = "Começar";
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    timerDisplay.innerHTML= `${tempoFormatado}`;
}

mostrarTempo();




