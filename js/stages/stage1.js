class Stage1 extends Phaser.Scene {
  constructor() {
    super("Stage1");
  }
  preload() { }

  create() {
    // Imagem BG
    this.bg = this.add.image(0, 0, "titleBack");
    this.bg.setOrigin(0, 0);
    this.bg.displayWidth = game.config.width;
    this.bg.displayHeight = game.config.height;

    // Bola
    this.ball = new Ball(this);

    // Buraco
    new Hole(150, 0, this);

    // Grupo das grabBars
    this.grabBarsGroup = [];

    const bar1 = new HorizontalGrabBar(500, 500, 1100, this);

    this.grabBarsGroup.push(bar1);

    // Evento de clique
    this.input.on("pointerdown", this.ball.moveBall);
    this.input.keyboard.on('keydown-SPACE', this.ball.moveBall);

    //// fim da create ////
    console.log("STAGE 1---------", this)
  }

  update() {
    // Verifica se a bola saiu da tela para a esquerda ou para a direita
    if (this.ball.ball.x < 0 || this.ball.ball.x > game.config.width) {
      this.ball.restoreBallInitialPosition();
    }

    // Verifica se a bola saiu da tela para cima ou para baixo
    if (this.ball.ball.y < 0 || this.ball.ball.y > game.config.height) {
      this.ball.restoreBallInitialPosition();
    }
  }
}
