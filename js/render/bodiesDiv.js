const bodiesDiv = document.querySelector("#bodiesDiv");

const addBodyEventListners = (bodyDiv, infoDiv, btn) => {

    // to hide/unhide the infoDiv 
    bodyDiv.addEventListener("click", (event) => {
        if (event.target !== btn) {
            infoDiv.classList.toggle("hide");
        }
    })
}

const createDeleteButton = (bodyToRemove, divToRemove) => {
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    // adding event listner to the button
    deleteBtn.addEventListener("click", () => {
        // remove the body from the world
        World.remove(engine.world, bodyToRemove);

        // remove the body from our array bodies
        const index = bodies.indexOf(bodyToRemove);
        if (index != -1) bodies.splice(index, 1);
        
        // Remove the div from the DOM
        divToRemove.remove();
    })

    return deleteBtn;
}

const createInfoDiv = (currBody) => {
    const infoDiv = document.createElement("div");

    infoDiv.innerHTML += `<p>ID: ${currBody.id}</p>`;
    if (currBody.type == "body") {
        infoDiv.innerHTML += `<p>Static: ${currBody.isStatic}</p>`
        if (currBody.isStatic) infoDiv.innerHTML += `<p>angle: ${(currBody.angle * 180 / 3.14).toFixed(1)}</p>`

        infoDiv.innerHTML += `<p>Friction: ${currBody.friction}</p>`
        infoDiv.innerHTML += `<p>Air Friction: ${currBody.frictionAir}</p>`
        infoDiv.innerHTML += `<p>Static Friction: ${currBody.frictionStatic}</p>`
    }

    infoDiv.classList.add("infoDiv");
    infoDiv.classList.add("hide");

    return infoDiv;
}

const assembleDiv = (bodyDiv, infoDiv, btn) => {
    bodyDiv.appendChild(infoDiv);
    bodyDiv.appendChild(btn);
    bodiesDiv.append(bodyDiv);
}

const createBodyDiv = (currBody) => {

    const bodyDiv = document.createElement("div");
    bodyDiv.innerHTML = `<h4>${currBody.label}`;
    bodyDiv.classList.add("bodyDiv");

    const infoDiv = createInfoDiv(currBody);
    const btn = createDeleteButton(currBody, bodyDiv);

    // event listners:
    addBodyEventListners(bodyDiv, infoDiv, btn);

    assembleDiv(bodyDiv, infoDiv, btn);
}


const renderBodiesDiv = () => {
    bodiesDiv.innerHTML = "";
    for (let i = 0; i < bodies.length; i++) {
        const currBody = bodies[i];
        createBodyDiv(currBody);
    }
}