function Cell(isMine, position) {
    this.position = position;
    this.isMine = isMine;
    this.danger = 0;
    this.opened = false;
    this.createView(position);
    this.warning = false;

}

Cell.prototype.createView = function (position) {
    this.initViewFromTexture(position);
    RENDERER.stage.addChild(this.view);
}


Cell.prototype.initViewFromTexture = function (position) {
    this.view = PIXI.Sprite.fromImage("img/cell_closed.png")
    this.view.anchor.x = 0.5;
    this.view.anchor.y = 0.5;
    this.view.position.x = position.x * MNSW.cellSize + MNSW.position.x;
    this.view.position.y = position.y * MNSW.cellSize + MNSW.position.y + MNSW.cellSize/3;
    this.view.width = MNSW.cellSize - 10;
    this.view.height = MNSW.cellSize - 10;
    this.view.interactive = true;
    this.view.model = this;
    this.view.on('mousedown', this.click);
    this.view.on('touchstart', this.click);
    this.view.on('mouseover', this.mouseOver);
    this.view.on('mouseout', this.mouseOut);
}


Cell.prototype.click = function () {
    if (CONTROLER.sign) {
        if (!this.model.warning) {
            this.model.warning = true;
            this.texture = PIXI.Texture.fromImage("img/warning.png");
        } 
    } else if (!this.model.warning) {
        if (this.model.isMine) {
            this.model.explode();
        } else {
            this.model.openChain();
        }
    } else {
        this.model.warning = false;
        this.texture = PIXI.Texture.fromImage("img/cell_closed.png");
    }

}
Cell.prototype.mouseOver = function () {
    if (!this.model.opened && !this.model.warning) {
        this.texture = PIXI.Texture.fromImage("img/cell_hover.png");
    }
}

Cell.prototype.mouseOut = function () {
    if (!this.model.opened && !this.model.warning) {
        var img = "img/cell_closed.png";
        this.texture = PIXI.Texture.fromImage(img);
    }
}

Cell.prototype.openChain = function () {
    if (!this.opened) {
        this.open();
        if (this.danger == 0) {
            MNSW.matrix.executeForSiblings(this, function (c) {
                c.openChain();
            });
        }
    }
}

Cell.prototype.openBomb = function () {
    this.opened = true;
    if (this.isMine) {
        this.view.texture = PIXI.Texture.fromImage("img/cell_bomb.png");
    }
}

Cell.prototype.open = function () {
    MNSW.cells--;
    if (MNSW.cells == MNSW.bombs) {
        MNSW.victory();
    }
    this.opened = true;
    var img = '';
    if (this.isMine) {
        img = "img/cell_bomb.png";
    } else {
        img = "img/cell_opened.png";
        if (this.danger > 0) {
            var style = {
                font: 'bold ' + MNSW.cellSize / 2 + 'px Arial',
                fill: '#EEEEEE',
            };
            var basicText = new PIXI.Text(this.danger, style);
            basicText.x = this.position.x * MNSW.cellSize + MNSW.position.x;
            basicText.y = this.position.y * MNSW.cellSize + MNSW.position.y + MNSW.cellSize/3;
            basicText.anchor.x = 0.5;
            basicText.anchor.y = 0.5;
            RENDERER.stage.addChild(basicText);
        }
    }
    this.view.texture = PIXI.Texture.fromImage(img);

}


Cell.prototype.explode = function () {
    this.opened = true;
    this.view.texture = PIXI.Texture.fromImage("img/cell_exploaded.png");
    var self = this;
    MNSW.matrix.executeForCells(function (c) {
        c.openBomb();
    }, function (c) {
        return c != self
    });
    MNSW.gameOver();
}

