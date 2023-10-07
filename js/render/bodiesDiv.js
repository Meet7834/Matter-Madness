const bodiesDiv = document.querySelector("#bodiesDiv");

const addBodyEventListners = (bodyDiv, infoDiv, updateInfoDiv, updateBtn, currBody) => {
    // to hide/unhide the infoDiv 
    bodyDiv.addEventListener("click", (event) => {
        if ((event.target !== updateBtn) && (updateInfoDiv.classList.contains("hide"))) {
            infoDiv.classList.toggle("hide");
            if (!updateInfoDiv.classList.contains("hide")) updateInfoDiv.classList.toggle("hide");
        }
    })

    if (currBody.type === "composite") return;
    const bodyColor = currBody.render.fillStyle;
    const lineWidth = currBody.render.lineWidth;
    const strokeStyle = currBody.render.strokeStyle;
    // to highlight the selected body
    bodyDiv.addEventListener("mouseover", (event) => {
        // if (!currBody.isStatic) currBody.render.fillStyle = "#08fa00";
        currBody.render.strokeStyle = "#fff";
        // console.log(currBody.render.strokeStyle)
        currBody.render.lineWidth = 7;
    })
    // to restore the original properties
    bodyDiv.addEventListener("mouseout", () => {
        // currBody.render.fillStyle = bodyColor;
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

const createUpdateButton = (currBody, divToUpdate) => {
    const updateBtn = document.createElement("button");
    updateBtn.innerText = "Update";

    // adding event listner to the button
    updateBtn.addEventListener("click", (e) => {
        let infoDiv = divToUpdate.querySelector(".infoDiv");
        const updateInfoDiv = divToUpdate.querySelector(".updateInfoDiv");

        if (!(currBody.type === "composite")) {
            if (!updateInfoDiv.classList.contains("hide")) {
                const fillStyleInput = updateInfoDiv.querySelector(`#fillStyle${currBody.id}`);
                const xScaleInput = updateInfoDiv.querySelector(`#xScale${currBody.id}`);
                const yScaleInput = updateInfoDiv.querySelector(`#yScale${currBody.id}`);
                const restitutionInput = updateInfoDiv.querySelector(`#restitution${currBody.id}`);
                const staticInput = updateInfoDiv.querySelector(`#isStatic${currBody.id}`);
                const frictionInput = updateInfoDiv.querySelector(`#friction${currBody.id}`);
                const frictionAirInput = updateInfoDiv.querySelector(`#frictionAir${currBody.id}`);
                const frictionStaticInput = updateInfoDiv.querySelector(`#frictionStatic${currBody.id}`);

                // Update body properties based on user input
                currBody.render.fillStyle = fillStyleInput.value || currBody.render.fillStyle;
                Body.scale(currBody, parseFloat(xScaleInput.value) || 1, parseFloat(yScaleInput.value) || 1);
                currBody.restitution = parseFloat(restitutionInput.value) || 0.1;
                currBody.isStatic = staticInput.checked;
                currBody.friction = parseFloat(frictionInput.value) || 0.1;
                currBody.frictionAir = parseFloat(frictionAirInput.value) || 0.01;
                currBody.frictionStatic = parseFloat(frictionStaticInput.value) || 0.5;

                generateUpdateDivHTML(currBody, updateInfoDiv, infoDiv);
                generateInfoDivHTML(currBody, infoDiv);
            }
        }

        if (!infoDiv.classList.contains("hide")) infoDiv.classList.toggle("hide");
        updateInfoDiv.classList.toggle("hide");
    })
    return updateBtn;
}

const createCancelBtn = (updateDiv, infoDiv) => {
    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "Cancel";

    cancelBtn.addEventListener("click", (e) => {
        updateDiv.classList.toggle("hide");
        infoDiv.classList.toggle("hide");
    })

    return cancelBtn;
}

const generateUpdateDivHTML = (currBody, updateInfoDiv, infoDiv) => {
    updateInfoDiv.innerHTML = `
        <label for=${"fillStyle" + currBody.id}>Color:</label>
        <input type="color" id=${"fillStyle" + currBody.id} value="${currBody.render.fillStyle || "#ffffff"}">
        <br/>
        <label for=${"xScale" + currBody.id}>X Scale:</label>
        <input type="number" id=${"xScale" + currBody.id} value="1">
        <br/>
        <label for=${"yScale" + currBody.id}>Y Scale:</label>
        <input type="number" id=${"yScale" + currBody.id} value="1">
        <br/>
        <label for=${"restitution" + currBody.id}>Restitution:</label>
        <input type="number" id=${"restitution" + currBody.id} value="${currBody.restitution || 0.1}">
        <br/>
        <label for=${"isStatic" + currBody.id}>Static:</label>
        <input type="checkbox" id=${"isStatic" + currBody.id} ${currBody.isStatic ? "checked" : ""}>
        <br/>
        <label for=${"friction" + currBody.id}>Friction:</label>
        <input type="number" id=${"friction" + currBody.id} value="${currBody.friction || 0.1}">
        <br/>
        <label for=${"frictionAir" + currBody.id}>Air Friction:</label>
        <input type="number" id=${"frictionAir" + currBody.id} value="${currBody.frictionAir || 0.01}">
        <br/>
        <label for=${"frictionStatic" + currBody.id}>Static Friction:</label>
        <input type="number" id=${"frictionStatic" + currBody.id} value="${currBody.frictionStatic || 0.5}">
        <br/>
        `;

    const cancelBtn = createCancelBtn(updateInfoDiv, infoDiv);
    updateInfoDiv.appendChild(cancelBtn);
}

const generateInfoDivHTML = (currBody, infoDiv) => {
    infoDiv.innerHTML = `<p>ID: ${currBody.id}</p>`;
    if (currBody.type == "body") {
        infoDiv.innerHTML += `<p>Static: ${currBody.isStatic}</p>`
        if (currBody.isStatic) infoDiv.innerHTML += `<p>Angle: ${(currBody.angle * 180 / 3.14).toFixed(1)}</p>`

        infoDiv.innerHTML += `<p>Restitution: ${currBody.restitution}</p>`;
        infoDiv.innerHTML += `<p>Friction: ${currBody.friction}</p>`
        infoDiv.innerHTML += `<p>Air Friction: ${currBody.frictionAir}</p>`
        infoDiv.innerHTML += `<p>Static Friction: ${currBody.frictionStatic}</p>`
    }
}

const createUpdateInfoDiv = (currBody, infoDiv) => {
    const updateInfoDiv = document.createElement("div");

    updateInfoDiv.classList.add("updateInfoDiv");
    updateInfoDiv.classList.add("hide");

    if (currBody.type === "composite") {
        updateInfoDiv.innerHTML += "Can't update composite types."
        return updateInfoDiv;
    }

    generateUpdateDivHTML(currBody, updateInfoDiv, infoDiv);

    return updateInfoDiv;
}

const createInfoDiv = (currBody) => {
    const infoDiv = document.createElement("div");

    generateInfoDivHTML(currBody, infoDiv);

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
    const updateInfoDiv = createUpdateInfoDiv(currBody, infoDiv);
    const deleteBtn = createDeleteButton(currBody, bodyDiv);
    const updateBtn = createUpdateButton(currBody, bodyDiv);

    // event listners:
    assembleDiv(bodyDiv, infoDiv, updateInfoDiv, updateBtn, deleteBtn);
    addBodyEventListners(bodyDiv, infoDiv, updateInfoDiv, updateBtn, currBody);

}

const renderBodiesDiv = () => {
    bodiesDiv.innerHTML = "";
    for (let i = 0; i < bodies.length; i++) {
        const currBody = bodies[i];
        createBodyDiv(currBody);
    }
}