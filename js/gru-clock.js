(function (window) {
    function GruClock (containerObject) {
        var draw = SVG(containerObject)
            .fixSubPixelOffset()
            .size('100%', '100%')
            .addClass('gru-clock');

        var wrapper = draw.parent,
            wrapperWidth = wrapper.offsetWidth,
            builderTimer;

        var hour1, hour2,
            min1, min2,
            topBeat, bottomBeat;

        var spaceBetweenDigits = 20,
            pixelMarginRatio = 0.1,
            pixelInnerMarginRatio = 0.02;

        drawClock();

        setInterval(function () {
            beat();
            setClock();
        }, 2000);

        function drawClock () {
            var pixelSize = (wrapperWidth - 4*spaceBetweenDigits) / (25*(1 + pixelMarginRatio + pixelInnerMarginRatio));

            hour1 = new Digit(draw, {
                pixelSize: pixelSize,
                pixelMarginRatio: pixelMarginRatio,
                pixelInnerMarginRatio: pixelInnerMarginRatio
            }),
            hour2 = new Digit(draw, {
                pixelSize: pixelSize,
                pixelMarginRatio: pixelMarginRatio,
                pixelInnerMarginRatio: pixelInnerMarginRatio,
                x: hour1.getSVG().bbox().x2 + spaceBetweenDigits
            });

            topBeat = new Pixel(draw, {
                size: pixelSize,
                x: hour2.getSVG().bbox().x2 + spaceBetweenDigits,
                y: hour2.getSVG().bbox().y + 2*pixelSize*(1 + pixelMarginRatio + pixelInnerMarginRatio)
            }),
            bottomBeat = new Pixel(draw, {
                size: pixelSize,
                x: hour2.getSVG().bbox().x2 + spaceBetweenDigits,
                y: topBeat.getSVG().bbox().y2 + 2*pixelSize*(1 + pixelMarginRatio + pixelInnerMarginRatio)
            });

            topBeat.getSVG().addClass('beat');
            bottomBeat.getSVG().addClass('beat');

            min1 = new Digit(draw, {
                pixelSize: pixelSize,
                pixelMarginRatio: pixelMarginRatio,
                pixelInnerMarginRatio: pixelInnerMarginRatio,
                x: topBeat.getSVG().bbox().x2 + spaceBetweenDigits
            }),
            min2 = new Digit(draw, {
                pixelSize: pixelSize,
                pixelMarginRatio: pixelMarginRatio,
                pixelInnerMarginRatio: pixelInnerMarginRatio,
                x: min1.getSVG().bbox().x2 + spaceBetweenDigits
            });

            // resize parent based on svg's content size
            wrapper.style["height"] = draw.bbox().height + 'px';
            wrapper.style["margin-top"] = -draw.bbox().height/2 + 'px';
        }

        function beat () {
            topBeat.paint([1,1,1,1]);
            bottomBeat.paint([1,1,1,1]);
            setTimeout(function () {
                topBeat.paint([0,0,0,0]);
                bottomBeat.paint([0,0,0,0]);
            }, 1000);
        }

        function setClock () {
            var hour = new Date().getHours(),
                minute = new Date().getMinutes();
            hour1.print(Math.floor(hour/10));
            hour2.print(hour % 10);
            min1.print(Math.floor(minute/10));
            min2.print(minute % 10);
        }

        /*
         window.onresize = function () {
         if (wrapperWidth !== wrapper.offsetWidth) {
         wrapperWidth = wrapper.offsetWidth;
         clearTimeout(builderTimer);
         draw.clear();
         builderTimer = setTimeout(function () {
         drawClock();
         }, 2000);
         }
         };
         */
    }

    window.GruClock = GruClock;
}(window));
