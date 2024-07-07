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
  }

  handleOverlap(ball, otherWarp, warpZone) {
    if (warpZone.isCooldown) return; // Ignora se estiver em cooldown

    console.log('overlap warp!!')
    warpZone.startCooldown();

    ball.ball.setVelocity(0);
    ball.ball.alpha = 0;

    // Posicao aonde a outra bola vai aparecer
    // ball.ball.setPosition(otherWarp.x + otherWarp.warp.displayWidth / 2, otherWarp.y);
    ball.ball.setPosition(otherWarp.x - otherWarp.warp.displayWidth / 4, otherWarp.y + otherWarp.warp.displayHeight / 4);
    console.log(otherWarp.x + 0)
    // ball.ball.setPosition(otherWarp.x - otherWarp.warp.width/2, otherWarp.y);
    // console.log(otherWarp.warp.displayWidth / 2)

    setTimeout(() => {
      ball.ball.alpha = 1;
      ball.moveBall();
    }, 100)
  }
}
