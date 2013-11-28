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
}

Snake.prototype.setPosition = function setPosition(x, y) {
    var xpos = x;
    var current = null;
    for (var i = 0; i < this.size; i++) {
        var s = new Segment(10);
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

Snake.prototype.draw = function (context) {

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
    function moveSegment(segment) {
        segment.move();
    }

    this.segments.map(moveSegment);
}

Snake.prototype.changeDirection = function (newDirection) {
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
