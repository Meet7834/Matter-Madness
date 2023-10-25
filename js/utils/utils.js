// functions: addWalls, clearCanvas, resizeCanvas;

let groundWall = null;
let rightWall = null;
let leftWall = null;
let topWall = null;

const addWalls = () => {
    // create boundries or walls for each side of the canvas. 
    // arguments: x pos, y pos, width, height, opt
    // x and y are supposed to be center of mass 
    groundWall = Bodies.rectangle(canvasWidth / 2, canvasHeight + 235, canvasWidth, 500, { isStatic: true })
    rightWall = Bodies.rectangle(canvasWidth + 235, canvasHeight / 2, 500, canvasHeight, { isStatic: true })
    leftWall = Bodies.rectangle(-235, canvasHeight / 2, 500, canvasHeight, { isStatic: true })
    topWall = Bodies.rectangle(canvasWidth / 2, -235, canvasWidth, 500, { isStatic: true })

    defaultBodies.push(rightWall);
    defaultBodies.push(leftWall);
    defaultBodies.push(topWall);
    defaultBodies.push(groundWall);
}

// this will remove all the objects from the world
const clearCanvas = () => {
    World.remove(engine.world, bodies); // remove all the bodies from the world using our array
    World.remove(engine.world, defaultBodies); // remove all the bodies from the world using our array
    bodies.length = 0; // empty the bodies array
    defaultBodies.length = 0; // empty the default bodies array
    numberOfBodies = 0; // set the number of bodies to zero

    addWalls(); // add the wall to the canvas
    renderMouseConstraint(); // add mouse constraint
    World.add(engine.world, defaultBodies); // add all the bodies to the world
    World.add(engine.world, bodies); // add all the bodies to the world
    renderBodiesDiv();
}

// if user resizes window this will resize canvas and walls
const resizeCanvas = () => {
    checkWindowSize();
    // recalculates the height and width of the canvas 
    canvasHeight = canvas.clientHeight;
    canvasWidth = canvas.clientWidth;

    // updates center of mass of all the walls
    Body.setPosition(groundWall, { x: canvasWidth / 2, y: canvasHeight + 235 });
    Body.setPosition(rightWall, { x: canvasWidth + 235, y: canvasHeight / 2 });
    Body.setPosition(leftWall, { x: -235, y: canvasHeight / 2 });
    Body.setPosition(topWall, { x: canvasWidth / 2, y: -235 });

    // updates all 4 vertices of each wall. NOTE: vertices order : topLeft -> topRight -> bottomRight -> bottomLeft
    Body.setVertices(groundWall, [
        { x: 0, y: canvasHeight }, // topLeft
        { x: canvasWidth, y: canvasHeight }, // topRight
        { x: canvasWidth, y: canvasHeight + 500 }, // bottomRight
        { x: 0, y: canvasHeight + 500 } // bottomLeft
    ]);

    Body.setVertices(rightWall, [
        { x: canvasWidth, y: 0 }, // topLeft
        { x: canvasWidth + 500, y: 0 }, // topRight
        { x: canvasWidth + 500, y: canvasHeight }, // bottomRight
        { x: canvasWidth, y: canvasHeight } // bottomLeft
    ]);

    Body.setVertices(leftWall, [
        { x: -500, y: 0 }, // topLeft
        { x: 0, y: 0 }, // topRight
        { x: 0, y: canvasHeight }, // bottomRight
        { x: -500, y: canvasHeight } // bottomLeft
    ]);

    Body.setVertices(topWall, [
        { x: 0, y: -500 }, // topLeft
        { x: canvasWidth, y: -500 }, // topRight
        { x: canvasWidth, y: 0 }, // bottomRight
        { x: 0, y: 0 } // bottomLeft
    ]);

    // resizes the canvas. NOTE: added +1 becuase it looked little glitchy in with the previous length 
    render.bounds.max.x = canvasWidth + 1;
    render.bounds.max.y = canvasHeight + 1;
    render.options.width = canvasWidth + 1;
    render.options.height = canvasHeight + 1;
    render.canvas.width = canvasWidth + 1;
    render.canvas.height = canvasHeight + 1;
}

const refreshedPage = () => {
    renderBodiesDiv();
}

// Custom replacer function to handle circular references
function circularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return; // Skip circular references
            }
            seen.add(value);
        }
        return value;
    };
}