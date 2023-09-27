const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    World = Matter.World,
    Mouse = Matter.Mouse;

const engine = Engine.create();
const canvas = document.getElementById("canvas");
let canvasHeight = canvas.clientHeight;
let canvasWidth = canvas.clientWidth;

const bodies = [];
const ground = Bodies.rectangle(400, 600, 1000, 50, { isStatic: true })
const rightBar = Bodies.rectangle(0, 500, 50, 1000, { isStatic: true })
const leftBar = Bodies.rectangle(900, 500, 50, 1000, { isStatic: true })
const upperBar = Bodies.rectangle(400, 0, 1000, 50, { isStatic: true })
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);

bodies.push(boxA);
bodies.push(boxB);
bodies.push(rightBar);
bodies.push(leftBar);
bodies.push(upperBar);
bodies.push(ground);

let render = Render.create({
    element: document.querySelector("#canvas"),
    engine: engine,
    options: {
        height: canvas.clientHeight + 1,
        width: canvas.clientWidth,
        wireframes: false
    }
});

let mouse = Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
})

render.mouse = mouse;
bodies.push(mouseConstraint);

World.add(engine.world, bodies);

Runner.run(engine);
Render.run(render);

window.addEventListener('resize', () => { 
    canvasHeight = canvas.clientHeight;
    canvasWidth = canvas.clientWidth;

    render.bounds.max.x = canvasWidth;
    render.bounds.max.y = canvasHeight;
    render.options.width = canvasWidth;
    render.options.height = canvasHeight;
    render.canvas.width = canvasWidth;
    render.canvas.height = canvasHeight;
});