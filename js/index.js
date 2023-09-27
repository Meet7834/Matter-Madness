// destrcturing for easier access 
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    World = Matter.World,
    Mouse = Matter.Mouse;

const engine = Engine.create(); 

// this will be used for resizing and initializing size of walls
const canvas = document.getElementById("canvas");
let canvasHeight = canvas.clientHeight;
let canvasWidth = canvas.clientWidth;

const bodies = []; // this array will keep track of bodies inside the world

// create boundries or walls for each side of the canvas (30 is the thickness). NOTE: x and y are supposed to be center of mass 
const groundWall = Bodies.rectangle(canvasWidth / 2, canvasHeight , canvasWidth , 30, { isStatic: true}) // x pos, y pos, width, height, opt
const rightWall = Bodies.rectangle(canvasWidth, canvasHeight / 2, 30, canvasHeight , { isStatic: true }) 
const leftWall = Bodies.rectangle(0, canvasHeight / 2, 30, canvasHeight , { isStatic: true }) 
const topWall = Bodies.rectangle(canvasWidth / 2, 0, canvasWidth , 30, { isStatic: true })

// create 2 squares to play around with. NOTE: x and y are supposed to be center of mass
const boxA = Bodies.rectangle(100, 210, 80, 80); // x pos, y pos, width, height, opt
const boxB = Bodies.rectangle(700, 70, 80, 80);

// push all the bodies in the array so that it's easier to render 
bodies.push(boxA);
bodies.push(boxB);
bodies.push(rightWall);
bodies.push(leftWall);
bodies.push(topWall);
bodies.push(groundWall);

// for rendering the canvas
let render = Render.create({
    element: document.querySelector("#canvas"),
    engine: engine,
    options: {
        height: canvas.clientHeight + 1,
        width: canvas.clientWidth + 1,
        wireframes: false // this will make bodies look little bit better graphics wise
    }
});

// to drag bodies around we will need to create a mouse constraint
let mouse = Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
})
render.mouse = mouse;
bodies.push(mouseConstraint);

// add all the bodies we created to the world
World.add(engine.world, bodies);

// render the world
Runner.run(engine);
Render.run(render);

// if user resizes window this will resize canvas and walls
const resizeCanvas = () =>{
    
    // recalculates the height and width of the canvas 
    canvasHeight = canvas.clientHeight;
    canvasWidth = canvas.clientWidth;

    // updates center of mass of all the walls
    Body.setPosition(groundWall, { x: canvasWidth / 2, y: canvasHeight });
    Body.setPosition(rightWall, { x: canvasWidth, y: canvasHeight / 2 });
    Body.setPosition(leftWall, { x: 0, y: canvasHeight / 2 });
    Body.setPosition(topWall, { x: canvasWidth / 2, y: 0 });

    // updates all 4 vertices of each wall. NOTE: vertices order : topLeft -> topRight -> bottomRight -> bottomLeft
    Body.setVertices(groundWall, [
        { x: 0, y: canvasHeight}, // topLeft
        { x: canvasWidth, y: canvasHeight }, // topRight
        { x: canvasWidth, y: canvasHeight + 30 }, // bottomRight
        { x: 0, y: canvasHeight + 30} // bottomLeft
    ]);

    Body.setVertices(rightWall, [
        { x: canvasWidth, y: 0 }, // topLeft
        { x: canvasWidth + 30, y: 0 }, // topRight
        { x: canvasWidth + 30, y: canvasHeight}, // bottomRight
        { x: canvasWidth, y: canvasHeight} // bottomLeft
    ]);

    Body.setVertices(leftWall, [
        { x: -30, y: 0 }, // topLeft
        { x: 0, y: 0 }, // topRight
        { x: 0, y: canvasHeight }, // bottomRight
        { x: -30, y: canvasHeight } // bottomLeft
    ]);

    Body.setVertices(topWall, [
        { x: 0, y: -30 }, // topLeft
        { x: canvasWidth, y: -30 }, // topRight
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

// canvas will resize if the user resizes browser window
window.addEventListener('resize', resizeCanvas);