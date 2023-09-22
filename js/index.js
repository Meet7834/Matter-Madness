let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    World = Matter.World,
    Mouse = Matter.Mouse;

let engine = Engine.create();

let render = Render.create({
    element: document.querySelector(".sandbox"),
    engine: engine,
    options: {
        height: 600,
        width: 900,
        wireframes: false
    }
});

const bodies = [];
let ground = Bodies.rectangle(400, 600, 1000, 50, { isStatic: true })
let rightBar = Bodies.rectangle(0, 500, 50, 1000, { isStatic: true })
let leftBar = Bodies.rectangle(900, 500, 50, 1000, { isStatic: true })
let upperBar = Bodies.rectangle(400, 0, 1000, 50, { isStatic: true })
let boxA = Bodies.rectangle(400, 200, 80, 80);
let boxB = Bodies.rectangle(450, 50, 80, 80);

bodies.push(boxA);
bodies.push(boxB);
bodies.push(rightBar);
bodies.push(leftBar);
bodies.push(upperBar);
bodies.push(ground);

let mouse = Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint:{
        render: { visible: false }
    }
})

render.mouse = mouse;
bodies.push(mouseConstraint);


World.add(engine.world, bodies);

Runner.run(engine);
Render.run(render);