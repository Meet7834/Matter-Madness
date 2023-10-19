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
    const lineWidth = currBody.render.lineWidth;
    const strokeStyle = currBody.render.strokeStyle;
    // to highlight the selected body
    bodyDiv.addEventListener("mouseover", (event) => {
        currBody.render.strokeStyle = "#fff";
        // console.log(currBody.render.strokeStyle)
        currBody.render.lineWidth += 5;
    })
    // to restore the original properties
    bodyDiv.addEventListener("mouseout", () => {
        // currBody.render.fillStyle = bodyColor;
        currBody.render.lineWidth = (currBody.isStatic) ? 5 : 0;
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

        if ((currBody.type === "body")) {
            if (!updateInfoDiv.classList.contains("hide")) {
                const fillStyleInput = updateInfoDiv.querySelector(`#fillStyle${currBody.id}`).value;
                const xScaleInput = parseFloat(updateInfoDiv.querySelector(`#xScale${currBody.id}`).value);
                const yScaleInput = parseFloat(updateInfoDiv.querySelector(`#yScale${currBody.id}`).value);
                let restitutionInput = parseFloat(updateInfoDiv.querySelector(`#restitution${currBody.id}`).value);
                const staticInput = updateInfoDiv.querySelector(`#isStatic${currBody.id}`);
                let frictionInput = parseFloat(updateInfoDiv.querySelector(`#friction${currBody.id}`).value);
                let frictionAirInput = parseFloat(updateInfoDiv.querySelector(`#frictionAir${currBody.id}`).value);
                let frictionStaticInput = parseFloat(updateInfoDiv.querySelector(`#frictionStatic${currBody.id}`).value);

                if (isNaN(restitutionInput) || restitutionInput < 0) restitutionInput = 0.1;
                if (isNaN(frictionInput) || frictionInput < 0) frictionInput = 0.1;
                if (isNaN(frictionAirInput) || frictionAirInput < 0) frictionAirInput = 0.01;
                if (isNaN(frictionStaticInput) || frictionStaticInput < 0) frictionStaticInput = 0.5;

                // if the user put friction values more than 1
                if (restitutionInput > 1) restitutionInput = 1;
                if (frictionInput > 1) frictionInput = 1;
                if (frictionAirInput > 1) frictionAirInput = 1;
                if (frictionStaticInput > 1) frictionStaticInput = 1;

                // Update body properties based on user input
                currBody.render.fillStyle = fillStyleInput || currBody.render.fillStyle;
                Body.scale(currBody, xScaleInput || 1, yScaleInput || 1);
                currBody.restitution = restitutionInput;
                currBody.isStatic = staticInput.checked;
                currBody.render.lineWidth = (currBody.isStatic) ? 5 : 0;
                currBody.friction = frictionInput;
                currBody.frictionAir = frictionAirInput;
                currBody.frictionStatic = frictionStaticInput;

                if (!staticInput.checked && currBody.render.fillStyle === "#14151f") currBody.render.fillStyle = "#ffffff";
                generateUpdateDivHTML(currBody, updateInfoDiv, infoDiv);
                generateInfoDivHTML(currBody, infoDiv);
                currBody.render.lineWidth = 5;
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
    if (currBody.type === "body") {
        updateInfoDiv.innerHTML = `
        <div class="align-all-the-items" style="width:90%">
        <div> 
            <label for=${"fillStyle" + currBody.id}>Color:</label>
            <input type="color" id=${"fillStyle" + currBody.id} value="${currBody.render.fillStyle || "#ffffff"}">
        </div>
        <div> 
            <label for=${"xScale" + currBody.id}>X Scale:</label>
            <input type="number" id=${"xScale" + currBody.id} placeholder="1">
        </div>
        <div>
            <label for=${"yScale" + currBody.id}>Y Scale:</label>
            <input type="number" id=${"yScale" + currBody.id} placeholder="1">
        </div>
        <div>
            <label for=${"restitution" + currBody.id}>Restitution:</label>
            <input type="number" id=${"restitution" + currBody.id} placeholder="${currBody.restitution || 0.1}">
        </div>
        <div>
            <label for=${"isStatic" + currBody.id}>Static:</label>
            <input type="checkbox" id=${"isStatic" + currBody.id} ${currBody.isStatic ? "checked" : ""}>
        </div>
        <div>
            <label for=${"friction" + currBody.id}>Friction:</label>
            <input type="number" id=${"friction" + currBody.id} placeholder="${currBody.friction || 0.1}">
        </div>
        <div>
            <label for=${"frictionAir" + currBody.id}>Air Friction:</label>
            <input type="number" id=${"frictionAir" + currBody.id} placeholder="${currBody.frictionAir || 0.01}">
        </div>
        <div>
            <label for=${"frictionStatic" + currBody.id}>Static Friction:</label>
            <input type="number" id=${"frictionStatic" + currBody.id} placeholder="${currBody.frictionStatic || 0.5}">
        </div>
        `;
        const cancelBtn = createCancelBtn(updateInfoDiv, infoDiv);
        updateInfoDiv.appendChild(cancelBtn);
    } else {
        updateInfoDiv.innerHTML = "Can't update constraints."
    }
}

const generateInfoDivHTML = (currBody, infoDiv) => {
    infoDiv.innerHTML = "";
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