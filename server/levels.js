let globalHeight = 800;
let globalWidth = 1920;

const levels = {
    level1: {
        platformInfo: [
            {
                width: globalWidth,
                height: 1,
                horizontal: true
            },
            {
                width: globalWidth,
                height: 1,
                horizontal: true
            },
            {
                width: 1,
                height: globalHeight,
                horizontal: false
            },
            {
                width: 1,
                height: globalHeight,
                horizontal: false
            }
        ],
        platformLocations: [
            {
                x: 0,
                y: 0
            },
            {
                x: 0,
                y: globalHeight
            },
            {
                x: 0,
                y: 0
            },
            {
                x: globalWidth,
                y: 0
            }
        ]
    },
    level2: {
        platformInfo: [
            {
                width: globalWidth,
                height: 1,
                horizontal: true
            },
            {
                width: globalWidth,
                height: 1,
                horizontal: true
            },
            {
                width: 1,
                height: globalHeight,
                horizontal: false
            },
            {
                width: 1,
                height: globalHeight,
                horizontal: false
            },
            {
                width: 500,
                height: 20,
                horizontal: true
            },
            {
                width: 500,
                height: 20,
                horizontal: true
            },
            {
                width: 500,
                height: 20,
                horizontal: true
            },
            {
                width: 500,
                height: 20,
                horizontal: true
            },
            {
                width: 500,
                height: 20,
                horizontal: true
            }
        ],
        platformLocations: [
            {
                x: 0,
                y: 0
            },
            {
                x: 0,
                y: globalHeight
            },
            {
                x: 0,
                y: 0
            },
            {
                x: globalWidth,
                y: 0
            },
            {x:-10,y:200},
            {x:globalWidth-550,y:200},
            {x:-10,y:550},
            {x:globalWidth-550,y:550},
            {x:700,y:400}
        ],
        spawnLocations:[
            {x:40,y:152},
            {x:globalWidth-48,y:150},
            {x:40,y:globalHeight-48},
            {x:globalWidth-48,y:globalHeight-48}
        ]
    }
}

// function getLevel(levelToReturn,canvasHeight,canvasWidth){
//     prevWidth = globalWidth;
//     prevHeight = globalHeight;

//     globalHeight = canvasHeight;
//     globalWidth = canvasWidth;

//     let level = levels[levelToReturn];

//     level.platformInfo.forEach((element,i)=>{
//         if(element.horizontal && element.width == prevWidth){
//             element.width = globalWidth;
//         }else if (element.height == prevHeight){
//             element.height = globalHeight;
//         }
//     });

//     level.platformLocations.forEach((element,i)=>{
//         if(element.x == prevWidth){
//             element.x = globalWidth;
//         }else if(element.y == prevHeight){
//             element.y = globalHeight;
//         }
//     });


//     return levels[levelToReturn];
// }

function getLevel(levelToReturn){
    let level = levels[levelToReturn];
    return level;
}


module.exports={
    getLevel
}