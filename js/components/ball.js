class Ball {
  constructor(scene) {
    this.scene = scene;

    this.ballInitialPosition = [game.config.width / 2, game.config.height - 40];
    this.ball = this.scene.physics.add.image(...this.ballInitialPosition, "ball");
    this.ball.displayWidth = 40;
    this.ball.displayHeight = this.ball.displayWidth;
    this.ball.speed = 800;
    this.ball.vx = this.ball.speed;
    this.ball.vy = -this.ball.speed;
    this.ball.setCircle(80); // Define a área de colisão da bola
    this.ball.setOrigin(0, 0);
  }

  moveBall = () => {
    // Para tirar a colisão das Grab Bars
    if (this.scene.grabBarsGroup?.length > 0) {
      this.scene.grabBarsGroup.forEach((bar) => {
        bar.ballCollision = false;
      })
    }

    // this.ball.setVelocity(this.ball.vx, -this.ball.vy);
    this.ball.setVelocity(this.ball.vx, this.ball.vy);
  };

  stopBall = () => {
    this.ball.setVelocity(0, 0);
  };

  restoreBallInitialPosition() {
    this.scene.grabBarsGroup.forEach((bar) => bar.numberOfThrows = 0);

    this.ball.setPosition(...this.ballInitialPosition);
    // Restaura a velocidade inicial (caso uma das duas estivesse negativa quando saiu da tela)
    this.ball.vx = Math.abs(this.ball.speed);
    this.ball.vy = -this.ball.speed;
    this.stopBall();
  }
}