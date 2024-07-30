/**
 * Author: Lucian Irsigler
 * Date: 2024/07/30
 * This file handles updating the level JSON to fit the client's screen size.
 */

let globalWidth = 1920;
let globalHeight = 800;

/**
 * The way a level is stored:
 *   Server does not know the screen sizes of its clients, so it defaults to 1920x800.
 *   We can update this screensize dynamically to fit the client's screen size using the above
 *   information.
 * @param {JSON} level 
 * @param {int} canvasHeight 
 * @param {int} canvasWidth 
 * @returns updated level
 */
function updateLevelJSON(level,canvasHeight,canvasWidth){
    prevWidth = globalWidth;
    prevHeight = globalHeight;

    globalHeight = canvasHeight;
    globalWidth = canvasWidth;

    //update platform information
    level.platformInfo.forEach((element,i)=>{
        if(element.horizontal && element.width == prevWidth){
            element.width = globalWidth;
        }else if (element.height == prevHeight){
            element.height = globalHeight;
        }
    });

    //update platform locations
    level.platformLocations.forEach((element,i)=>{
        if(element.x == prevWidth){
            element.x = globalWidth;
        }else if(element.y == prevHeight){
            element.y = globalHeight;
        }
    });

    //update spawn locations
    level.spawnLocations.forEach((element,i)=>{
        if(element.x == prevWidth-48){
            element.x = globalWidth-48;
        }else if(element.y == prevHeight-48){
            element.y = globalHeight-48;
        }
    });

    return level;
}
