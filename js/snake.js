function Point(x, y) {
    this.x = x;
    this.y = y;
}

function PivotPoint(location, axis, direction) {
    this.position = new Point(location.x, location.y);
    this.axis = axis;
    this.direction = direction;
}

function Snake(size, canvas) {
    this.size = size;
    this.canvas = canvas;
    this.segments = [];
    this.head = null;
    this.growing = false;
    this.initialise();
}

Snake.prototype.initialise = function initialise() {
    var xpos = 0;
    var y = 0;
    var current = null;
    for (var i = 0; i < this.size; i++) {
        var s = new Segment(xpos, y, 1, 1, 10);
        xpos = xpos - s.size - 2;
        s.setPosition(xpos, y);
        this.segments.push(s);
        if (current != null) {
            current.setNextSegment(s);
        }
        current = s;
    }
    this.head = this.segments[0];
}

Snake.prototype.setPosition = function setPosition(x, y) {
    var xpos = x;
    this.head.position.x = x;
    this.head.position.y = y;
    for (var i = 1;i<this.segments.length;i++) {

            var s= this.segments[i];
            xpos = xpos - s.size - 2;
            s.setPosition(xpos, y);
    }
}

Snake.prototype.draw = function (context) {
    while (this.growing) {
    }
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    function drawSegment(segment) {
        context.beginPath();
        context.rect(segment.position.x, segment.position.y,
            segment.size, segment.size);
        context.fillStyle = 'red';
        context.strokeStyle = 'red';
        context.fill();
        context.stroke();
    }

    this.segments.map(drawSegment);
}

Snake.prototype.move = function () {
    while (this.growing) {
    }
    function moveSegment(segment) {
        segment.move();
    }

    this.segments.map(moveSegment);
};

Snake.prototype.changeDirection = function (newDirection) {

    while (this.growing) {
    }
    switch (newDirection) {
        case 0:
            this.head.axis = -1;
            this.head.direction = -1;
            break;
        case 1:
            this.head.axis = 1;
            this.head.direction = 1;
            break;
        case 2:
            this.head.axis = -1;
            this.head.direction = 1;
            break;
        case 3:
            this.head.axis = 1;
            this.head.direction = -1;
            break;
    }

    function addPivot(segment) {
        if (segment === this.head)
            return;

        segment.addPivotPoint(this.head.position, this.head.axis,
            this.head.direction);
    }

    this.segments.slice(1).map(addPivot, this);
}

Snake.prototype.detectCollisions = function (food, collisionCallback) {
//console.table(food);
    if (this.head.position.x >= food.position.x && this.head.position.x <= food.position.x + food.size
        && this.head.position.y >= food.position.y && this.head.position.y <= food.position.y + food.size) {
        collisionCallback();
        return true;
    }
    else {
        return false;
    }
}

Snake.prototype.grow = function () {
    this.growing = true;
    var newX, newY;
    var last = this.segments.slice(-1)[0];
    if (last.direction == 1 && last.axis == 1) {
        newX = last.position.x - (last.size + 2);
        newY = last.position.y;
    }
    if (last.direction == -1 && last.axis == 1) {
        newX = last.position.x + (last.size + 2);
        newY = last.position.y;
    }
    if (last.direction == 1 && last.axis == -1) {
        newY = last.position.y - (last.size + 2);
        newX = last.position.x;
    }
    if (last.direction == -1 && last.axis == -1) {
        newY = last.position.y + (last.size - 2);
        newX = last.position.x;
    }

    var s = new Segment(newX, newY, last.axis, last.direction, last.size);

    for (var pivot in last.pivotPoints) {
        if (s) {
            s.pivotPoints.add(pivot);
        }
    }
    this.segments.push(s);
    this.growing = false;
    //last.pivotPoints.map(function(seg) {s.addPivotPoint(seg.location, seg.axis, seg.direction)})

}