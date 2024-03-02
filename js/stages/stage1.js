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

    // const bar1 = new HorizontalGrabBar(630, 630, 1100, this);
    // const bar2 = new HorizontalGrabBar(0, 700, 600, this);
    // new DefaultBar(600, 1000, 1000, this);
    new DefaultBar(100, 700, 700, this);
    const bar3 = new GrabBar(600, 940, 940, this)

    this.grabBarsGroup.push(
      // bar1,
      bar3
    );

    // Evento de clique
    this.input.on("pointerdown", this.ball.moveBall);
    this.input.keyboard.on('keydown-SPACE', this.ball.moveBall);

    //// fim da create ////
  }

  update() {
    const margin = 30;
    // Verifica se a bola saiu da tela para a esquerda ou para a direita
    if (this.ball.ball.x < -margin || this.ball.ball.x > game.config.width + margin) {
      this.ball.restoreBallInitialPosition();
    }

    // Verifica se a bola saiu da tela para cima ou para baixo
    if (this.ball.ball.y < 0 - margin || this.ball.ball.y > game.config.height + margin) {
      this.ball.restoreBallInitialPosition();
    }
  }
}
