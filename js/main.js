var game;
var testObject;

var global = {};

window.onload = function () {
  //// Esse código é da doc do Phaser para checar se estamos num mobile
  var isMobile = navigator.userAgent.indexOf("Mobile");
  if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
  }
  var w = 740;
  var h = 1360;

  if (isMobile != -1) {
    w = window.innerWidth;
    h = window.innerHeight;
  }
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
    // scene é a 'porta de entrada' pro game. A primeira cena é o índice 0 do array
    scene: [
      SceneLoad,
      //SceneTitle,
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
}