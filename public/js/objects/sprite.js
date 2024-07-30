class Sprite{
    constructor(element,width,height,path,characterNum){
        this.element = element;
        this.ctx = this.element.getContext("2d");
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.path = path;
        this.speedX =5;
        this.speedY =1.2;
        this.gravity = .01;
        this.dx = 0;
        this.dy = 0;
        this.jumpSpeed = -2.5;
        this.img = new Image();
        this.img.src = this.path;
        this.ground = false;
        this.characterNum = characterNum
        //1 for R, -1 for L
        this.lastDirection = 1
        this.row = Math.floor(this.characterNum/2)
    }

    draw(direction){
        if (this.lastDirection==1){
            var sx = this.characterNum*96-192*this.row;
            var sy = this.row*48;
            ctx.drawImage(this.img,sx,sy,48,48,this.x, this.y,48,48);
        }else{
            var sx=(this.characterNum*2+1)*48 - 192*this.row
            var sy=this.row*48;
            ctx.drawImage(this.img,sx,sy,48,48,this.x, this.y,48,48);
        }
    }

    invertDirection(){
        this.lastDirection*-1;
    }

    update(direction){
        //https://stackoverflow.com/questions/68414810/jumping-moving-and-gravity-in-my-2d-javascript-game
        //https://www.siyavula.com/read/za/physical-sciences/grade-10/motion-in-one-dimension/21-motion-in-one-dimension-07
        
        const deltaTime = 3;
        if (!this.ground){
            this.dy = this.speedY*deltaTime+1/2*this.gravity*Math.pow(deltaTime,2)
            this.y+=this.dy
            this.speedY += this.gravity*deltaTime;
        }else{
            this.speedY=1.2
        }

        this.dx = (this.speedX*this.lastDirection)*deltaTime       

        if (direction=="w"){
            this.speedY = this.jumpSpeed;
            this.dy = this.speedY*deltaTime+1/2*this.gravity*Math.pow(deltaTime,2)
            this.y+=this.dy
            this.x+=this.dx
        }else if (direction=="a"){
            this.lastDirection = -1
            this.x+=this.dx

        }else if(direction=="d"){
            this.lastDirection = 1
            this.x+=this.dx
        }
        this.speedX =5;
    }


}