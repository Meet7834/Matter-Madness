// destrcturing for easier access 
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    World = Matter.World,
    Mouse = Matter.Mouse;
    
const bodies = []; // this array will keep track of bodies inside the world

// this will be used for resizing and initializing size of walls
const canvas = document.getElementById("canvas");
let canvasHeight = canvas.clientHeight;
let canvasWidth = canvas.clientWidth;
let render = null;
const engine = Engine.create();
let mouseConstraint = null;

const renderWorld = () => {
    // for rendering the canvas
    render = Render.create({
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
    mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            render: { visible: false }
        }
    })
    render.mouse = mouse;
    bodies.push(mouseConstraint);

    // render the world
    Runner.run(engine);
    Render.run(render);
}