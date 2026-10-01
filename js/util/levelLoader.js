class LevelLoader {
  // Cada construtor tem uma assinatura diferente (a HorizontalGrabBar,
  // por exemplo, recebe finalX antes de y) — por isso um factory por tipo
  // em vez de tentar chamar `new window[obj.type](...)` genericamente.
  static FACTORIES = {
    GrabBar: (obj, scene) => new GrabBar(obj.x, obj.y, obj.finalY, scene, {
      speed: obj.speed,
      ricochetLeft: obj.ricochetLeft,
      ricochetRight: obj.ricochetRight,
    }),
    DefaultBar: (obj, scene) => new DefaultBar(obj.x, obj.y, obj.finalY, scene, {
      speed: obj.speed,
      orientation: obj.orientation,
    }),
    DefaultBar2: (obj, scene) => new DefaultBar2(obj.x, obj.y, obj.finalY, scene, {
      speed: obj.speed,
      orientation: obj.orientation,
      tileWidth: obj.tileWidth,
      tileHeight: obj.tileHeight,
    }),
    HorizontalGrabBar: (obj, scene) => new HorizontalGrabBar(obj.x, obj.finalX, obj.y, scene, {
      speed: obj.speed,
    }),
  };

  // Tipos que "agarram" a bola precisam entrar em scene.grabBarsGroup —
  // é lá que Ball.moveBall/restoreBallInitialPosition procuram a barra
  // pra liberar a colisão (ver js/components/ball.js).
  static GRAB_TYPES = ["GrabBar", "HorizontalGrabBar"];

  static build(scene, data) {
    scene.levelHeight = data.levelHeight;
    scene.grabBarsGroup = [];

    // Ball precisa existir antes de qualquer coisa: Hole e as barras
    // registram collider/overlap contra scene.ball.ball no construtor.
    scene.ball = new Ball(scene, [data.ball.x, data.ball.y]);
    new Hole(data.hole.x, data.hole.y, scene);

    const warpsByPair = {};

    for (const obj of data.objects || []) {
      if (obj.type === "Warp") {
        (warpsByPair[obj.pair] = warpsByPair[obj.pair] || []).push(obj);
        continue;
      }

      const factory = LevelLoader.FACTORIES[obj.type];
      if (!factory) {
        console.warn(`LevelLoader: tipo de objeto desconhecido "${obj.type}"`);
        continue;
      }

      const instance = factory(obj, scene);

      // width/height (quando presentes) não são parâmetro do construtor
      // — é o mesmo ajuste visual manual que várias stages já fazem hoje
      // (ex: stage3.js faz `bar.bar.displayWidth = 200` na unha pra virar
      // uma barra horizontal). Não recalcula a caixa de colisão.
      if (obj.width != null && obj.height != null && instance.bar) {
        instance.bar.displayWidth = obj.width;
        instance.bar.displayHeight = obj.height;
      }

      if (LevelLoader.GRAB_TYPES.includes(obj.type)) {
        scene.grabBarsGroup.push(instance);
      }
    }

    for (const pairId in warpsByPair) {
      const pair = warpsByPair[pairId];
      if (pair.length !== 2) {
        console.warn(`LevelLoader: warp "pair ${pairId}" tem ${pair.length} warp(s), esperava 2`);
        continue;
      }
      new WarpZone(pair[0].x, pair[0].y, pair[1].x, pair[1].y, scene);
    }

    scene.physics.world.setBounds(0, 0, game.config.width, scene.levelHeight);
    scene.cameras.main.setBounds(0, 0, game.config.width, scene.levelHeight);
  }
}
