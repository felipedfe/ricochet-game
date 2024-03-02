class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
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

    // Bola
    // this.ballInitialPosition = [game.config.width / 2, game.config.height - 40];

    // this.ball = this.physics.add.image(...this.ballInitialPosition, "ball");
    // this.ball.displayWidth = 40;
    // this.ball.displayHeight = this.ball.displayWidth;
    // this.ball.speed = 800;
    // this.ball.vx = this.ball.speed;
    // this.ball.vy = this.ball.speed;
    // this.ball.setCircle(80); // Define a área de colisão da bola
    // this.ball.setOrigin(0, 0);
    // this.ball.setCollideWorldBounds(true);

    // Buraco
    const hole = new Hole(150, 0, this);

    // Grupo das grabBars
    this.grabBarsGroup = [];

    // const bar2 = new GrabBar(650, 1000, 1000, this);
    const bar3 = new GrabBar(100, 0, 1100, this);
    const bar1 = new DefaultBar(500, 150, 150, this);
    // const bar5 = new DefaultBar(600, 1111, 1111, this);
    const bar4 = new GrabBar(600, 700, 1100, this);

    this.grabBarsGroup.push(bar3, bar4);

    // Evento de clique
    this.input.on("pointerdown", this.ball.moveBall);
    this.input.keyboard.on('keydown-SPACE', this.ball.moveBall);

    //// fim da create ////
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
