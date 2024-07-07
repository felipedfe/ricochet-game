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
    // this.bar.setSize(45, 200); // Define a área de colisão da barra

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

  grabBall = () => {
    // console.log(this.ball.x + this.ball.displayWidth / 2 < this.bar.x)
    // console.log(this.ball.x + this.ball.displayWidth / 2, '/', this.bar.x)
    // console.log(this.ball.x + this.ball.displayWidth / 2)
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
      // console.log("qqqqqq", this.ball.body.velocity.x)
      this.scene.ball.stopBall();
      // this.collision.destroy();

      // calcula a diferença entre o y da barra e o y da bola na hora da colisão (offset se refere à caixa de colisão)
      this.collisionDifference = this.ball.y - this.bar.y + this.ball.displayHeight / 2;
      // console.log("colision diference: ", this.collisionDifference)

      // console.log("---->", this.scene.ball.collidedBarId)
    }

    // Para ricochetear para outro lado caso a bola bata embaixo da barra
    // if (this.ball.y > this.bar.y + this.bar.displayHeight - 10) { // numero magico
    //   this.ball.vx *= -1;
    //   this.ball.vy *= -1;

    //   this.scene.ball.moveBall();
    // }

    // Para ricochetear para outro lado caso a bola bata EMBAIXO da barra
    let barCollisionBottom = this.bar.y + this.bar.displayHeight - this.bar.body.offset.y;

    // Verifica se a bola está se movendo para baixo e bate EMBAIXO da barra
    // console.log((this.ball.y) > barCollisionBottom)
    // console.log(this.ball.y)
    // console.log(this.bar.body.offset.y)
    // console.log(barCollisionBottom)
    if (
      // this.ball.vy > 0 &&
      (this.ball.y) > barCollisionBottom &&
      !this.scene.ball.isColliding) {

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
    }

    console.log(this.id)

    // Para ricochetear para outro lado caso a bola bata EM CIMA da barra

    // Offset se refere à posicao da área de colisão
    let barCollisionTop = this.bar.y + this.bar.body.offset.y;

    // Verifica se a bola bate EM CIMA da barra
    if (
      // this.ball.vy < 0 &&
      (
        this.ball.y
        + this.ball.displayHeight
      ) < barCollisionTop
      && !this.scene.ball.isColliding) {
      this.scene.ball.isColliding = true; // Marca a bola como colidindo
      this.ball.vx *= -1;
      this.ball.vy *= -1;

      console.log("+++++++++++++++++++++++++++++++")


      // Resetar o estado de colisão após um pequeno atraso
      setTimeout(() => {
        this.scene.ball.isColliding = false;
      }, 100); // 100 milissegundos para evitar colisões repetidas

      console.log("Ricochete na parte superior da barra:", this.ball.y + this.ball.displayHeight, "Topo da barra:", barCollisionTop);
      this.scene.ball.moveBall();
    }

    if (this.ricochetLeft && (this.ball.x + this.ball.displayWidth / 2) < (this.bar.x + this.bar.body.offset.x)) {
      console.log('HIT')
      this.scene.ball.moveBall();
    }

    // console.log("----1----", this.ball.x + this.ball.displayWidth / 2)
    // console.log("----2----", this.bar.x + this.bar.body.offset.x)
    // console.log("----3----", this.ricochetLeft)

    console.log(this.ball.vy)
  };

  updateBallPosition = () => {
    // A posição aqui varia se a bola bater no lado esquerdo ou direito da barra
    // console.log(this.ball.x + this.ball.displayWidth / 2 < this.bar.x)
    // console.log(this.ball.x, '/', this.bar.x)
    // console.log(this.ball.x + this.ball.displayWidth / 2)
    // console.log('tem ser false', this.ball.x + this.ball.displayWidth / 2 < this.bar.x)

    if ((this.ball.x + this.ball.displayWidth / 2 < this.bar.x) && (this.ball.y + this.ball.displayHeight > this.bar.y)) {
      // console.log('---------------------------------------------------------------------------------------------left')
      // console.log("pppppp",this.ball.body.velocity.x > 0)
      // console.log("qqqqqq",this.ball.body.velocity.x)
      // esquerda
      // if (this.ricochetLeft) {
      //   console.log('left')
      //   this.scene.ball.moveBall();
      // } else {
      this.ball.x = this.bar.x - this.ball.displayWidth;
      // console.log('right')

      // }
    } else {
      // direita
      this.ball.x = this.bar.x + this.bar.displayWidth;
      // this.scene.ball.moveBall();
    }

    // console.log("--------------->", this.ball.x + this.ball.displayWidth / 2 < this.bar.x)
    // console.log(this.ball.x + this.ball.displayWidth / 2, '/', this.bar.x)
    this.ball.y = this.bar.y + this.collisionDifference - (this.ball.displayHeight / 2);

  };

  // updateBallPosition = () => {
  //   // confere se bola bate a direita ou esquerda da barra

  //   // Centro x da bola
  //   let ballCenterX = this.ball.x + this.ball.displayWidth / 2;

  //   // Centro x da barra
  //   let barCenterX = this.bar.x + this.bar.displayWidth / 2;

  //   if (ballCenterX < barCenterX) {
  //     if (this.ball.body.velocity.x > 0) {
  //       // Bola está se movendo para a direita e bateu na esquerda da barra
  //       console.log("A bola bateu na esquerda da barra.");
  //     } else {
  //       // Bola está se movendo para a esquerda e passou pelo lado direito antes de colidir
  //       console.log("A bola passou pelo lado direito antes de bater na esquerda.");
  //     }
  //   } else {
  //     if (this.ball.body.velocity.x > 0) {
  //       // Bola está se movendo para a direita e passou pelo lado esquerdo antes de colidir
  //       console.log("A bola passou pelo lado esquerdo antes de bater na direita.");
  //     } else {
  //       // Bola está se movendo para a esquerda e bateu na direita da barra
  //       console.log("A bola bateu na direita da barra.");
  //     }
  //   }

  //   // if (this.ball.x + this.ball.displayWidth / 2 < this.bar.x) {
  //   //   this.ball.x = this.bar.x - this.ball.displayWidth;
  //   // } else {
  //   //   this.ball.x = this.bar.x + this.bar.displayWidth;
  //   // }

  //   this.ball.y = this.bar.y + this.collisionDifference - (this.ball.displayHeight / 2);
  // };

}

