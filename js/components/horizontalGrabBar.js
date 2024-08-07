class HorizontalGrabBar {
  static lastId = 0; // Variável estática para manter o ID da última barra criada

  constructor(x, finalX, y, scene, options = {}) {
    this.id = HorizontalGrabBar.generateId();
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.finalX = finalX;

    const {
      speed = 2000,
    } = options;

    this.speed = speed;
    this.collision;
    this.collisionDifference = 0;
    this.ballCollision = false;

    this.bar = this.scene.physics.add.image(this.x, this.y, "grabBar");
    this.bar.displayWidth = 200;
    this.bar.displayHeight = 30;
    this.bar.setOrigin(0, 0);
    this.bar.setImmovable();

    let proportionWidth = this.bar.displayHeight * 1.5; // 80% da largura do this.bar
    let proportionHeight = this.bar.displayWidth * 1.; // 80% da altura do this.bar
    this.bar.setSize(proportionWidth, proportionHeight);

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
  }

  static generateId() {
    return ++GrabBar.lastId; // Incrementa e retorna o novo ID
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
    const ballObject = this.scene.ball;
    ballObject.collidedBarId = this.id;

    if (!this.ballCollision) {

      // pra mudar a direção da bola depois que desgrudar
      this.scene.ball.ball.vx *= 1;
      this.scene.ball.ball.vy *= -1;

      this.ballCollision = true;
      this.scene.ball.stopBall();

      // calcula a diferença entre o y da barra e o y da bola na hora da colisão
      this.collisionDifference = this.scene.ball.ball.x - this.bar.x;
    }

    // Para ricochetear para outro lado caso a bola bata ao lado da barra
    if (this.scene.ball.ball.x < this.bar.x - 10 ||
      this.scene.ball.ball.x > this.bar.x + this.bar.displayWidth - 10) // numero magico
    {
      this.scene.ball.ball.vx *= -1;
      this.scene.ball.ball.vy *= -1;

      this.scene.ball.moveBall();
    }

    console.log(this.id)
  };

  updateBallPosition = () => {
    // A posição aqui varia se a bola bater acima ou abaxo da barra
    if (this.scene.ball.ball.y < this.bar.y) {
      // acima
      this.scene.ball.ball.y = this.bar.y - this.scene.ball.ball.displayHeight;
    } else {
      // abaixo
      this.scene.ball.ball.y = this.bar.y + this.bar.displayHeight;
    }

    this.scene.ball.ball.x = this.bar.x + this.collisionDifference + (this.scene.ball.ball.displayWidth / 4);
  };
}
