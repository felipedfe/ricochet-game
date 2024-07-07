class WarpZone {
  constructor(x1, y1, x2, y2, scene) {
    this.scene = scene;
    this.ball = this.scene.ball;
    this.cooldownDuration = 500;
    this.isCooldown = false;

    this.warp1 = new Warp(x1, y1, scene);
    this.warp2 = new Warp(x2, y2, scene);

    // Adiciona overlap entre a bola e os warps
    this.scene.physics.add.overlap(
      this.ball.ball,
      this.warp1.warp,
      () => this.warp1.handleOverlap(this.ball, this.warp2, this), null, this);

    this.scene.physics.add.overlap(
      this.ball.ball,
      this.warp2.warp,
      () => this.warp2.handleOverlap(this.ball, this.warp1, this), null, this);
  }

  startCooldown() {
    this.isCooldown = true;
    this.scene.time.addEvent({
      delay: this.cooldownDuration,
      callback: () => {
        this.isCooldown = false;
      },
      callbackScope: this
    });
  }
}
