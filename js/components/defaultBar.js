class DefaultBar {
  constructor(x, initialY, finalY, scene,  options = {}) {
    this.scene = scene;
    this.x = x;
    this.y = initialY;
    this.finalY = finalY;
    
    const {
      speed = 2000,
      orientation = 'vert'
    } = options;

    this.speed = speed;
    this.orientation = orientation;

    this.bar = this.scene.physics.add.image(this.x, this.y, "defaultBar"); 
    this.bar.displayWidth = 30;
    this.bar.displayHeight = 200;
    this.bar.setOrigin(0, 0);
    this.bar.setImmovable();
    // this.bar.setSize(47, 200); // Define a área de colisão da barra
    // this.bar.setSize(50, 270); // Define a área de colisão da barra

    let proportionWidth = this.bar.width * 0.7;
    let proportionHeight = this.bar.height * 0.95;

    if (orientation === 'hor') {
      proportionWidth = this.bar.width * 0.95;
      proportionHeight = this.bar.height * 0.7;
    }
    this.bar.setSize(proportionWidth, proportionHeight, true);
    // this.bar.setOffset(0, 0);  // Garante que o offset de colisão seja alinhado ao canto superior esquerdo do sprite

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



    // Explicando: this.scene.ball.ball.vy > 0 confere se a bola 

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
      // console.log("Ricochete na parte inferior da barra:", this.scene.ball.ball.y, "Fundo da barra:", barCollisionBottom);

      // Resetar o estado de colisão após um pequeno atraso
      setTimeout(() => {
        this.scene.ball.isColliding = false;
      }, 100); // 100 milissegundos para evitar colisões repetidas
    }



    // if (this.scene.ball.ball.y > this.bar.y + this.bar.displayHeight - 10) { // numero magico
    //   this.scene.ball.ball.vx *= -1;
    //   this.scene.ball.ball.vy *= -1;


    //   // console.log("ball: ", this.scene.ball.ball.y)
    //   // console.log("bar: ",this.bar.y + this.bar.displayHeight - 10)
    // }

    // if (this.scene.ball.ball.y > this.bar.y + this.bar.displayHeight - 10) { // numero magico
    //   this.scene.ball.ball.vx *= -1;
    //   this.scene.ball.ball.vy *= -1;
    // }

    // Para ricochetear para outro lado caso a bola bata EM CIMA da barra
    // if (this.scene.ball.ball.y < this.bar.y -  10) { // numero magico
    //   this.scene.ball.ball.vx *= -1;
    //   this.scene.ball.ball.vy *= -1;
    // }

    // Offset se refere à posicao da área de colisão
    let barCollisionTop = this.bar.y + this.bar.body.offset.y;

    // Verifica se a bola bate EM CIMA da barra
    if (
      // this.scene.ball.ball.vy < 0 &&
      (
        this.scene.ball.ball.y
        + this.scene.ball.ball.displayHeight
      ) < barCollisionTop
      && !this.scene.ball.isColliding) {
      this.scene.ball.isColliding = true; // Marca a bola como colidindo
      this.scene.ball.ball.vx *= -1;
      this.scene.ball.ball.vy *= -1;


      // Resetar o estado de colisão após um pequeno atraso
      setTimeout(() => {
        this.scene.ball.isColliding = false;
      }, 100); // 100 milissegundos para evitar colisões repetidas

      console.log("Ricochete na parte superior da barra:", this.scene.ball.ball.y + this.scene.ball.ball.displayHeight, "Topo da barra:", barCollisionTop);
    }
    console.log(this.scene.ball.ball.vy)




    //   if (this.scene.ball.ball.vy < 0 && this.scene.ball.ball.y < barCollisionTop) {
    //     this.scene.ball.ball.vx *= -1; // Inverte horizontalmente se necessário
    //     this.scene.ball.ball.vy *= -1; // Inverte sempre verticalmente

    //     // Ajusta a posição da bola para estar logo abaixo do ponto de colisão
    //     this.scene.ball.ball.y = barCollisionTop - 50;

    //     console.log("Ricochete na parte superior da barra:", this.scene.ball.ball.y, "Topo da barra:", barCollisionTop);
    // }


    this.scene.ball.moveBall();
  };
}
