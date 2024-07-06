class Hole {
  constructor(x, y, scene) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.hole = this.scene.physics.add.image(this.x, this.y, "hole");
    this.hole.displayWidth = 60;
    this.hole.displayHeight = 20;
    this.hole.setOrigin(0, 0);
    this.hole.setImmovable();
    // this.hole.setSize(10, 300);

    this.scene.physics.add.overlap(
      this.scene.ball.ball,
      this.hole,
      this.handleOverlap,
      null,
      this.scene
    );
  }

  handleOverlap = () => {
    console.log("overlap");
  };
}
