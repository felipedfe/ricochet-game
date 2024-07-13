// class GrabBar {
//   static lastId = 0; // Variável estática para manter o ID da última barra criada

//   constructor(x, initialY, finalY, scene, options = {}) {
//     this.id = GrabBar.generateId();
//     this.scene = scene;
//     this.x = x;
//     this.y = initialY;
//     this.finalY = finalY;

//     const {
//       speed = 2000,
//       lockThrowingDirection = false,
//       ricochetLeft = false,
//       ricochetRight = false,
//     } = options;

//     this.speed = speed;
//     this.collision;
//     this.collisionDifference = 0;
//     this.ballCollision = false;
//     this.lockThrowingDirection = lockThrowingDirection;
//     this.numberOfThrows = 0;
//     this.ricochetLeft = ricochetLeft;
//     this.ricochetRight = ricochetRight;

//     this.bar = this.scene.physics.add.image(this.x, this.y, "grabBar");
//     this.bar.displayWidth = 30;
//     this.bar.displayHeight = 200;
//     this.bar.setOrigin(0, 0);
//     this.bar.setImmovable();

//     let proportionWidth = this.bar.width * 0.7;
//     let proportionHeight = this.bar.height * 0.9;
//     this.bar.setSize(proportionWidth, proportionHeight);

//     // Animação da barra
//     this.scene.tweens.add({
//       targets: this.bar,
//       y: this.finalY, // Altura final
//       duration: this.speed,
//       ease: "Linear",
//       yoyo: true, // Repetir de volta para cima
//       repeat: -1,
//       onUpdate: () => {
//         // Chama o método updateBallPosition() sempre que a posição da barra for atualizada
//         if (this.ballCollision) {
//           this.updateBallPosition();
//         }
//       },
//     });

//     // Adiciona colisão entre a bola e a barra
//     this.addCollision();

//     this.ball = this.scene.ball.ball;
//   }

//   static generateId() {
//     return ++GrabBar.lastId; // Incrementa e retorna o novo ID
//   }

//   addCollision = () => {
//     this.collision = this.scene.physics.add.collider(
//       this.scene.ball.ball,
//       this.bar,
//       this.grabBall,
//       null,
//       this.scene
//     );
//   };

//   grabBall = () => {
//     console.log('tem ser false', this.ball.x + this.ball.displayWidth / 2 < this.bar.x)

//     const ballObject = this.scene.ball;
//     ballObject.collidedBarId = this.id;

//     if (!this.ballCollision) {

//       // pra mudar a direção da bola depois que desgrudar
//       this.ball.vx *= -1;

//       this.numberOfThrows += 1;
//       if (this.numberOfThrows > 1 && this.lockThrowingDirection) {
//         this.ball.vy *= -1;
//       }

//       this.ballCollision = true;

//       this.scene.ball.stopBall();

//       // calcula a diferença entre o y da barra e o y da bola na hora da colisão (offset se refere à caixa de colisão)
//       this.collisionDifference = this.ball.y - this.bar.y + this.ball.displayHeight / 2;
//     }

//     // Para ricochetear para outro lado caso a bola bata EMBAIXO da barra
//     let barCollisionBottom = this.bar.y + this.bar.displayHeight - this.bar.body.offset.y;

//     if (this.ball.y > barCollisionBottom &&
//       !this.scene.ball.isColliding) {

//       this.scene.ball.isColliding = true; // Marca a bola como colidindo
//       this.ball.vx *= -1;
//       this.ball.vy *= -1;

//       // Log para debugging
//       console.log("Ricochete na parte inferior da barra:", this.ball.y, "Fundo da barra:", barCollisionBottom);
//       this.scene.ball.moveBall();

//       // Resetar o estado de colisão após um pequeno atraso
//       setTimeout(() => {
//         this.scene.ball.isColliding = false;
//       }, 100); // 100 milissegundos para evitar colisões repetidas
//     }

//     // Para ricochetear para outro lado caso a bola bata EM CIMA da barra

//     // Offset se refere à posicao da área de colisão
//     let barCollisionTop = this.bar.y + this.bar.body.offset.y;

//     if (
//       // this.ball.vy < 0 &&
//       (
//         this.ball.y
//         + this.ball.displayHeight
//       ) < barCollisionTop
//       && !this.scene.ball.isColliding) {

//       this.scene.ball.isColliding = true; // Marca a bola como colidindo
//       this.ball.vx *= -1;
//       this.ball.vy *= -1;

