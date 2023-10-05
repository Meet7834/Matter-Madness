const bodiesDiv = document.querySelector("#bodiesDiv");

const addBodyEventListners = (bodyDiv, infoDiv, updateBtn, currBody) => {

    // to hide/unhide the infoDiv 
    bodyDiv.addEventListener("click", (event) => {
        if (event.target !== updateBtn) {
            infoDiv.classList.toggle("hide");
        }
    })
    if (currBody.type === "composite") return;
    const bodyColor = currBody.render.fillStyle;
    const lineWidth = currBody.render.lineWidth;
    const strokeStyle = currBody.render.strokeStyle;
    // to highlight the selected body
    bodyDiv.addEventListener("mouseover", (event) => {
        if (!currBody.isStatic) currBody.render.fillStyle = "#08fa00";
        currBody.render.strokeStyle = "#fff";
        // console.log(currBody.render.strokeStyle)
        currBody.render.lineWidth = 5;
    })
    // to restore the original properties
    bodyDiv.addEventListener("mouseout", () => {
        currBody.render.fillStyle = bodyColor;
        currBody.render.lineWidth = lineWidth;
        currBody.render.strokeStyle = strokeStyle;
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

const createUpdateButton = (bodyToUpdate, divToUpdate) => {
    const updateBtn = document.createElement("button");
    updateBtn.innerText = "Update";

    // adding event listner to the button
    updateBtn.addEventListener("click", () => {

    })

    return updateBtn;
}

const createUpdateInfoDiv = (currBody) => {
    const updateDiv = document.createElement("div");
    // if (currBody.isStatic) updateDiv.innerHTML += `<label for=${currBody.id + "Angle"}>Angle: ${(currBody.angle * 180 / 3.14).toFixed(1)}</label>`
    // if (currBody.isStatic) updateDiv.innerHTML += `<input type="number" id=${currBody.id + "Angle"} placeholder="Default: 0"></input>`

    return updateDiv;
}

const createInfoDiv = (currBody) => {
    const infoDiv = document.createElement("div");

    infoDiv.innerHTML += `<p>ID: ${currBody.id}</p>`;
    if (currBody.type == "body") {
        infoDiv.innerHTML += `<p>Static: ${currBody.isStatic}</p>`
        if (currBody.isStatic) infoDiv.innerHTML += `<p>Angle: ${(currBody.angle * 180 / 3.14).toFixed(1)}</p>`

        infoDiv.innerHTML += `<p>Friction: ${currBody.friction}</p>`
        infoDiv.innerHTML += `<p>Air Friction: ${currBody.frictionAir}</p>`
        infoDiv.innerHTML += `<p>Static Friction: ${currBody.frictionStatic}</p>`
    }

    infoDiv.classList.add("infoDiv");
    infoDiv.classList.add("hide");

    return infoDiv;
}

const assembleDiv = (bodyDiv, infoDiv, updateInfoDiv, updateBtn, deleteBtn) => {
    bodyDiv.appendChild(infoDiv);
    bodyDiv.appendChild(updateInfoDiv);
    bodyDiv.appendChild(updateBtn);
    bodyDiv.appendChild(deleteBtn);
    bodiesDiv.append(bodyDiv);
}

const createBodyDiv = (currBody) => {

    const bodyDiv = document.createElement("div");
    bodyDiv.innerHTML = `<h4>${currBody.label}`;
    bodyDiv.classList.add("bodyDiv");

    const infoDiv = createInfoDiv(currBody);
    const updateInfoDiv = createUpdateInfoDiv(currBody);
    const deleteBtn = createDeleteButton(currBody, bodyDiv);
    const updateBtn = createUpdateButton(currBody, bodyDiv);

    // event listners:
    addBodyEventListners(bodyDiv, infoDiv, updateBtn, currBody);

    assembleDiv(bodyDiv, infoDiv, updateInfoDiv, updateBtn, deleteBtn);
}


const renderBodiesDiv = () => {
    bodiesDiv.innerHTML = "";
    for (let i = 0; i < bodies.length; i++) {
        const currBody = bodies[i];
        createBodyDiv(currBody);
    }
}