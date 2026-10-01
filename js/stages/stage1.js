class Stage1 extends Phaser.Scene {
  constructor() {
    super("Stage1");
  }

  preload() {
    this.load.json("stage1data", "js/stages/data/stage1.json");
  }

  create() {
    const data = this.cache.json.get("stage1data");

    // Imagem BG repetida verticalmente pra cobrir a fase toda. Precisa
    // ser criada ANTES do LevelLoader.build (que cria bola/buraco/barras)
    // pra ficar atrás delas na ordem de desenho.
    this.bg = this.add.tileSprite(0, 0, game.config.width, data.levelHeight, "titleBack2");
    this.bg.setOrigin(0, 0);
    this.bg.tileScaleX = game.config.width / this.bg.width;
    this.bg.tileScaleY = game.config.height / this.bg.height;

    // Monta bola, buraco, barras e warps a partir do JSON, e configura
    // os limites físicos/câmera da fase (ver js/util/levelLoader.js).
    LevelLoader.build(this, data);

    // Evento de clique
    this.input.on("pointerdown", this.ball.moveBall);
    this.input.keyboard.on('keydown-SPACE', this.ball.moveBall);
    this.input.keyboard.on('keydown-A', this.ball.moveBall);

    //// fim da create ////
  }

  update() {
    const margin = 30;
    // Verifica se a bola saiu da tela para a esquerda ou para a direita
    if (this.ball.ball.x < -margin || this.ball.ball.x > game.config.width + margin) {
      this.ball.restoreBallInitialPosition();
    }

    // Verifica se a bola saiu da fase para cima ou para baixo
    if (this.ball.ball.y < 0 - margin || this.ball.ball.y > this.levelHeight + margin) {
      this.ball.restoreBallInitialPosition();
    }

    // Câmera acompanha a bola verticalmente, centralizando ela na tela.
    // Some suave (lerp) durante o voo normal; se a distância for grande
    // (ex: a bola acabou de resetar lá embaixo), encaixa direto sem arrastar.
    const cam = this.cameras.main;
    const viewportHeight = game.config.height;
    const targetScrollY = Phaser.Math.Clamp(
      this.ball.ball.y - viewportHeight / 2,
      0,
      this.levelHeight - viewportHeight
    );

    cam.scrollY = Math.abs(targetScrollY - cam.scrollY) > viewportHeight
      ? targetScrollY
      : Phaser.Math.Linear(cam.scrollY, targetScrollY, 0.08);
  }
}
