class DefaultBar {
  constructor(x, initialY, finalY, scene, speed = 2000) {
    this.scene = scene;
    this.x = x;
    this.y = initialY;
    this.finalY = finalY;
    this.speed = speed;

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
    });

    // Colisão entre a bola e a barra
    this.scene.physics.add.collider(
      this.scene.ball,
      this.bar,
      this.changeDirection,
      null,
      this.scene
    );
  }

  changeDirection = () => {
    this.scene.ball.vx *= -1;

    if (this.scene.ball.y > this.bar.y + this.bar.displayHeight - 10) { // numero magico
      this.scene.ball.vx *= -1;
      this.scene.ball.vy *= -1;
      
      console.log("ball: ", this.scene.ball.y)
      console.log("bar: ",this.bar.y + this.bar.displayHeight - 10)
    }
    
    this.scene.moveBall();
  };
}
