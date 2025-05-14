function verificarData() {
    const input = document.getElementById('dataInput').value;
    const erro = document.getElementById('erro');
    const loginContainer = document.getElementById('login-container');
    const conteudo = document.getElementById('conteudo');
  
    if (!input) {
      erro.textContent = 'Por favor, insira uma data.';
      return;
    }
  
    const dataEsperada = '2010-05-17';
    const dataDigitada = new Date(input);
  
    const ano = dataDigitada.getUTCFullYear();
    const mes = String(dataDigitada.getUTCMonth() + 1).padStart(2, '0');
    const dia = String(dataDigitada.getUTCDate()).padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia}`;
  
    if (dataFormatada === dataEsperada) {
      loginContainer.style.display = 'none';
      conteudo.style.display = 'block';
      iniciarBaloes();
    } else {
      erro.textContent = 'Data incorreta. Tente novamente.';
    }
  }
  
  function iniciarBaloes() {
    const canvas = document.getElementById('baloes');
    const ctx = canvas.getContext('2d');
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
  
    let coracoes = [];
  
    function criarCoracao() {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        size: 10 + Math.random() * 20,
        velY: 1 + Math.random() * 2,
      };
    }
  
    for (let i = 0; i < 30; i++) {
      coracoes.push(criarCoracao());
    }
  
    function desenharCoracao(ctx, x, y, size) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 100, size / 100);
      ctx.beginPath();
      ctx.moveTo(75, 40);
      ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
      ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
      ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
      ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
      ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
      ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
      ctx.closePath();
      ctx.fillStyle = 'pink';
      ctx.fill();
      ctx.restore();
    }
  
    function desenhar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let c of coracoes) {
        desenharCoracao(ctx, c.x, c.y, c.size);
        c.y -= c.velY;
        if (c.y + c.size < 0) {
          Object.assign(c, criarCoracao());
          c.y = canvas.height;
        }
      }
      requestAnimationFrame(desenhar);
    }
  
    desenhar();
  }
  