// clear playground
const clearPlaygroundBtn = document.querySelectorAll(".clearPlaygroundBtn");
clearPlaygroundBtn.forEach((btn) => {
    btn.addEventListener("click", clearCanvas);
})

// render the demo for the playground
const renderDemoBtn = document.querySelector("#renderDemoBtn");
renderDemoBtn.addEventListener("click", () => {

    // { this is part of clearCanvas function
    World.remove(engine.world, bodies); // remove all the bodies from the world using our array
    World.remove(engine.world, defaultBodies); // remove all the bodies from the world using our array
    bodies.length = 0; // empty the bodies array
    defaultBodies.length = 0; // empty the defaultBodies array
    numberOfBodies = 0; // set the number of bodies to zero


    addWalls(); // add the wall to the canvas
    renderMouseConstraint(); // add mouse constraint
    // }

    renderDemo(); // render the demo
    World.add(engine.world, defaultBodies);
    World.add(engine.world, bodies);
    refreshedPage();
});

// hide and show things
// 1. hide/show advanced options:
const showAdvancedCheck = document.querySelector("#advancedOptionsInput");
const showAdvancedDiv = document.querySelector("#advancedOptionsDiv");
showAdvancedCheck.addEventListener("change", () => {
    if (showAdvancedCheck.checked) showAdvancedDiv.classList.remove("hide");
    else showAdvancedDiv.classList.add("hide");
})

// 2. hide/show options based on body type selected
let bodyTypeSelect = document.querySelector(".bodyTypeSelect");
const checkWindowSize = () => {
    if (window.innerWidth <= 700) {
        bodyTypeSelect = document.querySelectorAll(".bodyTypeSelect")[1];
    }
    else bodyTypeSelect = document.querySelectorAll(".bodyTypeSelect")[0];
}
const selectOnChange = () => {
    const selectedBodyType = bodyTypeSelect.value;
    const widthInputDiv = document.querySelector("#widthInputDiv");
    const heightInputDiv = document.querySelector("#heightInputDiv");
    const sidesInputDiv = document.querySelector("#sidesInputDiv");
    const radiusInputDiv = document.querySelector("#radiusInputDiv");

    widthInputDiv.classList.add("hide");
    heightInputDiv.classList.add("hide");
    sidesInputDiv.classList.add("hide");
    radiusInputDiv.classList.add("hide");

    if (selectedBodyType == "rectangle") {
        widthInputDiv.classList.remove("hide");
        heightInputDiv.classList.remove("hide");
    }
    else if (selectedBodyType == "circle") {
        radiusInputDiv.classList.remove("hide");
    }
    else if (selectedBodyType == "polygon") {
        radiusInputDiv.classList.remove("hide");
        sidesInputDiv.classList.remove("hide");
    }
}
bodyTypeSelect.addEventListener("change", () => selectOnChange());

