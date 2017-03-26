(function (window) {
    function Digit (draw, specs) {
        var digit = draw.group();

        digit.addClass('digits');

        var pixelSize = specs.pixelSize || 50,
            pixelMarginRatio = specs.pixelMarginRatio || 0.1,
            pixelInnerMarginRatio = specs.pixelInnerMarginRatio,
            pixelsXLength = 6,
            pixelsYLength = 8;

        var rows = [];
        for (var i = 0; i < pixelsYLength; i++) {
            var pixelsInARow = [];
            for (var j = 0; j < pixelsXLength; j++) {
                var pixel = new Pixel(draw, {
                    x: j*(pixelSize + pixelMarginRatio * pixelSize),
                    y: i*(pixelSize + pixelMarginRatio * pixelSize),
                    size: pixelSize,
                    innerMarginRatio: pixelInnerMarginRatio
                });
                pixelsInARow.push(pixel);
                digit.add(pixel.getSVG());
            }
            rows.push(pixelsInARow);
        }

        digit.transform({
            x: specs.x || 0,
            y: specs.y || 0
        });

        this._digit = digit;
        this._pixels = rows;
        this._pixelsXLength = pixelsXLength;
        this._pixelsYLength = pixelsYLength;
    }

    Digit.prototype.getSVG = function () {
        return this._digit;
    }

    Digit.prototype.paintAll = function () {
        for (var i = 0; i < this._pixelsYLength; i++) {
            for (var j = 0; j < this._pixelsXLength; j++) {
                this._pixels[i][j].paint([1,1,1,1]);
            }
        }
    };

    Digit.prototype.getRecipe = function () {
        var recipe = '';
        for (var i = 0; i < this._pixelsYLength; i++) {
            for (var j = 0; j < this._pixelsXLength; j++) {
                var map = this._pixels[i][j].getSelectionMap();
                if (JSON.stringify(map) === '[0,0,0,0]') continue;
                if (i < 1 || i > 6 || j < 1 || j > 6) continue;
                recipe += 'this._pixels['+i+']['+j+'].paint(['+map+']);\n'
            }
        }
        return recipe;
    };

    Digit.prototype.print = function (number) {
        if (typeof number !== 'number' || number < 0 || number > 9)
            throw new Error('Invalid number input');

        for (var i = 0; i < this._pixelsYLength; i++) {
            for (var j = 0; j < this._pixelsXLength; j++) {
                this._pixels[i][j].paint([0,0,0,0]);
            }
        }

        if (number == 0) {
            this._pixels[1][1].paint([0,1,1,0]);
            this._pixels[1][2].paint([1,1,1,1]);
            this._pixels[1][3].paint([1,1,1,1]);
            this._pixels[1][4].paint([0,0,1,1]);
            this._pixels[2][1].paint([1,1,1,1]);
            this._pixels[2][4].paint([1,1,1,1]);
            this._pixels[3][1].paint([1,1,1,1]);
            this._pixels[3][4].paint([1,1,1,1]);
            this._pixels[4][1].paint([1,1,1,1]);
            this._pixels[4][4].paint([1,1,1,1]);
            this._pixels[5][1].paint([1,1,1,1]);
            this._pixels[5][4].paint([1,1,1,1]);
            this._pixels[6][1].paint([1,1,0,0]);
            this._pixels[6][2].paint([1,1,1,1]);
            this._pixels[6][3].paint([1,1,1,1]);
            this._pixels[6][4].paint([1,0,0,1]);
        } else if (number == 1) {
            this._pixels[1][2].paint([0,1,1,0]);
            this._pixels[1][3].paint([1,1,1,1]);
            this._pixels[2][3].paint([1,1,1,1]);
            this._pixels[3][3].paint([1,1,1,1]);
            this._pixels[4][3].paint([1,1,1,1]);
            this._pixels[5][3].paint([1,1,1,1]);
            this._pixels[6][3].paint([1,1,1,1]);
        } else if (number == 2) {
            this._pixels[1][1].paint([0,1,1,0]);
            this._pixels[1][2].paint([1,1,1,1]);
            this._pixels[1][3].paint([1,1,1,1]);
            this._pixels[1][4].paint([0,0,1,1]);
            this._pixels[2][4].paint([1,1,1,1]);
            this._pixels[3][1].paint([0,1,1,0]);
            this._pixels[3][2].paint([1,1,1,1]);
            this._pixels[3][3].paint([1,1,1,1]);
            this._pixels[3][4].paint([1,0,0,1]);
            this._pixels[4][1].paint([1,1,1,1]);
            this._pixels[5][1].paint([1,1,1,1]);
            this._pixels[6][1].paint([1,1,1,1]);
            this._pixels[6][2].paint([1,1,1,1]);
            this._pixels[6][3].paint([1,1,1,1]);
            this._pixels[6][4].paint([1,0,0,1]);
        } else if (number == 3) {
            this._pixels[1][1].paint([0,1,1,0]);
            this._pixels[1][2].paint([1,1,1,1]);
            this._pixels[1][3].paint([1,1,1,1]);
            this._pixels[1][4].paint([0,0,1,1]);
            this._pixels[2][4].paint([1,1,1,1]);
            this._pixels[3][2].paint([1,1,1,1]);
            this._pixels[3][3].paint([1,1,1,1]);
            this._pixels[3][4].paint([1,1,1,1]);
            this._pixels[4][4].paint([1,1,1,1]);
            this._pixels[5][4].paint([1,1,1,1]);
            this._pixels[6][1].paint([1,1,0,0]);
            this._pixels[6][2].paint([1,1,1,1]);
            this._pixels[6][3].paint([1,1,1,1]);
            this._pixels[6][4].paint([1,1,1,1]);
        } else if (number == 4) {
            this._pixels[1][1].paint([0,1,1,0]);
            this._pixels[1][4].paint([1,1,1,1]);
            this._pixels[2][1].paint([1,1,1,1]);
            this._pixels[2][4].paint([1,1,1,1]);
            this._pixels[3][1].paint([1,1,0,0]);
            this._pixels[3][2].paint([1,1,1,1]);
            this._pixels[3][3].paint([1,1,1,1]);
            this._pixels[3][4].paint([1,1,1,1]);
            this._pixels[4][4].paint([1,1,1,1]);
            this._pixels[5][4].paint([1,1,1,1]);
            this._pixels[6][4].paint([1,1,1,1]);
        } else if (number == 5) {
            this._pixels[1][1].paint([0,1,1,0]);
            this._pixels[1][2].paint([1,1,1,1]);
            this._pixels[1][3].paint([1,1,1,1]);
            this._pixels[1][4].paint([0,0,1,1]);
            this._pixels[2][1].paint([1,1,1,1]);
            this._pixels[3][1].paint([1,1,0,0]);
            this._pixels[3][2].paint([1,1,1,1]);
            this._pixels[3][3].paint([1,1,1,1]);
            this._pixels[3][4].paint([0,0,1,1]);
            this._pixels[4][4].paint([1,1,1,1]);
            this._pixels[5][4].paint([1,1,1,1]);
            this._pixels[6][1].paint([1,1,0,0]);
            this._pixels[6][2].paint([1,1,1,1]);
            this._pixels[6][3].paint([1,1,1,1]);
            this._pixels[6][4].paint([1,1,1,1]);
        } else if (number == 6) {
            this._pixels[1][1].paint([0,1,1,0]);
            this._pixels[1][2].paint([1,1,1,1]);
            this._pixels[1][3].paint([1,1,1,1]);
            this._pixels[1][4].paint([0,0,1,1]);
            this._pixels[2][1].paint([1,1,1,1]);
            this._pixels[3][1].paint([1,1,1,1]);
            this._pixels[3][2].paint([1,1,1,1]);
            this._pixels[3][3].paint([1,1,1,1]);
            this._pixels[3][4].paint([0,0,1,1]);
            this._pixels[4][1].paint([1,1,1,1]);
            this._pixels[4][4].paint([1,1,1,1]);
            this._pixels[5][1].paint([1,1,1,1]);
            this._pixels[5][4].paint([1,1,1,1]);
            this._pixels[6][1].paint([1,1,0,0]);
            this._pixels[6][2].paint([1,1,1,1]);
            this._pixels[6][3].paint([1,1,1,1]);
            this._pixels[6][4].paint([1,0,0,1]);
        } else if (number == 7) {
            this._pixels[1][1].paint([0,1,1,0]);
            this._pixels[1][2].paint([1,1,1,1]);
            this._pixels[1][3].paint([1,1,1,1]);
            this._pixels[1][4].paint([0,0,1,1]);
            this._pixels[2][4].paint([1,1,1,1]);
            this._pixels[3][4].paint([1,1,1,1]);
            this._pixels[4][4].paint([1,1,1,1]);
            this._pixels[5][4].paint([1,1,1,1]);
            this._pixels[6][4].paint([1,1,0,0]);
        } else if (number == 8) {
            this._pixels[1][1].paint([0,1,1,0]);
            this._pixels[1][2].paint([1,1,1,1]);
            this._pixels[1][3].paint([1,1,1,1]);
            this._pixels[1][4].paint([0,0,1,1]);
            this._pixels[2][1].paint([1,1,1,1]);
            this._pixels[2][4].paint([1,1,1,1]);
            this._pixels[3][1].paint([1,1,1,1]);
            this._pixels[3][2].paint([1,1,1,1]);
            this._pixels[3][3].paint([1,1,1,1]);
            this._pixels[3][4].paint([1,1,1,1]);
            this._pixels[4][1].paint([1,1,1,1]);
            this._pixels[4][4].paint([1,1,1,1]);
            this._pixels[5][1].paint([1,1,1,1]);
            this._pixels[5][4].paint([1,1,1,1]);
            this._pixels[6][1].paint([1,1,0,0]);
            this._pixels[6][2].paint([1,1,1,1]);
            this._pixels[6][3].paint([1,1,1,1]);
            this._pixels[6][4].paint([1,0,0,1]);
        } else if (number == 9) {
            this._pixels[1][1].paint([0,1,1,0]);
            this._pixels[1][2].paint([1,1,1,1]);
            this._pixels[1][3].paint([1,1,1,1]);
            this._pixels[1][4].paint([0,0,1,1]);
            this._pixels[2][1].paint([1,1,1,1]);
            this._pixels[2][4].paint([1,1,1,1]);
            this._pixels[3][1].paint([1,1,0,0]);
            this._pixels[3][2].paint([1,1,1,1]);
            this._pixels[3][3].paint([1,1,1,1]);
            this._pixels[3][4].paint([1,1,1,1]);
            this._pixels[4][4].paint([1,1,1,1]);
            this._pixels[5][4].paint([1,1,1,1]);
            this._pixels[6][1].paint([1,1,0,0]);
            this._pixels[6][2].paint([1,1,1,1]);
            this._pixels[6][3].paint([1,1,1,1]);
            this._pixels[6][4].paint([1,1,1,1]);
        }

    };

    window.Digit = Digit;
}(window));

