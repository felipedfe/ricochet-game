class SceneLoad extends Phaser.Scene {
  constructor() {
    super('SceneLoad');
  }

  preload() {
    // progText tem que ser criado aqui e não no create() pq o código só acessa o create
    // quando termina o preload
    this.progText = this.add.text(0, 0, "0%", {
      color: "#ffffff",
      fontSize: game.config.width / 10,
    })
    this.progText.setOrigin(0.5, 0.5);
    Align.center(this.progText);

    // listener para executar o loading enquanto carregamos os assets
    this.load.on("progress", this.showProgress);

    // bg
    this.load.image("titleBack", "images/title-back.jpg");

    // bola
    this.load.image("ball", "images/ball.png");

    // barra
    this.load.image("defaultBar", "images/default-bar.png");

    // audios
    // this.load.audio("right", "audio/right.wav");
    // this.load.audio("wrong", "audio/wrong.wav");
    // this.load.audio("levelUp", "audio/levelUp.wav");
    // this.load.audio("background", "audio/background.mp3");
  }

  create() {
    // ouvidor de eventos. dispara ações conforme a chave dela, parecido com as actions do Redux
    // esse emitter é global, desse jeito todas as partes do jogo podem se comunicar
    global.emitter = new Phaser.Events.EventEmitter;
    // console.log(global)

    // esse controller vai criar o listener das ações do botões
    global.controller = new Controller();

    // cria o gerenciador de som
    global.mediaManager = new MediaManager({ scene: this });

    // quando terminar o loading caimos aqui
    this.scene.start("SceneMain");
    // this.scene.start("SceneTitle");
  }

  showProgress = (progress) => {
    let percentage = Math.floor(progress * 100);
    this.progText.setText(percentage + "%");
  };

  update() {

  }
}