//       // Resetar o estado de colisão após um pequeno atraso
//       setTimeout(() => {
//         this.scene.ball.isColliding = false;
//       }, 100); // 100 milissegundos para evitar colisões repetidas

//       console.log("Ricochete na parte superior da barra:", this.ball.y + this.ball.displayHeight, "Topo da barra:", barCollisionTop);
//       this.scene.ball.moveBall();
//     }

//     // Ricocheteia se atinge o lado esquerdo
//     if (this.ricochetRight && this.ball.x > (this.bar.x + this.bar.body.offset.x)) {
//       console.log('HIT RIGHT')
//       this.scene.ball.moveBall();
//     }

//     // Ricocheteia se atinge o lado direito
//     if (this.ricochetLeft && this.ball.x < this.bar.x) {
//       console.log('HIT LEFT!')
//       this.scene.ball.moveBall();
//     }
//   };

//   updateBallPosition = () => {
//     // A posição aqui varia se a bola bater no lado esquerdo ou direito da barra
//     // console.log(this.ball.x + this.ball.displayWidth / 2 < this.bar.x)
//     // console.log(this.ball.x, '/', this.bar.x)
//     // console.log(this.ball.x + this.ball.displayWidth / 2)
//     // console.log('tem ser false', this.ball.x + this.ball.displayWidth / 2 < this.bar.x)

//     if ((this.ball.x + this.ball.displayWidth / 2 < this.bar.x) && (this.ball.y + this.ball.displayHeight > this.bar.y)) {
//       // console.log('---------------------------------------------------------------------------------------------left')
//       // console.log("pppppp",this.ball.body.velocity.x > 0)
//       // console.log("qqqqqq",this.ball.body.velocity.x)
//       // esquerda
//       // if (this.ricochetLeft) {
//       //   console.log('left')
//       //   this.scene.ball.moveBall();
//       // } else {
//       this.ball.x = this.bar.x - this.ball.displayWidth;
//       // console.log('right')

//       // }
//     } else {
//       // direita
//       this.ball.x = this.bar.x + this.bar.displayWidth;
//       // this.scene.ball.moveBall();
//     }

//     // console.log("--------------->", this.ball.x + this.ball.displayWidth / 2 < this.bar.x)
//     // console.log(this.ball.x + this.ball.displayWidth / 2, '/', this.bar.x)
//     this.ball.y = this.bar.y + this.collisionDifference - (this.ball.displayHeight / 2);

//   };

//   // updateBallPosition = () => {
//   //   // confere se bola bate a direita ou esquerda da barra

//   //   // Centro x da bola
//   //   let ballCenterX = this.ball.x + this.ball.displayWidth / 2;

//   //   // Centro x da barra
//   //   let barCenterX = this.bar.x + this.bar.displayWidth / 2;

//   //   if (ballCenterX < barCenterX) {
//   //     if (this.ball.body.velocity.x > 0) {
//   //       // Bola está se movendo para a direita e bateu na esquerda da barra
//   //       console.log("A bola bateu na esquerda da barra.");
//   //     } else {
//   //       // Bola está se movendo para a esquerda e passou pelo lado direito antes de colidir
//   //       console.log("A bola passou pelo lado direito antes de bater na esquerda.");
//   //     }
//   //   } else {
//   //     if (this.ball.body.velocity.x > 0) {
//   //       // Bola está se movendo para a direita e passou pelo lado esquerdo antes de colidir
//   //       console.log("A bola passou pelo lado esquerdo antes de bater na direita.");
//   //     } else {
//   //       // Bola está se movendo para a esquerda e bateu na direita da barra
//   //       console.log("A bola bateu na direita da barra.");
//   //     }
//   //   }

//   //   // if (this.ball.x + this.ball.displayWidth / 2 < this.bar.x) {
//   //   //   this.ball.x = this.bar.x - this.ball.displayWidth;
//   //   // } else {
//   //   //   this.ball.x = this.bar.x + this.bar.displayWidth;
//   //   // }

//   //   this.ball.y = this.bar.y + this.collisionDifference - (this.ball.displayHeight / 2);
//   // };

// }



class GrabBar {
  static lastId = 0; // Variável estática para manter o ID da última barra criada

