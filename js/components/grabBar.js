class GrabBar {
  constructor(x, initialY, finalY, scene, speed = 2000) {
    this.scene = scene;
    this.x = x;
    this.y = initialY;
    this.finalY = finalY;
    this.speed = speed;
    this.collision;
    this.collisionDifference = 0;
    this.ballCollision = false;

    this.bar = this.scene.physics.add.image(this.x, this.y, "grabBar");
    this.bar.displayWidth = 30;
    this.bar.displayHeight = 200;
    this.bar.setOrigin(0, 0);
    this.bar.setImmovable();
    // this.bar.setSize(10, 300); // Define a área de colisão da barra

    // Animação da barra
    this.scene.tweens.add({
      targets: this.bar,
      y: this.finalY, // Altura final
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
  }

  addCollision = () => {
    this.collision = this.scene.physics.add.collider(
      this.scene.ball,
      this.bar,
      this.grabBall,
      null,
      this.scene
    );
  };
  // addCollision = () => {
  //   this.scene.physics.add.overlap(
  //     this.scene.ball,
  //     this.bar,
  //     this.grabBall,
  //     null,
  //     this.scene
  //   );
  // };

  disableCollision() {
    this.bar.body.checkCollision.none = true;
  }

  enableCollision() {
    // this.bar.body.checkCollision.none = false;
    // this.bar.body.checkCollision.left = false;
    // this.bar.body.checkCollision.right = false;
    console.log("oi")
  }

  grabBall = () => {
    if (!this.ballCollision) {

      console.log(this.bar)
      // pra mudar a direção da bola depois que desgrudar
      this.scene.ball.vx *= -1;

      // this.scene.moveBall();

      this.ballCollision = true;
      this.scene.stopBall();
      // this.disableCollision();
      // this.collision.destroy();

      // calcula a diferença entre o y da barra e o y da bola na hora da colisão
      this.collisionDifference = this.scene.ball.y - this.bar.y;
    }
  };

  updateBallPosition = () => {
    // A posição aqui varia se a bola bater no lado esquerdo ou direito da barra
    if (this.scene.ball.x < this.bar.x) {
      // esquerda
      this.scene.ball.x = this.bar.x - this.scene.ball.displayWidth;
    } else {
      // direita
      this.scene.ball.x = this.bar.x + this.bar.displayWidth;
    }

    this.scene.ball.y = this.bar.y + this.collisionDifference - (this.scene.ball.displayHeight / 2);
  };
}
