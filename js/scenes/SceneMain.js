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
    this.ballInitialPosition = [game.config.width / 2, game.config.height - 40];

    this.ball = this.physics.add.image(...this.ballInitialPosition, "ball");
    this.ball.displayWidth = 40;
    this.ball.displayHeight = this.ball.displayWidth;
    this.ball.speed = 800;
    this.ball.vx = this.ball.speed;
    this.ball.vy = this.ball.speed;
    this.ball.setCircle(80); // Define a área de colisão da bola
    this.ball.setOrigin(0, 0);
    // this.ball.setCollideWorldBounds(true);

    this.bar2 = new GrabBar(600, 1000, 1000, this);
    this.bar3 = new GrabBar(100, 400, 700, this);
    this.bar1 = new DefaultBar(700, 900, 900, this);

    // Evento de clique
    this.input.on("pointerdown", this.moveBall);

    //// fim da create ////
  }

  moveBall = () => {
    if (this.bar3) {
      this.bar3.ballCollision = false;
    }
    if (this.bar2) {
      this.bar2.ballCollision = false;
    }

    this.ball.setVelocity(this.ball.vx, -this.ball.vy);
  };

  stopBall = () => {
    this.ball.setVelocity(0, 0);
  };

  restoreBallInitialPosition() {
    this.ball.setPosition(...this.ballInitialPosition);
    // Restaura a velocidade inicial (caso uma das duas estivesse negativa quando saiu da tela)
    this.ball.vx = Math.abs(this.ball.speed);
    this.ball.vy = Math.abs(this.ball.speed);
    this.stopBall();
  }

  update() {
    // Verifica se a bola saiu da tela para a esquerda ou para a direita
    if (this.ball.x < 0 || this.ball.x > game.config.width) {
      this.restoreBallInitialPosition();
    }

    // Verifica se a bola saiu da tela para cima ou para baixo
    if (this.ball.y < 0 || this.ball.y > game.config.height) {
      this.restoreBallInitialPosition();
    }
  }
}
