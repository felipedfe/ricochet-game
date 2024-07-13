class Stage4 extends Phaser.Scene {
  constructor() {
    super("Stage4");
  }

  preload() { 
    // Carregue as imagens dos tiles aqui
    this.load.image('titleBack', 'path/to/titleBack.png');
    this.load.image('bar-top', 'path/to/bar-top.png');
    this.load.image('bar-mid', 'path/to/bar-mid.png');
    this.load.image('bar-bot', 'path/to/bar-bot.png');
  }

  create() {
    // Imagem BG
    this.bg = this.add.image(0, 0, "titleBack");
    this.bg.setOrigin(0, 0);
    this.bg.displayWidth = this.sys.game.config.width;
    this.bg.displayHeight = this.sys.game.config.height;

    let barContainer = this.add.container(100, 100); // Posição da barra

    let barWidth = 40; // Largura da barra
    let barHeight = 400; // Altura da barra

    // Altura de cada tile
    let tileHeight = 15;

    // Adicionar o tile inicial
    let startTile = this.add.image(0, 0, 'bar-top').setOrigin(0, 0);
    startTile.displayWidth = barWidth;
    startTile.displayHeight = tileHeight;
    barContainer.add(startTile);

    // Adicionar os tiles do meio
    let middleTileCount = Math.floor((barHeight - 2 * tileHeight) / tileHeight);
    for (let i = 0; i < middleTileCount; i++) {
      let middleTile = this.add.image(0, (i + 1) * tileHeight, 'bar-mid').setOrigin(0, 0);
      middleTile.displayWidth = barWidth;
      middleTile.displayHeight = tileHeight;
      barContainer.add(middleTile);
    }

    // Adicionar o tile final
    let endTile = this.add.image(0, (middleTileCount + 1) * tileHeight, 'bar-bot').setOrigin(0, 0);
    endTile.displayWidth = barWidth;
    endTile.displayHeight = tileHeight;
    barContainer.add(endTile);

    //// fim da create ////
  }

  update() {
    // Atualizações contínuas do jogo
  }
}



// class Stage4 extends Phaser.Scene {
//   constructor() {
//     super("Stage4");
//   }
//   preload() { }

//   create() {
//     // Imagem BG
//     this.bg = this.add.image(0, 0, "titleBack");
//     this.bg.setOrigin(0, 0);
//     this.bg.displayWidth = game.config.width;
//     this.bg.displayHeight = game.config.height;


//     this.ball = new Ball(this);

//     const defaultBar = new DefaultBar(100, 310, 310, this)


//     let barContainer = this.add.container(100, 100); // Position of the bar

//     let barWidth = 40 ; // Width of the bar
//     let barHeight = 200; // Height of the bar

//     // Height of each tile
//     let tileHeight = 15;

//     // Add the start tile
//     let startTile = this.add.image(0, 0, 'bar-top').setOrigin(0, 0);
//     startTile.displayWidth = barWidth;
//     startTile.displayHeight = tileHeight;
//     barContainer.add(startTile);

//     // Add the middle tiles
//     let middleTileCount = Math.floor((barHeight - 2 * tileHeight) / tileHeight);
//     for (let i = 0; i < middleTileCount; i++) {
//       let middleTile = this.add.image(0, tileHeight + i * tileHeight, 'bar-mid').setOrigin(0, 0);
//       middleTile.displayWidth = barWidth;
//       middleTile.displayHeight = tileHeight;
//       barContainer.add(middleTile);
//     }

//     // Add the end tile
//     let endTile = this.add.image(0, barHeight - tileHeight, 'bar-bot').setOrigin(0, 0);
//     endTile.displayWidth = barWidth;
//     endTile.displayHeight = tileHeight;
//     barContainer.add(endTile);


//     //// fim da create ////
//   }

//   update() {

//   }
// }


// class Stage4 extends Phaser.Scene {
//   constructor() {
//     super("Stage4");
//   }
//   preload() {
//     // Carregue as imagens dos tiles aqui
//     this.load.image('titleBack', 'path/to/titleBack.png');
//     this.load.image('bar-top', 'path/to/bar-top.png');
//     this.load.image('bar-mid', 'path/to/bar-mid.png');
//     this.load.image('bar-bot', 'path/to/bar-bot.png');
//   }

//   create() {
//     // Imagem BG
//     this.bg = this.add.image(0, 0, "titleBack");
//     this.bg.setOrigin(0, 0);
//     this.bg.displayWidth = this.sys.game.config.width;
//     this.bg.displayHeight = this.sys.game.config.height;

//     this.ball = new Ball(this);

//     const defaultBar = new DefaultBar(20, 100, 100, this)

//     let barContainer = this.add.container(100, 100); // Posição da barra

//     let barWidth = 20; // Largura da barra
//     let barHeight = 200; // Altura da barra

//     let scale = 0.9; // Fator de escala

//     // Altura e largura de cada tile, escalados
//     let tileHeight = 20 * scale;
//     let tileWidth = barWidth * scale;

//     // Adicionar o tile inicial
//     let startTile = this.add.image(0, 0, 'bar-top').setOrigin(0, 0);
//     startTile.setScale(scale);
//     barContainer.add(startTile);

//     // Adicionar os tiles do meio
//     let middleTileCount = Math.floor((barHeight - 2 * tileHeight) / tileHeight);
//     for (let i = 0; i < middleTileCount; i++) {
//       let middleTile = this.add.image(0, (i + 1) * tileHeight, 'bar-mid').setOrigin(0, 0);
//       middleTile.setScale(scale);
//       barContainer.add(middleTile);
//     }

//     // Adicionar o tile final
//     let endTile = this.add.image(0, (middleTileCount + 1) * tileHeight, 'bar-bot').setOrigin(0, 0);
//     endTile.setScale(scale);
//     barContainer.add(endTile);
//   }

//   update() {
//     // Atualizações contínuas do jogo
//   }
// }
