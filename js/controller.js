CONTROLER = {
    sign: false
}
CONTROLER.restart = function () {
    MNSW.restart();
}
CONTROLER.init = function () {
    var restart = PIXI.Sprite.fromImage("img/restart.png");
    restart.position.x = 0;
    restart.position.y = 0;
    restart.interactive = true;
    restart.on('mousedown', CONTROLER.restart);
    restart.on('touchstart', CONTROLER.restart);
    restart.height = 100;
    restart.width = 200;
    restart.visible = false;

    CONTROLER.restartView = restart;
    RENDERER.stage.addChild(restart);
    CONTROLER.createSignButton();
    CONTROLER.createBanner();
    
}
CONTROLER.onSign = function () {
    CONTROLER.sign = !CONTROLER.sign;
    var img = CONTROLER.sign ? "img/sign_active.png" : "img/sign.png";
    CONTROLER.signView.texture = PIXI.Texture.fromImage(img);
}

CONTROLER.createSprite = function(){
}

CONTROLER.createSignButton = function () {
    var sign = PIXI.Sprite.fromImage("img/sign.png");
    sign.position.x = 300;
    sign.position.y = 0;
    sign.interactive = true;
    sign.height = 100;
    sign.width = 100;
    sign.on('mousedown', CONTROLER.onSign);
    sign.on('touchstart', CONTROLER.onSign);
    CONTROLER.signView = sign;
    RENDERER.stage.addChild(sign);
}

CONTROLER.createBanner = function () {
    var banner = PIXI.Sprite.fromImage("img/mines.png");
    banner.position.x = MNSW.width*MNSW.cellSize - 160;
    banner.position.y = 0;

    banner.height = 100;
    banner.width = 150;
   
    CONTROLER.bannerView = banner;
    RENDERER.stage.addChild(banner);
}
CONTROLER.victory = function(){
   CONTROLER.bannerView.texture = PIXI.Texture.fromImage("img/cleared.png");
     CONTROLER.restartView.texture = PIXI.Texture.fromImage("img/next.png");
    CONTROLER.restartView.visible = true;
    
}


CONTROLER.fail = function(){
    CONTROLER.restartView.visible = true;
}

