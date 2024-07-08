class Stage2 extends Phaser.Scene {
  constructor() {
    super("Stage2");
  }
  preload() { }

  create() {
    // Imagem BG
    this.bg = this.add.image(0, 0, "titleBack");
    this.bg.setOrigin(0, 0);
    this.bg.displayWidth = game.config.width;
    this.bg.displayHeight = game.config.height;

    // Bola
    this.ball = new Ball(this);
    // this.ball = new Ball(this, [game.config.width / 2, game.config.height - 1100]);

    // Buraco
    new Hole(150, 0, this);

    // Grupo das grabBars
    this.grabBarsGroup = [];

    // const bar1 = new HorizontalGrabBar(100, 350, 300, this, 1500);
    const bar2 = new GrabBar(600, 700, 1100, this, { speed: 1200 });
    this.grabBarsGroup.push(bar2);
    // const bar2 = new GrabBar(600, 970, 970, this, 1200);
    // const bar3 = new GrabBar(50, 600, 600, this, 2000, false, false, false);
    // this.grabBarsGroup.push(bar3);
    // const bar5 = new GrabBar(50, 400, 700, this, { speed: 1500 });
    // this.grabBarsGroup.push(bar5);

    const bar4 = new DefaultBar2(710, 0, 0, this,{ tileWidth: 30 , tileHeight: 500 });
    // bar4.bar.displayHeight = 500;
    bar4.bar.tileScaleY = 0.6;
    bar4.bar.tileScaleX = 0.6;

    const topBar = new DefaultBar2(400, 0, 0, this,{ orientaion: 'hor', tileWidth: 400 , tileHeight: 30 });
    topBar.bar.tileScaleY = 0.7;
    topBar.bar.tileScaleX = 0.7;
    // topBar.bar.displayWidth = game.config.width;
    // topBar.bar.displayHeight = 30;

    ////////// TESTE

    const horizontalBar2 = new DefaultBar2(0, 300, 300, this, { tileWidth: 30 , tileHeight: 400 });
    horizontalBar2.bar.tileScaleY = 0.6;
    horizontalBar2.bar.tileScaleX = 0.6;



    
    // horizontalBar2.resizeBar(450, 30);
    // horizontalBar2.bar = this.add.tileSprite(this.x, this.y, 30, 400, 'tile-bar'); // Alteração
    
    // horizontalBar2.bar.displayWidth = 450;
    // horizontalBar2.bar.height = 10;
    // horizontalBar2.bar.displayHeight = 30;
    // horizontalBar2.bar.tileScaleX = 450 / horizontalBar2.bar.width;
    // horizontalBar2.bar.tileScaleY = 30 / horizontalBar2.bar.height;
    // horizontalBar2.bar.tilePositionX = 0; // Reinicia a posição de repetição do tile sprite

    // Ajuste a área de colisão
    // horizontalBar2.bar.body.setSize(horizontalBar2.bar.displayWidth, horizontalBar2.bar.displayHeight);

    ////////// TESTE


    // WARP
    // const warp1 = new Warp(350, 350, this);
    // const warp2 = new Warp(200, 200, this);

    const warpZone = new WarpZone(50, 100, 350, 350, this);

    // Evento de clique
    this.input.on("pointerdown", this.ball.moveBall);
    this.input.keyboard.on('keydown-SPACE', this.ball.moveBall);
    this.input.keyboard.on('keydown-X', this.ball.moveBall);

    //// fim da create ////
  }

  update() {
    const margin = 30;
    // Verifica se a bola saiu da tela para a esquerda ou para a direita
    if (this.ball.ball.x < -margin || this.ball.ball.x > game.config.width + margin) {
      this.ball.restoreBallInitialPosition();
    }

    // Verifica se a bola saiu da tela para cima ou para baixo
    if (this.ball.ball.y < 0 - margin || this.ball.ball.y > game.config.height + margin) {
      this.ball.restoreBallInitialPosition();
    }
  }
}
