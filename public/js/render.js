const canvas = document.getElementById("gameCanvas")
canvas.width = window.innerWidth* 0.90;
canvas.height = window.innerHeight * 0.80;
var ctx = canvas.getContext("2d");
const gravity = 2;
let prevDirection = null;

function boxCollision(object1,object2){
    if(
        object1.x+object1.width >= object2.x&&
        object1.x<=object2.x+object2.width &&
        object1.y+object1.height >= object2.y&&
        object1.y<=object2.y+object2.height
    ){

        const collisionDepths = {
            top: object2.y + object2.height - object1.y,
            bottom: object1.y + object1.height - object2.y,
            left: object2.x + object2.width - object1.x,
            right: object1.x + object1.width - object2.x
        };

        const minDepth = Math.min(
            collisionDepths.top,
            collisionDepths.bottom,
            collisionDepths.left,
            collisionDepths.right
        );

        if (minDepth==collisionDepths.top){
            console.log("top")
            object1.speedY+=2
            object1.y+=5
        }else if (minDepth==collisionDepths.bottom){
            console.log("bottom")
            object1.y-=5
        }else if(minDepth==collisionDepths.left){
            console.log("left")
            object1.x+=10
            object1.invertDirection()
        }else{
            object1.x-=10
            object1.invertDirection()
        }
        return true;
    }
    return false;
}
//const circle = new Circle(canvas,20,0,2*Math.PI,"red",4,"black");
//circle.draw(100,100)

level = getLevel("level2",canvas.height,canvas.width);
platformInfo=level["platformInfo"];
platformLocations=level["platformLocations"];

console.log(level)
platforms = []


platformInfo.forEach((element,i)=>{
    let newPlatform = new Platform(canvas,element.width,element.height,"black",element.horizontal);
    platforms.push(newPlatform);
    let loc = platformLocations[i];
    newPlatform.draw(loc.x,loc.y);
})


const sprite = new Sprite(canvas,48,48,"./img/character2.png",2)

sprite.img.onload = ()=> {
    sprite.x = 10;
    sprite.y =10
}


addEventListener('keypress',(event)=>{
    if (event.key=='w' ||event.key=="d"||event.key=="a"||event.key=="s"){
        prevDirection = event.key
    }
})

addEventListener('mousedown',(event)=>{

})

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    platforms.forEach((platform)=>{
        platform.redraw();
    })
    //Collision with platforms
    platforms.forEach((platform)=>{
        boxCollision(sprite,platform);
    })
    //check if in air, if in air, then apply gravity
    sprite.ground = platforms.some((platform)=>{
        //console.log(sprite.y-platform.y)
        return (sprite.x>platform.x && sprite.x<platform.x+platform.width &&sprite.y-platform.y<0 && sprite.y-platform.y>-50 )
    })

    sprite.update(prevDirection)
    sprite.draw(prevDirection)

    prevDirection=null
    requestAnimationFrame(animate);

}

animate()
