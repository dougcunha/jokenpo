/*
    Atribuindo o evento clique nas figuras.
*/
document.querySelectorAll('.player-options > div > img').forEach(el => {
    el.opacity = 0.2;
    el.addEventListener('click', t => {
        reiniciarTabuleiro();
        t.target.className = 'selected';
        inimigoJogar();
    })
});

/*
    Reinicia o "tabuleiro" para a próxima jogada, sem zerar o contador geral.
 */
const reiniciarTabuleiro = () => {
    document.querySelectorAll('.selected').forEach(e => e.removeAttribute('class'));
    document.querySelector('.vencedor').textContent = 'Escolha a sua jogada.';
};

/*
    Reinicia o "tabuleiro" e zera o contador geral.
 */
const reiniciarTudo = () => {
    reiniciarTabuleiro();
    document.querySelectorAll('.placar > h3 > span').forEach(e => e.textContent = 0);
}

/*
    Atualiza o placar com a quantidade de vitórias, derrotas e empates.
*/
const atualizarPlacar = resultado => {
    const MSG = {
        ganhou: 'Você ganhou! <span class="material-icons md-light">sentiment_very_satisfied</span>',
        empatou: 'Deu empate! <span class="material-icons md-light">sentiment_neutral</span>',
        perdeu: 'Você perdeu! <span class="material-icons md-light">sentiment_very_dissatisfied</span>'
    };

    const vencedor = document.querySelector('.vencedor');
    const qtd = document.getElementById(resultado);
    document.querySelector('.' + resultado).classList.add('blink');
    qtd.textContent = parseInt(qtd.firstChild.nodeValue) + 1;
    vencedor.innerHTML = MSG[resultado];

    setTimeout(() => {
        document.querySelectorAll('.placar > h3').forEach(e => e.classList.remove('blink'));
        vencedor.textContent = 'Escolha sua jogada.'
    }, 1500);
}

/*
    Verifica quem ganhou a jogada e manda atualizar o placar.
*/
const verificarVencedor = inimigoJogada => {
    //Evito o uso de ifs para verificar quem ganhou a jogada.
    const MAPA = {
        pedra: {
            tesoura: 'ganhou',
            papel: 'perdeu'
        },
        papel: {
            pedra: 'ganhou',
            tesoura: 'perdeu'
        },
        tesoura: {
            papel: 'ganhou',
            pedra: 'perdeu'
        }
    };
    const minhaJogada = document
        .querySelector('.selected')
        .getAttribute('opt');

    const resultado = MAPA[minhaJogada][inimigoJogada] || 'empatou';
    atualizarPlacar(resultado);
}

/*
    Executa a jogada do computador/inimigo e manda validar a vitória.
 */
const inimigoJogar = () => {
    const jogada = Math.floor(Math.random() * 3);
    const inimigoOpcoes = document.querySelectorAll('.enemy-options > div > img');
    const inimigoJogada = inimigoOpcoes[jogada].getAttribute('opt');
    executarJogadaComAnimacao(inimigoOpcoes, jogada);

    setTimeout(() => {
        verificarVencedor(inimigoJogada);
    }, 800);
}

/*
  Atualiza a jogada do inimigo na página, com animação.
 */
const executarJogadaComAnimacao = (enemyOptions, jogada) => {
    enemyOptions.forEach(e => e.className = 'selected');

    Array.from(enemyOptions)
        .filter((_, i) => i !== jogada)
        .forEach((e, i) => {
            setTimeout(() => {
                e.removeAttribute('class');
            }, 200 * (i+1));
    });
}