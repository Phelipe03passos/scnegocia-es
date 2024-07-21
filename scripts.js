// Função para avançar para a próxima etapa
function nextStep() {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    iniciarSimulacao();
}

// Função para iniciar a simulação
function iniciarSimulacao() {
    var video = document.getElementById('video-simulacao');
    video.currentTime = 0; // Iniciar o vídeo do começo
    video.play();
    video.addEventListener('timeupdate', verificarTempo);
}

// Função para verificar o tempo do vídeo
function verificarTempo() {
    var video = document.getElementById('video-simulacao');
    if (video.currentTime >= 11) {
        video.pause();
        document.getElementById('botoes-simulacao').style.display = 'block';
    }
}

// Função para ação de compra
function acaoCompra() {
    var video = document.getElementById('video-simulacao');
    document.getElementById('botoes-simulacao').style.display = 'none';
    video.removeEventListener('timeupdate', verificarTempo);
    video.play();
    video.addEventListener('ended', function() {
        mostrarResultado(false); // Passar 'false' indicando que a compra está errada
    });
}

// Função para ação de venda
function acaoVenda() {
    var video = document.getElementById('video-simulacao');
    document.getElementById('botoes-simulacao').style.display = 'none';
    video.removeEventListener('timeupdate', verificarTempo);
    video.play();
    video.addEventListener('ended', function() {
        mostrarResultado(true); // Passar 'true' indicando que a venda está certa
    });
}

// Função para lançar confetes
function lancarConfetes() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Função para mostrar o resultado da ação
function mostrarResultado(isVendaCorreta) {
    var resultTitle = '';
    var resultMessage = '';

    // Limpar botões anteriores
    var step3 = document.getElementById('step3');
    while (step3.lastChild.tagName === 'BUTTON') {
        step3.removeChild(step3.lastChild);
    }

    if (isVendaCorreta) {
        // Caso certo
        resultTitle = 'Parabéns! Você Acertou! 🎉';
        resultMessage = 'Você acertou a previsão e está no caminho certo para dominar o mercado financeiro! 🎯 Aproveite esta oportunidade para aprofundar ainda mais seus conhecimentos com nosso ebook exclusivo, que oferece estratégias comprovadas como no exemplo do grafico anterior e insights valiosos. E o melhor de tudo, você pode adquiri-lo com 50% de desconto! Não perca essa chance de transformar sua abordagem financeira. 🚀📈';
        lancarConfetes(); // Chama a função para lançar confetes

        // Adicionar botão para o checkout do ebook
        var checkoutButton = document.createElement('button');
        checkoutButton.className = 'button';
        checkoutButton.innerText = 'Comprar Ebook com 50% de Desconto 📚';
        checkoutButton.onclick = function() {
            window.location.href = 'https://pay.hotmart.com/I94197589W'; // Insira o link para o checkout do ebook aqui
        };
        step3.appendChild(checkoutButton);

    } else {
        // Caso errado
        resultTitle = 'Infelizmente, Você Errou 😞';
        resultMessage = 'Não desanime! Nem sempre é possível acertar todas. Tente novamente e aperfeiçoe suas habilidades!';
        
        // Adicionar botão para tentar novamente
        var retryButton = document.createElement('button');
        retryButton.className = 'button';
        retryButton.innerText = 'Tentar Novamente 🔄';
        retryButton.onclick = reset;
        step3.appendChild(retryButton);
    }

    document.getElementById('result-title').innerText = resultTitle;
    document.getElementById('result-message').innerText = resultMessage;
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
}

// Função para reiniciar o processo
function reset() {
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    // Limpar resultados anteriores e preparar para nova tentativa
    document.getElementById('result-title').innerText = '';
    document.getElementById('result-message').innerText = '';
}