// add a body
const addBodyBtn = document.querySelectorAll(".addBodyBtn");
addBodyBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        // get selected bodyType and body name
        const bodyType = bodyTypeSelect.value;
        let bodyName = document.querySelector("#bodyName").value;
        if (bodyName.trim() == "") bodyName = bodyType.charAt(0).toUpperCase() + bodyType.slice(1) + " Body #" + (++numberOfBodies);

        // get all the values from the form
        let x = parseFloat(document.querySelector("#xPos").value);
        let y = parseFloat(document.querySelector("#yPos").value);
        let width = parseFloat(document.querySelector("#widthInput").value) || 75;
        let height = parseFloat(document.querySelector("#heightInput").value) || 75;
        let radius = parseFloat(document.querySelector("#radiusInput").value) || 50;
        let sides = parseInt(document.querySelector("#sidesInput").value) || 3;
        let isStatic = (document.querySelector("#isStaticInput").checked) ? true : false;

        // if user is trying to render the object outside the world:
        // lower limits:
        if (bodyType == "rectangle") {
            if (x < 15 + width / 2) x = 16 + width / 2;
            if (y < 15 + height / 2) y = 16 + height / 2;
        } else if (bodyType == "circle" || bodyType == "polygon") {
            if (x < 16 + radius / 2) x = 16 + radius;
            if (y < 16 + radius / 2) y = 16 + radius;
        }
        // upper limits:
        if (x > canvasWidth) x = canvasWidth / 2;
        if (y > canvasHeight) y = canvasHeight / 2;

        // if the user didn't fill x and y values
        if (isNaN(x)) x = canvasWidth / 2;
        if (isNaN(y)) y = canvasHeight / 2;

        // if user is trying to render a object bigger than the world:
        if (width > canvasWidth) width = canvasWidth - 30;
        if (height > canvasHeight) height = canvasHeight - 30;
        if (radius > canvasWidth / 2 || radius > canvasHeight / 2) radius = (Math.min(canvasHeight, canvasWidth) / 2) - 15;

        // if advanced options is checked
        let color = null, restitution = 0.1, angle = 0, friction = 0.1, frictionAir = 0.01, frictionStatic = 0.5;
        if (showAdvancedCheck.checked) {
            color = document.querySelector("#fillStyleInput").value;
            restitution = parseFloat(document.querySelector("#restitutionInput").value);
            angle = (parseFloat(document.querySelector("#angleInput").value) / 180 * 3.14) || 0;
            friction = parseFloat(document.querySelector("#frictionInput").value);
            frictionAir = parseFloat(document.querySelector("#frictionAirInput").value);
            frictionStatic = parseFloat(document.querySelector("#frictionStaticInput").value);
        }

        // if the user didn't put any value
        if (isNaN(restitution) || restitution < 0) restitution = 0.1;
        if (isNaN(friction) || friction < 0) friction = 0.1;
        if (isNaN(frictionAir) || frictionAir < 0) frictionAir = 0.01;
        if (isNaN(frictionStatic) || frictionStatic < 0) frictionStatic = 0.5;

        // if the user put friction and restitution values to be more than 1
        if (restitution > 1) restitution = 1;
        if (friction > 1) friction = 1;
        if (frictionAir > 1) frictionAir = 1;
        if (frictionStatic > 1) frictionStatic = 1;

        // Create the body based on the selected type and dimensions
        let lineWidth = 0, strokeStyle = null;
        if (isStatic) lineWidth = 5, strokeStyle = "#ffffff";
        let newBody;
        let options = {
            label: bodyName,
            angle: angle,
            friction: friction, frictionAir: frictionAir, frictionStatic: frictionStatic,
            render: {
                fillStyle: color,
                lineWidth: lineWidth,
                strokeStyle: strokeStyle
            },
            restitution: restitution
        }

        if (bodyType === "rectangle") {
            newBody = Bodies.rectangle(x, y, width, height, options);
        } else if (bodyType === "circle") {
            newBody = Bodies.circle(x, y, radius, options);
        } else if (bodyType === "polygon") {
            newBody = Bodies.polygon(x, y, sides, radius, options);
        }

        if (isStatic) {
            newBody.isStatic = true;
            newBody.render.fillStyle = "#14151F"
        }

        // Add the new body to the simulation
        if (newBody != null) {
            bodies.push(newBody);
            World.add(engine.world, newBody);
        }
        refreshedPage();

    });
})


const clearInputBtn = document.querySelector("#clearInputBtn");
clearInputBtn.addEventListener('click', () => {
    document.querySelector("#bodyName").value = "";
    document.querySelector("#xPos").value = "";
    document.querySelector("#yPos").value = "";
    document.querySelector("#widthInput").value = "";
    document.querySelector("#heightInput").value = "";
    document.querySelector("#sidesInput").value = "";
    document.querySelector("#angleInput").value = "";
    document.querySelector("#radiusInput").value = "";
    document.querySelector("#frictionInput").value = "";
    document.querySelector("#frictionAirInput").value = "";
    document.querySelector("#frictionStaticInput").value = "";
    document.querySelector("#isStaticInput").checked = false;
})

const savePlaygroundBtn = document.querySelector(".savePlaygroundBtn");
savePlaygroundBtn.addEventListener("click", () => {
    const savedBodies = JSON.stringify(bodies, (key, value) =>
        (key === 'parent' || key === 'parts' || key === 'body') ? undefined : value);

    localStorage.setItem("savedBodies", JSON.stringify(savedBodies));
})

const loadPlaygroundFunction = () => {

    bodies = []; // this array will keep track of bodies inside the world
    defaultBodies.length = 0 // this array will keep track of walls and mouseConstraint
    numberOfBodies = 0;

    canvas = document.getElementById("canvas");
    canvas.innerHTML = "";
    canvasHeight = canvas.clientHeight;
    canvasWidth = canvas.clientWidth;
    render = null;
    engine = Engine.create();
    mouseConstraint = null;

    renderWorld(); // renders the world
    addWalls(); // adds walls to the world

    // add all the bodies we created to the world
    World.add(engine.world, defaultBodies);
    
    const storedBodiesJSON = localStorage.getItem("savedBodies");
    const storedBodies = JSON.parse(storedBodiesJSON);
    
    if (storedBodies && storedBodies.length !== 0) {
        JSON.parse(storedBodies).forEach(bodyJson => {
            if (bodyJson.type !== "composite" && bodyJson.type !== "constraint") {
                const body = Body.create(bodyJson);
                World.add(engine.world, body);
                bodies.push(body);
            }
        });
    }
    numberOfBodies = bodies.length;
    refreshedPage();
}

const loadPlaygroundBtn = document.querySelector("#loadPlaygroundBtn");
loadPlaygroundBtn.addEventListener("click", () => {
    loadPlaygroundFunction();
})