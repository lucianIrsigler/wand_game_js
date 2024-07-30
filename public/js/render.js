const canvas = document.getElementById("gameCanvas")
canvas.width = window.innerWidth* 0.90;
canvas.height = window.innerHeight * 0.80;
var ctx = canvas.getContext("2d");
const gravity = 2;
let prevDirection = null;


//Event listeners
addEventListener('keypress',(event)=>{
    if (event.key=='w' ||event.key=="d"||event.key=="a"||event.key=="s"){
        prevDirection = event.key
    }else if(event.key=="1" || event.key=="2"||event.key=="3"||event.key=="4"){
        hotBar.changeSelection(parseInt(event.key));
    }
})

addEventListener('keydown',(event)=>{
    if (event.key=='w' ||event.key=="d"||event.key=="a"||event.key=="s"){
        prevDirection = event.key
    }
})


addEventListener('mousedown',(event)=>{
})


//Collision detection
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
            object1.speedY+=2
            object1.y+=5
        }else if (minDepth==collisionDepths.bottom){
            object1.y-=5
        }else if(minDepth==collisionDepths.left){
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


//Receive level from server
let level = updateLevelJSON(levelRecieved,canvas.height,canvas.width);
platformInfo=level["platformInfo"];
platformLocations=level["platformLocations"];
spawnLocation = level["spawnLocations"][myCharacterNum];
console.log(canvas.width,canvas.height);
console.log(spawnLocation)
//Add platforms
platforms = []
platformInfo.forEach((element,i)=>{
    let newPlatform = new Platform(canvas,element.width,element.height,"black",element.horizontal);
    platforms.push(newPlatform);
    let loc = platformLocations[i];
    newPlatform.draw(loc.x,loc.y);
})

//Add hotbar
const hotBar = new Hotbar(canvas,200,50);


let spirtes = [];

const sprite = new Sprite(canvas,48,48,"./img/character2.png",myCharacterNum)

sprite.img.onload = ()=> {
    sprite.x = spawnLocation.x;
    sprite.y = spawnLocation.y;
}




function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hotBar.draw();
    

    platforms.forEach((platform)=>{
        platform.redraw();
    })
    //Collision with platforms
    platforms.forEach((platform)=>{
        boxCollision(sprite,platform);
    })
    //check if in air, if in air, then apply gravity
    sprite.ground = platforms.some((platform)=>{
        return (sprite.x>platform.x && sprite.x<platform.x+platform.width &&sprite.y-platform.y<0 && sprite.y-platform.y>-50 )
    })

    sprite.update(prevDirection)
    sprite.draw(prevDirection)

    prevDirection=null;
    requestAnimationFrame(animate);

}

animate()
