class TestStage extends Phaser.Scene {
  constructor() {
    super("TestStage");
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

    const bar3 = new GrabBar(520, 1200, 1200, this, 2000, true);
    this.grabBarsGroup.push(bar3);

    // const defaultBar = new DefaultBar(520, 1000, 1000, this);  
    // const defaultBar = new DefaultBar(520, 1300, 1300, this);  

    // defaultBar.bar.displayWidth = 20;
    // defaultBar.bar.displayHeight = 300;

    // const grabBar = new HorizontalGrabBar(520, 520, 1260, this);
    // this.grabBarsGroup.push(grabBar);




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
