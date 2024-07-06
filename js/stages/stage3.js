class Stage3 extends Phaser.Scene {
  constructor() {
    super("Stage3");
  }
  preload() { }

  create() {
    // Imagem BG
    this.bg = this.add.image(0, 0, "titleBack");
    this.bg.setOrigin(0, 0);
    this.bg.displayWidth = game.config.width;
    this.bg.displayHeight = game.config.height;

    // Bola
    // this.ball = new Ball(this, [game.config.width / 2 + 300, game.config.height - 250]);
    this.ball = new Ball(this);

    // new Ball(this);

    // Buraco
    new Hole(150, 0, this);

    // Grupo das grabBars
    this.grabBarsGroup = [];
    // this.grabBarsGroup = this.add.group(); 

    // const bar1 = new HorizontalGrabBar(100, 350, 300, this, 1500);
    // this.grabBarsGroup.push(bar1);

    // const bar2 = new GrabBar(600, 700, 1100, this, 1200);
    // this.grabBarsGroup.push(bar2);



    // const bar4 = new DefaultBar(710, 600, 600, this);
    // bar4.bar.displayHeight = 500;

    // const topBar = new DefaultBar(600, 1200, 1200, this);
    // topBar.bar.displayWidth = 800;
    // topBar.bar.displayHeight = 900;

    // BARRAS
    const grabBar1 = new GrabBar(game.config.width - 30, 950, 950, this, 2000);
    this.grabBarsGroup.push(grabBar1);

    new DefaultBar(520, 900, 1150, this, 800);

    // centro
    new DefaultBar(350, 630, 900, this, 500);

    // canto esquerdo
    new DefaultBar(40, 830, 830, this, 500);

    // cima
    const horizontalBar1 = new DefaultBar(260, 600, 600, this)
    horizontalBar1.bar.displayWidth = 200;
    horizontalBar1.bar.displayHeight = 30;

    const horizontalGrabBar1 = new HorizontalGrabBar(90, 90, 1000, this);
    this.grabBarsGroup.push(horizontalGrabBar1);

    // canto esquerdo
    const grabBar2 = new GrabBar(40, 300, 630, this, 1200);
    this.grabBarsGroup.push(grabBar2);

    // quina do canto direito
    const verticalBar1 = new DefaultBar(game.config.width - 30, 0, 0, this);
    verticalBar1.bar.displayHeight = 350;

    const horizontalBar2 = new DefaultBar(350, 0, 0, this);
    horizontalBar2.bar.displayWidth = 450;
    horizontalBar2.bar.displayHeight = 30;

    // horizontal grab bar de cima
    const horizontalGrabBar2 = new HorizontalGrabBar(200, 500, 400, this, 700);
    this.grabBarsGroup.push(horizontalGrabBar2);

    // Evento de clique
    console.log(this)
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
