class GrabBar {
  static lastId = 0; // Variável estática para manter o ID da última barra criada

  constructor(x, initialY, finalY, scene, speed = 2000, lockThrowingDirection = false) {
    this.id = GrabBar.generateId();
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

    let proportionWidth = this.bar.displayWidth * 1.1; // 80% da largura do this.bar
    let proportionHeight = this.bar.displayHeight * 1.35; // 80% da altura do this.bar
    this.bar.setSize(proportionWidth, proportionHeight);

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
      this.scene.ball.ball.vx *= -1;

      this.numberOfThrows += 1;
      if (this.numberOfThrows > 1) {
        this.scene.ball.ball.vy *= -1;
      }

      this.ballCollision = true;
      this.scene.ball.stopBall();
      // this.collision.destroy();

      // calcula a diferença entre o y da barra e o y da bola na hora da colisão (offset se refere à caixa de colisão)
      this.collisionDifference = this.scene.ball.ball.y - (this.bar.y - this.bar.body.offset.y);
      console.log("colision diference: ", this.collisionDifference)

      console.log("---->", this.scene.ball.collidedBarId)
    }

    // Para ricochetear para outro lado caso a bola bata embaixo da barra
    // if (this.scene.ball.ball.y > this.bar.y + this.bar.displayHeight - 10) { // numero magico
    //   this.scene.ball.ball.vx *= -1;
    //   this.scene.ball.ball.vy *= -1;

    //   this.scene.ball.moveBall();
    // }

    // Para ricochetear para outro lado caso a bola bata EMBAIXO da barra
    let barCollisionBottom = this.bar.y + this.bar.displayHeight - this.bar.body.offset.y;

    // Verifica se a bola está se movendo para baixo e bate EMBAIXO da barra
    console.log((this.scene.ball.ball.y) > barCollisionBottom)
    console.log(this.scene.ball.ball.y)
    console.log(this.bar.body.offset.y)
    console.log(barCollisionBottom)
    if (
      // this.scene.ball.ball.vy > 0 &&
      (this.scene.ball.ball.y) > barCollisionBottom &&
      !this.scene.ball.isColliding) {

      this.scene.ball.isColliding = true; // Marca a bola como colidindo
      this.scene.ball.ball.vx *= -1;
      this.scene.ball.ball.vy *= -1;

      // Log para debugging
      console.log("Ricochete na parte inferior da barra:", this.scene.ball.ball.y, "Fundo da barra:", barCollisionBottom);
      this.scene.ball.moveBall();

      // Resetar o estado de colisão após um pequeno atraso
      setTimeout(() => {
        this.scene.ball.isColliding = false;
      }, 100); // 100 milissegundos para evitar colisões repetidas
    }

    console.log(this.id)

    // Para ricochetear para outro lado caso a bola bata EM CIMA da barra

    // Offset se refere à posicao da área de colisão
    let barCollisionTop = this.bar.y + this.bar.body.offset.y;

    // Verifica se a bola bate EM CIMA da barra
    if (this.scene.ball.ball.vy < 0 &&
      (
        this.scene.ball.ball.y
        + this.scene.ball.ball.displayHeight
      ) < barCollisionTop
      && !this.scene.ball.isColliding) {
      this.scene.ball.isColliding = true; // Marca a bola como colidindo
      this.scene.ball.ball.vx *= -1;
      this.scene.ball.ball.vy *= -1;

      this.scene.ball.moveBall();


      // Resetar o estado de colisão após um pequeno atraso
      setTimeout(() => {
        this.scene.ball.isColliding = false;
      }, 100); // 100 milissegundos para evitar colisões repetidas

      console.log("Ricochete na parte superior da barra:", this.scene.ball.ball.y + this.scene.ball.ball.displayHeight, "Topo da barra:", barCollisionTop);
    }
    console.log(this.scene.ball.ball.vy)
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
