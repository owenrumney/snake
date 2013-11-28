function Segment(size) {
    this.position = new Point(0, 0);
    this.size = size == null ? 10 : size;
    this.next = null;
    this.axis = 1;
    this.direction = 1;
    this.pivotPoints = [];
    this.currentPivot =null;
}

Segment.prototype.setNextSegment = function (segment) {
    this.next = segment;
}

Segment.prototype.setPosition = function (x, y) {
    this.position = new Point(x, y);
}

Segment.prototype.addPivotPoint = function (location, axis, direction) {
    this.pivotPoints.push(new PivotPoint(location, axis, direction));
}

Segment.prototype.move = function () {

    if (this.pivotPoints.length > 0 && !this.currentPivot) {
        this.currentPivot = this.pivotPoints.pop();
    }

    if (this.currentPivot) {
        if (this.position.x == this.currentPivot.position.x &&
            this.position.y == this.currentPivot.position.y) {
            this.axis = this.currentPivot.axis;
            this.direction = this.currentPivot.direction;
            this.currentPivot = null;
        }
    }

    if (this.axis == 1) {
        this.position.x = this.position.x + this.direction;
    }
    if (this.axis == -1) {
        this.position.y = this.position.y + this.direction;
    }
}