(function (window) {
    function Pixel (draw, specs) {

        function triangleFactory (points) {
            return draw
                .polygon(points)
                .attr({
                    'fill': '#FFF',
                    'stroke-width': 0
                })
                .addClass('triangle')
                .click(function () {
                    //this.toggleClass('selected');
                });
        }

        function backTriangleFactory (points) {
            return draw
                .polygon(points)
                .attr({
                    'fill-opacity': 0.15,
                    'fill': '#FFF',
                    'stroke-width': 0
                });
        }

        var pixel = draw.group().addClass('pixel'),
            size = specs.size || 50,
            innerMarginRatio = specs.innerMarginRatio || 0.02,
            innerMargin = size * innerMarginRatio;

        var topTriangle = triangleFactory('0,0 '+size/2+','+size/2+' '+size+',0')
                .dmove(0, -innerMargin)
                .addClass('top'),
            rightTriangle = triangleFactory(''+size+',0 '+size/2+','+size/2+' '+size+','+size+'')
                .dmove(innerMargin, 0)
                .addClass('right'),
            bottomTriangle = triangleFactory(''+size+','+size+' '+size/2+','+size/2+' 0,'+size+'')
                .dmove(0, innerMargin)
                .addClass('bottom'),
            leftTriangle = triangleFactory('0,'+size+' '+size/2+','+size/2+' 0,0')
                .dmove(-innerMargin, 0)
                .addClass('left');

        var backTopTriangle = backTriangleFactory('0,0 '+size/2+','+size/2+' '+size+',0')
                .dmove(0, -innerMargin),
            backRightTriangle = backTriangleFactory(''+size+',0 '+size/2+','+size/2+' '+size+','+size+'')
                .dmove(innerMargin, 0),
            backbottomTriangle = backTriangleFactory(''+size+','+size+' '+size/2+','+size/2+' 0,'+size+'')
                .dmove(0, innerMargin),
            backLeftTriangle = backTriangleFactory('0,'+size+' '+size/2+','+size/2+' 0,0')
                .dmove(-innerMargin, 0);

        pixel
            .add(backTopTriangle)
            .add(backRightTriangle)
            .add(backbottomTriangle)
            .add(backLeftTriangle)
            .add(topTriangle)
            .add(rightTriangle)
            .add(bottomTriangle)
            .add(leftTriangle)
            .transform({
                x: specs.x || 0,
                y: specs.y || 0
            });

        this._pixel = pixel;
        this._topTriangle = topTriangle;
        this._rightTriangle = rightTriangle;
        this._bottomTriangle = bottomTriangle;
        this._leftTriangle = leftTriangle;
    }

    Pixel.prototype.getSVG = function () {
        return this._pixel;
    };

    Pixel.prototype.getSelectionMap = function () {
        return [
            this._topTriangle.hasClass('selected') ? 1 : 0,
            this._rightTriangle.hasClass('selected') ? 1 : 0,
            this._bottomTriangle.hasClass('selected') ? 1 : 0,
            this._leftTriangle.hasClass('selected') ? 1 : 0
        ];
    };

    Pixel.prototype.paint = function (map) {
        var self = this;
        if (map[0])
            self._topTriangle.addClass('active');
        else
            self._topTriangle.removeClass('active');
        if (map[1])
            self._rightTriangle.addClass('active');
        else
            self._rightTriangle.removeClass('active');
        if (map[2])
            self._bottomTriangle.addClass('active');
        else
            self._bottomTriangle.removeClass('active');
        if (map[3])
            self._leftTriangle.addClass('active');
        else
            self._leftTriangle.removeClass('active');
    };

    window.Pixel = Pixel;
}(window));