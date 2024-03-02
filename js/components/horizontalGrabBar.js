class HorizontalGrabBar {
  constructor(x, finalX, y, scene, speed = 2000) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.finalX = finalX;
    this.speed = speed;
    this.collision;
    this.collisionDifference = 0;
    this.ballCollision = false;

    this.bar = this.scene.physics.add.image(this.x, this.y, "grabBar");
    this.bar.displayWidth = 200;
    this.bar.displayHeight = 30;
    this.bar.setOrigin(0, 0);
    this.bar.setImmovable();
    // this.bar.setSize(10, 300); // Define a área de colisão da barra

    // Animação da barra
    this.scene.tweens.add({
      targets: this.bar,
      x: this.finalX,
      duration: this.speed,
      ease: "Linear",
      yoyo: true, // Repetir de volta para cima
      repeat: -1,
      onUpdate: () => {
        // Chama o método updateBallPosition() sempre que a posição da barra for atualizada
        if (this.ballCollision) {
          this.updateBallPosition();
        }
      },
    });

    // Adiciona colisão entre a bola e a barra
    this.addCollision();
    // console.log("-----Scene Ball------", this.scene.ball.ball)
  }

  addCollision = () => {
    this.collision = this.scene.physics.add.collider(
      this.scene.ball.ball,
      this.bar,
      this.grabBall,
      null,
      this.scene
    );
  };

  grabBall = () => {
    if (!this.ballCollision) {

      // pra mudar a direção da bola depois que desgrudar
      this.scene.ball.ball.vx *= -1;

      // this.scene.moveBall();

      this.ballCollision = true;
      this.scene.ball.stopBall();
      // this.collision.destroy();

      // calcula a diferença entre o y da barra e o y da bola na hora da colisão
      this.collisionDifference = this.scene.ball.ball.x - this.bar.x;
    }
  };

  updateBallPosition = () => {
    // A posição aqui varia se a bola bater no lado esquerdo ou direito da barra
    // if (this.scene.ball.ball.x < this.bar.x) {
    //   // esquerda
    //   this.scene.ball.ball.x = this.bar.x - this.scene.ball.ball.displayWidth;
    // } else {
    //   // direita
    //   this.scene.ball.ball.x = this.bar.x + this.bar.displayWidth;
    // }

    this.scene.ball.ball.y = this.bar.y;

    this.scene.ball.ball.x = this.bar.x + this.collisionDifference - (this.scene.ball.ball.displayHeight / 2);
  };
}