/////////////////////////////


// class GrabBar {
//   static lastId = 0; // Variável estática para manter o ID da última barra criada

//   constructor(x, initialY, finalY, scene, speed = 2000, lockThrowingDirection = false, ricochetLeft = false, ricochetRight = false) {
//     this.id = GrabBar.generateId();
//     this.scene = scene;
//     this.x = x;
//     this.y = initialY;
//     this.finalY = finalY;
//     this.speed = speed;
//     this.collision;
//     this.collisionDifference = 0;
//     this.ballCollision = false;
//     this.lockThrowingDirection = lockThrowingDirection;
//     this.numberOfThrows = 0;
//     this.ricochetLeft = ricochetLeft;
//     this.ricochetRight = ricochetRight;

//     this.bar = this.scene.physics.add.image(this.x, this.y, "grabBar");
//     this.bar.displayWidth = 200;
//     this.bar.displayHeight = 200;
//     this.bar.setOrigin(0, 0);
//     this.bar.setImmovable();
//     // this.bar.setSize(45, 200); // Define a área de colisão da barra

//     // let proportionWidth = this.bar.displayWidth * 1.1; // 80% da largura do this.bar
//     // let proportionHeight = this.bar.displayHeight * 1.3; // 80% da altura do this.bar

//     let proportionWidth = this.bar.displayWidth;
//     let proportionHeight = this.bar.displayHeight;
//     // this.bar.setSize(proportionWidth, proportionHeight);

