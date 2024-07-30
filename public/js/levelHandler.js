let globalHeight = 800;
let globalWidth = 1920;


function updateLevelJSON(level,canvasHeight,canvasWidth){
    prevWidth = globalWidth;
    prevHeight = globalHeight;

    globalHeight = canvasHeight;
    globalWidth = canvasWidth;

    level.platformInfo.forEach((element,i)=>{
        if(element.horizontal && element.width == prevWidth){
            element.width = globalWidth;
        }else if (element.height == prevHeight){
            element.height = globalHeight;
        }
    });

    level.platformLocations.forEach((element,i)=>{
        if(element.x == prevWidth){
            element.x = globalWidth;
        }else if(element.y == prevHeight){
            element.y = globalHeight;
        }
    });

    level.spawnLocations.forEach((element,i)=>{
        if(element.x == prevWidth-48){
            element.x = globalWidth-48;
        }else if(element.y == prevHeight-48){
            element.y = globalHeight-48;
        }
    });

    return level;
}
