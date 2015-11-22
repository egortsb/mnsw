RENDERER = {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
};
RENDERER.render = function () {
    var stage = new PIXI.Container();
    RENDERER.stage = stage;
    var renderer = PIXI.autoDetectRenderer(RENDERER.width, RENDERER.height, {
        backgroundColor: 0x888888
    });
    document.body.appendChild(renderer.view);
    requestAnimationFrame(animate);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(stage);
    }
}

MNSW = {
    cellSize: 40,
    bombs: 0,
    height: 5,
    width: 5,
}
MNSW.main = function () {
    MNSW.position = {};
    MNSW.position.y = 200;
    
    RENDERER.render();
  
    MNSW.startGame();
      CONTROLER.init();
}

MNSW.startGame = function () {
    var size = RENDERER.width > RENDERER.height - 200 ? RENDERER.height - 200 : RENDERER.width;
    MNSW.cellSize = (size) / MNSW.height;
    MNSW.position.x = MNSW.cellSize / 2;
    this.matrix = new Matrix(MNSW.height, MNSW.width);
    this.matrix.calculateDanger();
    MNSW.cells = MNSW.height * MNSW.width;
}

MNSW.gameOver = function () {
    CONTROLER.fail();
    MNSW.height -= 1;
    MNSW.width -= 1;
}

MNSW.restart = function () {
    MNSW.bombs = 0;
    var stage = RENDERER.stage;
    for (var i = stage.children.length - 1; i >= 0; i--) {
        stage.removeChild(stage.children[i]);
    };
    MNSW.startGame();
    CONTROLER.init();
}


MNSW.victory = function () {
    console.log('victory')
    CONTROLER.victory();
    MNSW.height += 1;
    MNSW.width += 1;
  //  MNSW.restart();
    
}

window.onload = function () {
    MNSW.main();
}