//     console.log('Display Width:', this.bar.displayWidth);
//     console.log('Display Height:', this.bar.displayHeight);
//     console.log('Body Width:', this.bar.body.width);
//     console.log('Body Height:', this.bar.body.height);

//     // Adicionando as áreas de colisão superior e inferior
//     this.topCollision = this.scene.physics.add.image(this.x, this.y, null).setVisible(false);
//     this.midCollision = this.scene.physics.add.image(this.x, this.y, null).setVisible(false);
//     this.bottomCollision = this.scene.physics.add.image(this.x, this.y + this.bar.displayHeight, null).setVisible(false);

//     // this.topCollision.displayWidth = this.bar.displayWidth;
//     // this.topCollision.setOrigin(0,-0.7);
//     this.topCollision.displayWidth = this.bar.displayWidth - 5;
//     this.topCollision.displayHeight = 5;
//     this.topCollision.setOrigin(0, 0);
//     //  centraliza barra de colisão
//     this.topCollision.x = this.bar.x + (this.bar.displayWidth - this.topCollision.displayWidth) / 2;

//     this.bottomCollision.displayWidth = this.bar.displayWidth - 5;
//     this.bottomCollision.displayHeight = 5;
//     this.bottomCollision.setOrigin(0, 1);
//     this.bottomCollision.x = this.bar.x + (this.bar.displayWidth - this.topCollision.displayWidth) / 2;

//     this.midCollision.displayWidth = this.bar.displayWidth - 50;
//     this.midCollision.setOrigin(0, 0);
//     this.midCollision.displayHeight = this.bar.displayHeight - 10;
//     this.midCollision.x = this.bar.x + (this.bar.displayWidth - this.topCollision.displayWidth) / 2;
//     // this.midCollision.y = this.bar.y + (this.bar.displayHeight - this.topCollision.displayHeight) / 2;

//     this.topCollision.setImmovable();
//     this.bottomCollision.setImmovable();
//     this.midCollision.setImmovable();

//     // Animação da barra
//     this.scene.tweens.add({
//       targets: [this.bar, this.topCollision, this.bottomCollision, this.midCollision],
//       y: this.finalY, // Altura final
//       duration: this.speed,
//       ease: "Linear",
//       yoyo: true, // Repetir de volta para cima
//       repeat: -1,
//       onUpdate: () => {
//         this.bottomCollision.y = this.bar.y + this.bar.displayHeight;
//         this.midCollision.y = (this.bar.y + this.bar.displayHeight / 2) - this.midCollision.displayHeight / 2;
//         this.midCollision.x = (this.bar.x + this.bar.displayWidth / 2) - this.midCollision.displayWidth / 2;
//         // Chama o método updateBallPosition() sempre que a posição da barra for atualizada
//         if (this.ballCollision) {
//           this.updateBallPosition();
//         }
//       },
//     });

//     // Adiciona colisão entre a bola e a barra
//     this.addCollision();
//   }

//   static generateId() {
//     return ++GrabBar.lastId; // Incrementa e retorna o novo ID
//   }

//   addCollision = () => {
//     // this.scene.physics.add.collider(
//     //   this.scene.ball.ball,
//     //   this.bar,
//     //   this.grabBall,
//     //   null,
//     //   this.scene
//     // );

//     // Adiciona colisões para as áreas superiores e inferiores
//     this.scene.physics.add.collider(this.scene.ball.ball, this.topCollision, this.handleTopCollision, null, this);
//     this.scene.physics.add.collider(this.scene.ball.ball, this.bottomCollision, this.handleBottomCollision, null, this);
//     this.scene.physics.add.collider(this.scene.ball.ball, this.midCollision, this.grabBall, null, this);
//   };

//   grabBall = () => {
//     const ballObject = this.scene.ball;
//     ballObject.collidedBarId = this.id;

