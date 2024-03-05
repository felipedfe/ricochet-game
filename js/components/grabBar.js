class GrabBar {
  constructor(x, initialY, finalY, scene, speed = 2000, lockThrowingDirection = false) {
    this.scene = scene;
    this.x = x;
    this.y = initialY;
    this.finalY = finalY;
    this.speed = speed;
    this.collision;
    this.collisionDifference = 0;
    this.ballCollision = false;
    this.lockThrowingDirection = lockThrowingDirection;
    this.numberOfThrows = 0;

    this.bar = this.scene.physics.add.image(this.x, this.y, "grabBar");
    this.bar.displayWidth = 30;
    this.bar.displayHeight = 200;
    this.bar.setOrigin(0, 0);
    this.bar.setImmovable();
    // this.bar.setSize(45, 200); // Define a área de colisão da barra

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

      this.numberOfThrows += 1;
      if (this.numberOfThrows > 1) {
        this.scene.ball.ball.vy *= -1;
      }

      // this.scene.moveBall();

      this.ballCollision = true;
      this.scene.ball.stopBall();
      // this.collision.destroy();

      // calcula a diferença entre o y da barra e o y da bola na hora da colisão
      this.collisionDifference = this.scene.ball.ball.y - this.bar.y;
    }

    // Para ricochetear para outro lado caso a bola bata embaixo da barra
    if (this.scene.ball.ball.y > this.bar.y + this.bar.displayHeight - 10) { // numero magico
      this.scene.ball.ball.vx *= -1;
      this.scene.ball.ball.vy *= -1;

      this.scene.ball.moveBall();
    }
  };

  updateBallPosition = () => {
    // A posição aqui varia se a bola bater no lado esquerdo ou direito da barra
    if (this.scene.ball.ball.x < this.bar.x) {
      // esquerda
      this.scene.ball.ball.x = this.bar.x - this.scene.ball.ball.displayWidth;
    } else {
      // direita
      this.scene.ball.ball.x = this.bar.x + this.bar.displayWidth;
    }

    this.scene.ball.ball.y = this.bar.y + this.collisionDifference - (this.scene.ball.ball.displayHeight / 2);
  };
}
