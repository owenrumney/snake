window.onload = function () {
    var canvas = document.getElementById('playboard');
    if (!canvas){
        return;
    }
    var ctx = canvas.getContext('2d');
    var snake = new Snake(2, canvas);
    var food = new Food(0, 0);


    food.randomPosition(canvas.width, canvas.height);

    var fps = 60;
    var now;
    var then = Date.now();
    var interval = 1000 / fps;
    var delta;


    snake.setPosition(150, 100);
    snake.draw(ctx);


    function animate() {

        now = Date.now();
        delta = now - then;

        if (delta > interval) {

            then = now - (delta % interval);

            snake.detectCollisions(food, function () {
                food.randomPosition(canvas.width, canvas.height);
                snake.grow();
            });
            snake.move();
            snake.draw(ctx);
            food.draw(ctx);
        }

        requestAnimFrame(animate);
    }

    animate();

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
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();