  constructor(x, initialY, finalY, scene, options = {}) {
    this.id = GrabBar.generateId();
    this.scene = scene;
    this.x = x;
    this.y = initialY;
    this.finalY = finalY;

    const {
      speed = 2000,
      lockThrowingDirection = false,
      ricochetLeft = false,
      ricochetRight = false,
    } = options;

    this.speed = speed;
    this.collision;
    this.collisionDifference = 0;
    this.ballCollision = false;
    this.lockThrowingDirection = lockThrowingDirection;
    this.numberOfThrows = 0;
    this.ricochetLeft = ricochetLeft;
    this.ricochetRight = ricochetRight;

    this.bar = this.scene.physics.add.image(this.x, this.y, "grabBar");
    this.bar.displayWidth = 30;
    this.bar.displayHeight = 200;
    this.bar.setOrigin(0, 0);
    this.bar.setImmovable();

    let proportionWidth = this.bar.width * 0.7;
    let proportionHeight = this.bar.height * 0.9;
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

    this.ball = this.scene.ball.ball;
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

  checkCollisionBottom = () => {
    let barCollisionBottom = this.bar.y + this.bar.displayHeight - this.bar.body.offset.y;
    if (this.ball.y > barCollisionBottom && !this.scene.ball.isColliding) {
      this.scene.ball.isColliding = true; // Marca a bola como colidindo
      this.ball.vx *= -1;
      this.ball.vy *= -1;

      // Log para debugging
      console.log("Ricochete na parte inferior da barra:", this.ball.y, "Fundo da barra:", barCollisionBottom);
      this.scene.ball.moveBall();

      // Resetar o estado de colisão após um pequeno atraso
      setTimeout(() => {
        this.scene.ball.isColliding = false;
      }, 100); // 100 milissegundos para evitar colisões repetidas
      return true;
    }
    return false;
  };

  checkCollisionTop = () => {
    let barCollisionTop = this.bar.y + this.bar.body.offset.y;
    if (this.ball.y + this.ball.displayHeight < barCollisionTop && !this.scene.ball.isColliding) {
      this.scene.ball.isColliding = true; // Marca a bola como colidindo
      this.ball.vx *= -1;
      this.ball.vy *= -1;

      // Resetar o estado de colisão após um pequeno atraso
      setTimeout(() => {
        this.scene.ball.isColliding = false;
      }, 100); // 100 milissegundos para evitar colisões repetidas

      console.log("Ricochete na parte superior da barra:", this.ball.y + this.ball.displayHeight, "Topo da barra:", barCollisionTop);
      this.scene.ball.moveBall();
      return true;
    }
    return false;
  };

  checkCollisionLeft = () => {
    if (this.ricochetLeft && this.ball.x < this.bar.x) {
      console.log('HIT LEFT!')
      this.scene.ball.moveBall();
      return true;
    }
    return false;
  };

  checkCollisionRight = () => {
    if (this.ricochetRight && this.ball.x > (this.bar.x + this.bar.body.offset.x)) {
      console.log('HIT RIGHT')
      this.scene.ball.moveBall();
      return true;
    }
    return false;
  };

  grabBall = () => {
    console.log('tem ser false', this.ball.x + this.ball.displayWidth / 2 < this.bar.x)

    const ballObject = this.scene.ball;
    ballObject.collidedBarId = this.id;

    if (!this.ballCollision) {
      // pra mudar a direção da bola depois que desgrudar
      this.ball.vx *= -1;

      this.numberOfThrows += 1;
      if (this.numberOfThrows > 1 && this.lockThrowingDirection) {
        this.ball.vy *= -1;
      }

      this.ballCollision = true;

      this.scene.ball.stopBall();

      // calcula a diferença entre o y da barra e o y da bola na hora da colisão (offset se refere à caixa de colisão)
      this.collisionDifference = this.ball.y - this.bar.y + this.ball.displayHeight / 2;
    }

    const collisionBottom = this.checkCollisionBottom();
    const collisionTop = this.checkCollisionTop();
    const collisionLeft = this.checkCollisionLeft();
    const collisionRight = this.checkCollisionRight();

    if (!collisionBottom && !collisionTop && !collisionLeft && !collisionRight) {
      this.scene.ball.stopBall();
    }
  };

  updateBallPosition = () => {
    if ((this.ball.x + this.ball.displayWidth / 2 < this.bar.x) && (this.ball.y + this.ball.displayHeight > this.bar.y)) {
      this.ball.x = this.bar.x - this.ball.displayWidth;
    } else {
      this.ball.x = this.bar.x + this.bar.displayWidth;
    }
    this.ball.y = this.bar.y + this.collisionDifference - (this.ball.displayHeight / 2);
  };
}

