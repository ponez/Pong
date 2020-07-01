class VeC {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
class RectAngle {
  constructor(width, height) {
    this.position = new VeC();
    this.size = new VeC(width, height);
  }
  get leftOfBall() {
    return this.position.x - this.size.x / 2;
  }
  get rightOfBall() {
    return this.position.x + this.size.x / 2;
  }
  get topOfBall() {
    return this.position.y - this.size.y / 2;
  }
  get buttomOfBall() {
    return this.position.y + this.size.y / 2;
  }
}
class Ball extends RectAngle {
  constructor() {
    super(11, 11);
    this.velocity = new VeC();
  }
}
class Game {
  constructor(canvas) {
    this.canvas_ = canvas;
    this.context_ = canvas.getContext("2d");

    this.ball = new Ball();
    this.ball.position.x = 150;
    this.ball.position.y = 150;
    this.ball.velocity.x = 200;
    this.ball.velocity.y = 200;

    let lastTime;
    const CB = (milliSeconds) => {
      if (lastTime) {
        this.update((milliSeconds - lastTime) / 1000);
      }
      lastTime = milliSeconds;
      requestAnimationFrame(CB);
    };
    CB();

    this.niggas = [new NIGGAZ(), new NIGGAZ()];

    this.niggas[0].position.x = 40;
    this.niggas[1].position.x = this.canvas_.width - 40;

    this.niggas.forEach((negro) => {
      negro.position.y = this.canvas_.height / 2;
    });
  }
  draw() {
    this.context_.fillStyle = "#000";
    this.context_.fillRect(0, 0, this.canvas_.width, this.canvas_.height);
    this.drawRect(this.ball);

    this.niggas.forEach((negro) => this.drawRect(negro));
  }
  drawRect(rectAngle) {
    this.context_.fillStyle = "#fff";
    this.context_.fillRect(
      rectAngle.leftOfBall, // this should be left of player but i'm to lazy to copy and change the name so fuck you
      rectAngle.topOfBall, // this should be top of player but i'm to lazy to copy and change the name so fuck you
      rectAngle.size.x,
      rectAngle.size.y
    );
  }
  detectCollision(nigga, ball) {
    //it's confusing? go and cry!
    if (
      nigga.leftOfBall < ball.rightOfBall &&
      nigga.rightOfBall > ball.leftOfBall &&
      nigga.topOfBall < ball.buttomOfBall &&
      nigga.buttomOfBall > ball.topOfBall
    ) {
      ball.velocity.x = -ball.velocity.x;
    }
  }
  update = (deltaTime) => {
    this.ball.position.x += this.ball.velocity.x * deltaTime;
    this.ball.position.y += this.ball.velocity.y * deltaTime;

    if (
      this.ball.leftOfBall < 0 ||
      this.ball.rightOfBall > this.canvas_.width
    ) {
      let niggaID;
      if (this.ball.velocity.x < 0) {
        niggaID = 1;
      } else {
        niggaID = 0;
      }
      console.log(niggaID);
      this.ball.velocity.x = -this.ball.velocity.x;
    }
    if (
      this.ball.topOfBall < 0 ||
      this.ball.buttomOfBall > this.canvas_.height
    ) {
      this.ball.velocity.y = -this.ball.velocity.y;
    }
    this.niggas[1].position.y = this.ball.position.y; //niggaz are sniffing each other y pos asses
    this.niggas.forEach((negro) => this.detectCollision(negro, this.ball));
    this.draw();
  };
}

class NIGGAZ extends RectAngle {
  constructor() {
    super(20, 100);
    this.score = 0;
  }
}

const canvas = document.getElementById("canvas");

const pong = new Game(canvas);

canvas.addEventListener("mousemove", (e) => {
  pong.niggas[0].position.y = e.offsetY;
});
