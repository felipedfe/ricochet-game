var game;
var testObject;

var global = {};

function resize() {
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth / gameRatio) + "px";
  }
  else {
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
  console.log("resize");
}

window.onload = function () {
  //// Esse código é da doc do Phaser para checar se estamos num mobile
  // var isMobile = navigator.userAgent.indexOf("Mobile");
  // if (isMobile == -1) {
  //   isMobile = navigator.userAgent.indexOf("Tablet");
  // }
  var w = 740;
  var h = 1360;

  // if (isMobile != -1) {
  //   w = window.innerWidth;
  //   h = window.innerHeight;
  // }
  ////

  var config = {
    type: Phaser.AUTO,
    width: w,
    height: h,
    // parent indica em que lugar da página o game vai ficar. Só colocar o id do elemento
    parent: 'game-container',
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
      }
    },
    scale: {
      mode: Phaser.Scale.FIT, // configura o modo de escala para RESIZE
      autoCenter: Phaser.Scale.CENTER_BOTH // centraliza o jogo no meio da tela
    },
    // scene é a 'porta de entrada' pro game. A primeira cena é o índice 0 do array
    scene: [
      SceneLoad,
      //SceneTitle,
      // Stage1,
      Stage2,
      // Stage3,
      // TestStage,
      SceneMain,
      SceneOver,
      SceneInstructions,
      SceneSettings
    ]
  };

  // aqui temos opções globais como o número de blocos para cada fase do game
  global.settings = new GlobalSettings();

  global.constants = new Constants();

  game = new Phaser.Game(config);

  resize();
  window.addEventListener("resize", resize, false);
}