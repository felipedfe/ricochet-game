class Stage1 extends Phaser.Scene {
  constructor() {
    super("Stage1");
  }
  preload() { }

  create() {
    // Altura total da fase: múltiplo da altura da tela, pra caber várias "telas" de escalada
    this.levelHeight = game.config.height * 3;

    // Imagem BG repetida verticalmente pra cobrir a fase toda.
    // Cada repetição do tile ocupa uma "tela" (mesma proporção que a imagem já tinha antes),
    // então a textura só se repete a cada levelHeight / 3 pixels.
    this.bg = this.add.tileSprite(0, 0, game.config.width, this.levelHeight, "titleBack");
    this.bg.setOrigin(0, 0);
    this.bg.tileScaleX = game.config.width / this.bg.width;
    this.bg.tileScaleY = game.config.height / this.bg.height;

    // Bola (nasce lá embaixo, no fim da fase)
    this.ball = new Ball(this, [game.config.width / 2, this.levelHeight - 40]);

    // Buraco (permanece no topo da fase)
    new Hole(150, 0, this);

    // Grupo das grabBars
    this.grabBarsGroup = [];


    // 1) primeiro rebote, lado direito (já existia, só ajustei o x)
    const bar1 = new GrabBar(700, this.levelHeight - 430, this.levelHeight - 430, this, { ricochetRight: true });
    this.grabBarsGroup.push(bar1);

    // 2) agarra do lado esquerdo — solta indo pra direita de novo
    const bar2 = new GrabBar(140, this.levelHeight - 1000, this.levelHeight - 790, this, { speed: 1500 });
    this.grabBarsGroup.push(bar2);

    // 3) rebote automático, lado direito
    const bar3 = new DefaultBar(650, this.levelHeight - 1530, this.levelHeight - 1330, this);

    // 4) agarra do lado esquerdo de novo
    const bar4 = new GrabBar(140, this.levelHeight - 2000, this.levelHeight - 1690, this, { speed: 1500 });
    this.grabBarsGroup.push(bar4);

    // 5) rebote automático, lado direito
    const bar5 = new DefaultBar(650, this.levelHeight - 2450, this.levelHeight - 2450, this);

    // 6) último agarra antes da reta final
    const bar6 = new GrabBar(140, this.levelHeight - 3100, this.levelHeight - 2710, this, { speed: 1500 });
    this.grabBarsGroup.push(bar6);

    // 7) rebote automático que joga a bola de volta pro lado direito
    const bar7 = new DefaultBar(650, this.levelHeight - 3470, this.levelHeight - 3470, this);

    // 8) rebote final, bem perto da borda esquerda, que mira no buraco
    const bar8 = new DefaultBar(30, this.levelHeight - 4020, this.levelHeight - 4020, this);

    // Limites físicos da fase (mundo mais alto que a tela)
    this.physics.world.setBounds(0, 0, game.config.width, this.levelHeight);
    this.cameras.main.setBounds(0, 0, game.config.width, this.levelHeight);

    // Evento de clique
    this.input.on("pointerdown", this.ball.moveBall);
    this.input.keyboard.on('keydown-SPACE', this.ball.moveBall);
    this.input.keyboard.on('keydown-A', this.ball.moveBall);

    //// fim da create ////
  }

  update() {
    const margin = 30;
    // Verifica se a bola saiu da tela para a esquerda ou para a direita
    if (this.ball.ball.x < -margin || this.ball.ball.x > game.config.width + margin) {
      this.ball.restoreBallInitialPosition();
    }

    // Verifica se a bola saiu da fase para cima ou para baixo
    if (this.ball.ball.y < 0 - margin || this.ball.ball.y > this.levelHeight + margin) {
      this.ball.restoreBallInitialPosition();
    }

    // Câmera acompanha a bola verticalmente, centralizando ela na tela.
    // Some suave (lerp) durante o voo normal; se a distância for grande
    // (ex: a bola acabou de resetar lá embaixo), encaixa direto sem arrastar.
    const cam = this.cameras.main;
    const viewportHeight = game.config.height;
    const targetScrollY = Phaser.Math.Clamp(
      this.ball.ball.y - viewportHeight / 2,
      0,
      this.levelHeight - viewportHeight
    );

    cam.scrollY = Math.abs(targetScrollY - cam.scrollY) > viewportHeight
      ? targetScrollY
      : Phaser.Math.Linear(cam.scrollY, targetScrollY, 0.08);
  }
}
