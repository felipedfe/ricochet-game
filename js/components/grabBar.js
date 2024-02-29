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

    this.bar = this.scene.physics.add.image(this.x, this.y, "defaultBar");
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

    // Colisão entre a bola e a barra
    this.collision = this.scene.physics.add.collider(
      this.scene.ball,
      this.bar,
      this.changeDirection,
      null,
      this.scene
    );
  }

  changeDirection = () => {
    this.scene.ball.vx *= -1;

    this.scene.moveBall();

    this.ballCollision = true;
    this.scene.stopBall();
    this.collision.destroy();

    this.collisionDifference = this.scene.ball.y - this.bar.y;
  };

  updateBallPosition = () => {
    this.scene.ball.x = this.bar.x + this.bar.displayWidth;
    this.scene.ball.y = this.bar.y + this.collisionDifference - (this.scene.ball.displayHeight / 2);
  };
}
