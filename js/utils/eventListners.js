// clear playground
const clearPlaygroundBtn = document.querySelector("#clearPlaygroundBtn");
clearPlaygroundBtn.addEventListener("click", clearCanvas);

// rander the demo for the playground
const renderDemoBtn = document.querySelector("#renderDemoBtn");
renderDemoBtn.addEventListener("click", () => {

    // { this is part of clearCanvas function
    World.remove(engine.world, bodies); // remove all the bodies from the world using our array
    bodies.length = 0; // empty the bodies array


    addWalls(); // add the wall to the canvas
    renderMouseConstraint(); // add mouse constraint
    // }

    renderDemo(); // render the demo
    World.add(engine.world, bodies);
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
let bodyTypeSelect = document.querySelector("#bodyTypeSelect");
bodyTypeSelect.addEventListener("change", () => {

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
});

// add a body
const addBodyBtn = document.getElementById("addBodyBtn");
addBodyBtn.addEventListener("click", () => {
    // get selected bodyType and body name
    const bodyType = bodyTypeSelect.value;
    const bodyName = document.querySelector("#bodyName").value || "A";
    if (bodyName == "") {
        alert("Please enter valid body name");
        return;
    };

    // get x and y center of mass position
    const x = parseFloat(document.querySelector("#xPos").value) || canvasWidth / 2;
    const y = parseFloat(document.querySelector("#yPos").value) || canvasHeight / 2;

    // Create the body based on the selected type and dimensions
    let newBody;

    if (bodyType === "rectangle") {
        const width = parseFloat(document.querySelector("#widthInput").value) || 75;
        const height = parseFloat(document.querySelector("#heightInput").value) || 75;

        newBody = Bodies.rectangle(x, y, width, height, { label: bodyName });
    } else if (bodyType === "circle") {
        const radius = parseFloat(document.querySelector("#radiusInput").value) || 40;
        
        newBody = Bodies.circle(x, y, radius, { label: bodyName });
    } else if (bodyType === "polygon") {
        const radius = parseFloat(document.querySelector("#radiusInput").value) || 40;
        const sides = parseInt(document.querySelector("#sidesInput").value) || 3;
        
        newBody = Bodies.polygon(x, y, sides, radius, { label: bodyName });
    }

    // Add the new body to the simulation
    if (newBody != null) {
        bodies.push(newBody);
        World.add(engine.world, newBody);
    } else {
        console.log("its null")
    }

});
