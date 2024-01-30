var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var nave;
var asteroides;

var game = new Phaser.Game(config);

function preload() {
  this.load.image('nave', 'images/nave.png');
  this.load.image('asteroide', 'images/asteroide.png');
}

function create() {
  nave = this.physics.add.sprite(400, 500, 'nave').setOrigin(0.5, 0.5).setCollideWorldBounds(true);
  nave.setScale(0.5);
  asteroides = this.physics.add.group({
    key: 'asteroide',
    repeat: 5,
    setXY: { x: 50, y: 0, stepX: 150 }
  });
    
  asteroides.children.iterate(function(asteroide){
     asteroide.setScale(0.5); 
  });
  this.physics.add.collider(nave, asteroides, colisionNaveAsteroides, null, this);

  // Habilitar el seguimiento del cursor
  this.input.on('pointermove', function (pointer) {
    nave.x = pointer.x;
  });
}

function update() {
  asteroides.children.iterate(function (asteroide) {
    if (asteroide.y > 600) {
      asteroide.y = 0;
      asteroide.x = Phaser.Math.Between(50, 750);
    }
  });
}

function colisionNaveAsteroides(nave, asteroide) {
  this.physics.pause();
  alert('¡Colisión! Juego terminado.');
  document.location.reload();
}