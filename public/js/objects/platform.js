class Platform{
    constructor(element,width,height,colour,horizontal){
        this.element = element;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.x = 0;
        this.y = 0;
        this.horizontal = horizontal
    }

    draw(newX,newY){
        this.x = newX
        this.y = newY
        var ctx = this.element.getContext("2d");
        ctx.fillStyle = this.colour;
        ctx.fillRect(newX,newY,this.width,this.height);
    }

    redraw(){
        var ctx = this.element.getContext("2d");
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}