//     if (!this.ballCollision) {
//       this.scene.ball.ball.vx *= -1;
//       this.numberOfThrows += 1;
//       if (this.numberOfThrows > 1) {
//         this.scene.ball.ball.vy *= -1;
//       }

//       this.ballCollision = true;
//       this.scene.ball.stopBall();
//       this.collisionDifference = this.scene.ball.ball.y - this.bar.y + this.scene.ball.ball.displayHeight / 2;
//     }

//     // Para ricochetear para outro lado caso a bola bata embaixo da barra
//     let barCollisionBottom = this.bar.y + this.bar.displayHeight - this.bar.body.offset.y;

//     if (this.scene.ball.ball.y > barCollisionBottom && !this.scene.ball.isColliding) {
//       this.scene.ball.isColliding = true;
//       this.scene.ball.ball.vx *= -1;
//       this.scene.ball.ball.vy *= -1;
//       this.scene.ball.moveBall();
//       setTimeout(() => {
//         this.scene.ball.isColliding = false;
//       }, 100);
//     }

//     let barCollisionTop = this.bar.y + this.bar.body.offset.y;

//     if ((this.scene.ball.ball.y + this.scene.ball.ball.displayHeight) < barCollisionTop && !this.scene.ball.isColliding) {
//       this.scene.ball.isColliding = true;
//       this.scene.ball.ball.vx *= -1;
//       this.scene.ball.ball.vy *= -1;
//       this.scene.ball.moveBall();
//       setTimeout(() => {
//         this.scene.ball.isColliding = false;
//       }, 100);
//     }

//     if (this.ricochetLeft && (this.scene.ball.ball.x + this.scene.ball.ball.displayWidth / 2) < (this.bar.x + this.bar.body.offset.x)) {
//       this.scene.ball.moveBall();
//     }
//   };

//   handleTopCollision = () => {
//     // Lógica para lidar com colisões na parte superior
//     this.scene.ball.ball.vx *= -1;
//     this.scene.ball.ball.vy *= -1;
//     this.scene.ball.moveBall();
//   };

//   handleBottomCollision = () => {
//     // Lógica para lidar com colisões na parte inferior
//     this.scene.ball.ball.vx *= -1;
//     this.scene.ball.ball.vy *= -1;
//     this.scene.ball.moveBall();
//   };

//   updateBallPosition = () => {
//     // confere se bola bate a direita ou esquerda da barra

//     // Centro x da bola
//     let ballCenterX = this.scene.ball.ball.x + this.scene.ball.ball.displayWidth / 2;

//     // Centro x da barra
//     let barCenterX = this.bar.x + this.bar.displayWidth / 2;

//     if (ballCenterX < barCenterX) {
//       if (this.scene.ball.ball.body.velocity.x > 0) {
//         // Bola está se movendo para a direita e bateu na esquerda da barra
//         console.log("A bola bateu na esquerda da barra.");
//       } else {
//         // Bola está se movendo para a esquerda e passou pelo lado direito antes de colidir
//         console.log("A bola passou pelo lado direito antes de bater na esquerda.");
//       }
//     } else {
//       if (this.scene.ball.ball.body.velocity.x > 0) {
//         // Bola está se movendo para a direita e passou pelo lado esquerdo antes de colidir
//         console.log("A bola passou pelo lado esquerdo antes de bater na direita.");
//       } else {
//         // Bola está se movendo para a esquerda e bateu na direita da barra
//         console.log("A bola bateu na direita da barra.");
//       }
//     }

//     // if (this.scene.ball.ball.x + this.scene.ball.ball.displayWidth / 2 < this.bar.x) {
//     //   this.scene.ball.ball.x = this.bar.x - this.scene.ball.ball.displayWidth;
//     // } else {
//     //   this.scene.ball.ball.x = this.bar.x + this.bar.displayWidth;
//     // }

//     this.scene.ball.ball.y = this.bar.y + this.collisionDifference - (this.scene.ball.ball.displayHeight / 2);
//   };
// }
