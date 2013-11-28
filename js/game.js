window.onload = function () {
    var canvas = document.getElementById('playboard');
    var ctx = canvas.getContext('2d');
    var snake = new Snake(5, canvas);
    snake.setPosition(150, 100);
    snake.draw(ctx);
    var counter = 0;
    var direction = 0;

    function move() {
        snake.move();
        snake.draw(ctx);
        requestAnimFrame(move);
    }
    requestAnimFrame(move);
    move();

    document.onkeyup = function (e) {
        switch (e.keyCode) {
            case 37:
                snake.changeDirection(3);
                break;
            case 38:
                snake.changeDirection(0);
                break;
            case 39:
                snake.changeDirection(1);
                break;
            case 40:
                snake.changeDirection(2);
                break;
        }
    }
}

window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();