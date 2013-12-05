
var canvas;
var snake;

test("create snake results in a snake object", function () {
    setup();
    ok((snake)    , "Passed!");
});

test("grow snake increases size", function () {
        setup();
        snake.grow();
       ok( snake.segments.length == 5   , "Passed!");
});

test("snake and food collision (snake.x in food)", function () {

        setup();
        var food = new Food(100, 100);
        snake.setPosition(101, 101);
        ok(snake.detectCollisions(food, function() {
            return true;
        }), "Passed!");
});

test("snake and food no collision (snake.x in food BUT snake.y not in food)", function () {

    setup();
    var food = new Food(100, 120);
    snake.setPosition(101, 101);
    ok(!snake.detectCollisions(food, function() {
        return true;
    }), "Passed!");
});

function setup() {
    canvas = document.createElement("canvas");
    snake = new Snake(4, canvas);
}