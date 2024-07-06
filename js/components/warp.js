class Warp {
  constructor(x, y, scene) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.warp = this.scene.physics.add.image(this.x, this.y, "warp");
    this.warp.displayWidth = 50;
    this.warp.displayHeight = this.warp.displayWidth;
    this.warp.setOrigin(0, 0);
    this.warp.setImmovable();
    // this.warp.setSize(10, 300);

    // Define o corpo de colisão como um círculo
    let warpWidth = this.warp.width * 0.6;
    let warpHeight = this.warp.width * 0.6;

    let radius = Math.min(warpWidth, warpHeight) / 2;
    this.warp.body.setCircle(radius);

    // Mexer nesses valores para posicionar a área de colisão
    this.warp.body.setOffset(30, 30)
    // this.warp.body.

    // Ajusta a posição do círculo para centralizá-lo
    // this.warp.body.setOffset(0, 0); // Ajuste necessário para centralizar
    // this.warp.body.setOffset((warpWidth / 2) - radius, (warpHeight / 2) - radius);

    // this.scene.physics.add.overlap(
    //   this.scene.ball.ball,
    //   this.warp,
    //   this.handleOverlap,
    //   null,
    //   this.scene
    // );
  }

  handleOverlap(ball, otherWarp) {
    ball.ball.setVelocity(0);
    ball.ball.alpha = 0;
    ball.ball.setPosition(otherWarp.x + otherWarp.warp.displayWidth / 2, otherWarp.y);

    setTimeout(() => {
      ball.ball.alpha = 1;
      ball.moveBall();
    }, 100)
  }
}
