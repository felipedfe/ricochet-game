class DefaultBar2 {
  static lastId = 0; // Variável estática para manter o ID da última barra criada

  constructor(x, initialY, finalY, scene, options = {}) {
    this.scene = scene;
    this.x = x;
    this.y = initialY;
    this.finalY = finalY;

    // Define valores padrão para options e desestrutura os valores fornecidos
    const {
      speed = 2000,
      orientation = 'vert',
      tileWidth = 30,
      tileHeight = 200,
    } = options;

    this.speed = speed;
    this.orientation = orientation;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;

    if (orientation === 'hor') {
      this.tileWidth = tileHeight;
      this.tileHeight = tileWidth;
    }

    // Usar TileSprite em vez de um sprite comum
    this.bar = this.scene.add.tileSprite(this.x, this.y, this.tileWidth, this.tileHeight, 'tile-bar'); // Alteração
    this.scene.physics.add.existing(this.bar);
    this.bar.setOrigin(0, 0);
    this.bar.body.setImmovable(true);

    let proportionWidth = this.bar.width * 0.7;
    let proportionHeight = this.bar.height * 0.95;

    if (orientation === 'hor') {
      proportionWidth = this.bar.width * 0.95;
      proportionHeight = this.bar.height * 0.7;
    }
    // this.bar.setSize(proportionWidth, proportionHeight, true);
    this.bar.body.setSize(proportionWidth, proportionHeight);
    console.log("-------", this.bar)

    // Animação da barra
    this.scene.tweens.add({
      targets: this.bar,
      y: this.finalY,
      duration: this.speed,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });

    // Colisão entre a bola e a barra
    this.scene.physics.add.collider(
      this.scene.ball.ball,
      this.bar,
      this.changeDirection,
      null,
      this.scene
    );
  }

  changeDirection = () => {
    console.log("-_-_->", this.scene.ball.ball.body.velocity.x)
    this.scene.ball.ball.vx *= -1;

    // Para ricochetear para outro lado caso a bola bata EMBAIXO da barra
    let barCollisionBottom = this.bar.y + this.bar.displayHeight - this.bar.body.offset.y;

    if (
      (this.scene.ball.ball.y) > barCollisionBottom &&
      !this.scene.ball.isColliding) {

      this.scene.ball.isColliding = true;
      this.scene.ball.ball.vx *= -1;
      this.scene.ball.ball.vy *= -1;

      setTimeout(() => {
        this.scene.ball.isColliding = false;
      }, 100);
    }

    let barCollisionTop = this.bar.y + this.bar.body.offset.y;

    if (
      (this.scene.ball.ball.y + this.scene.ball.ball.displayHeight) < barCollisionTop &&
      !this.scene.ball.isColliding) {
      this.scene.ball.isColliding = true;
      this.scene.ball.ball.vx *= -1;
      this.scene.ball.ball.vy *= -1;

      setTimeout(() => {
        this.scene.ball.isColliding = false;
      }, 100);

      console.log("Ricochete na parte superior da barra:", this.scene.ball.ball.y + this.scene.ball.ball.displayHeight, "Topo da barra:", barCollisionTop);
    }
    console.log(this.scene.ball.ball.vy)

    this.scene.ball.moveBall();
  };
}


