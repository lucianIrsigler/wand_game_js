class Powerup {
    constructor(element,radius,startAngle,endAngle,colour,borderWidth,borderColour) {
        this.element = element;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.colour = colour;
        this.borderWidth = borderWidth;
        this.borderColour = borderColour;    
    }


    draw(newX,newY){
        var ctx = this.element.getContext("2d");
        ctx.beginPath();
        ctx.arc(newX, newY, this.radius, this.startAngle, this.endAngle);
        ctx.fillStyle = this.colour;
        ctx.fill()
        ctx.lineWidth = this.borderWidth;
        ctx.strokeStyle = this.borderColour;
        ctx.stroke()
    }
}