class Stage2 extends Phaser.Scene {
  constructor() {
    super("Stage2");
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
    // this.ball = new Ball(this, [game.config.width / 2, game.config.height - 1100]);

    // Buraco
    new Hole(150, 0, this);

    // Grupo das grabBars
    this.grabBarsGroup = [];

    // const bar1 = new HorizontalGrabBar(100, 350, 300, this, 1500);
    const bar2 = new GrabBar(600, 700, 1100, this, 1200, false, false, true);
    // const bar2 = new GrabBar(600, 970, 970, this, 1200);
    const bar3 = new GrabBar(50, 600, 600, this, 2000, false, true, false);
    
    const bar4 = new DefaultBar(710, 0, 0, this);
    bar4.bar.displayHeight = 500;
    const topBar = new DefaultBar(400, 0, 0, this);
    topBar.bar.displayWidth = game.config.width;
    topBar.bar.displayHeight = 30;

    this.grabBarsGroup.push(
      // bar1,
      bar2,
      bar3,
    );

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

    // Verifica se a bola saiu da tela para cima ou para baixo
    if (this.ball.ball.y < 0 - margin || this.ball.ball.y > game.config.height + margin) {
      this.ball.restoreBallInitialPosition();
    }
  }
}
