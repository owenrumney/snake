function Food(x, y) {
    this.position = new Point(x, y);
    this.color = "yellow";
    this.size = 10;
}

Food.prototype.draw = function (context) {
    context.beginPath();
    context.rect(this.position.x, this.position.y,
        this.size, this.size);
    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.fill();
    context.stroke();
}

Food.prototype.setPosition = function(x, y) {
    this.position.x = x;
    this.position.y = y;
}

Food.prototype.randomPosition = function (width, height) {
    var xpos = Math.random() * width - this.size;
    var ypos = Math.random() * height - this.size;
    this.setPosition(xpos, ypos);
};