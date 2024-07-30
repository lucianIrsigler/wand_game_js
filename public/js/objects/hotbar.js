class Hotbar{
    constructor(element,width,height) {
        this.element = element;
        this.width = width;
        this.height = height;
        this.selected = 1;
    }

    draw(){
        var ctx = this.element.getContext("2d");
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        const interval = this.width/4
        for (let i = 0; i < 4; i++){
            if (i+1!=this.selected){
                ctx.strokeRect(i*interval, 0, interval, this.height);
            }
        }

        ctx.fillStyle = "#fcf390"
        ctx.strokeRect((this.selected-1)*interval, 0, interval, this.height);
        ctx.fillRect((this.selected-1)*interval, 0, interval, this.height);

        ctx.font = "12px Arial";
        ctx.fillStyle = 'black';

        for (let i=0;i<4;i++){
            ctx.fillText(i+1,2+(50*i),12);
        }
    }

    changeSelection(newSelection){
        this.selected = newSelection;
    }
}