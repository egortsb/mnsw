function Matrix(w, h) {
    this.cells = [];
    this.width = w;
    this.height = h;
    this.init();
}


Matrix.prototype.init = function () {
    for (var i = 0; i < this.height; i++) {
        var row = [];
        this.cells.push(row);
        for (var j = 0; j < this.width; j++) {
            row.push(new Cell(this.defineIfMine(), {
                x: i,
                y: j
            }));
        }
    }
}

Matrix.prototype.defineIfMine = function () {
    if (Math.random() > 0.9) {
        MNSW.bombs++;
        return true;
    }
    return false;
}

Matrix.prototype.calculateDanger = function () {
    for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
            var danger = 0;
            var c = this.cells[i][j];
            var self = this;
            var dangerArray = this.executeForSiblings(c, function (a) {
                return self.getDangerForCellInt(a)
            });
            for (var k in dangerArray) {
                danger += dangerArray[k];
            }
            c.danger = danger;
        }
    }
}
Matrix.prototype.getDangerForCellInt = function (cell) {
    var d = cell.isMine;
    return d ? 1 : 0;
}


Matrix.prototype.executeForSiblings = function (cell, callback) {
    var p = cell.position;
    var result = [];
    var k = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, -1], [0, -1], [1, 0]];
    for (var i in k) {
        var x = p.x + k[i][0];
        var y = p.y + k[i][1];
        if (x >= 0 && x < this.height && y >= 0 && y < this.width) {
            result.push(callback(this.cells[x][y]));
        }

    }
    return result;
}

Matrix.prototype.executeForCells = function (callback, filter) {

    for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
            var c = this.cells[i][j];
            if (filter) {
                if (filter(c)) {
                    callback(c);
                }
            } else {
                callback(c);
            }
        }
    }

}