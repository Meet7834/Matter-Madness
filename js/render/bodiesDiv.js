const bodiesDiv = document.querySelector("#bodiesDiv");

const createButton = (text, id) => {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.classList.add(id);
    return btn;
}

const createInfoDiv = (currBody) => {
    const infoDiv = document.createElement("div");

    infoDiv.innerHTML += `<p>ID: ${currBody.id}</p>`
    if (currBody.type == "body"){
        infoDiv.innerHTML += `<p>Static: ${currBody.isStatic}</p>`
        if (currBody.isStatic) infoDiv.innerHTML += `<p>angle: ${(currBody.angle * 180 / 3.14).toFixed(1)}</p>`
        
        infoDiv.innerHTML += `<p>Friction: ${currBody.friction}</p>`
        infoDiv.innerHTML += `<p>Air Friction: ${currBody.frictionAir}</p>`
        infoDiv.innerHTML += `<p>Static Friction: ${currBody.frictionStatic}</p>`
    }
    
    infoDiv.classList.add("hide");
    
    return infoDiv;
}

const createBodyDiv = (currBody) => {
    const div = document.createElement("div");
    div.innerHTML = `<h4>${currBody.label}`;

    return div;
}

const assembleDiv = (bodyDiv, infoDiv, btn) => {
    bodyDiv.appendChild(infoDiv);
    bodyDiv.appendChild(btn);
    bodiesDiv.append(bodyDiv);
}

const renderBodiesDiv = () => {
    bodiesDiv.innerHTML = "";
    for (let i = 0; i < bodies.length; i++) {
        const currBody = bodies[i];
        const bodyDiv = createBodyDiv(currBody);
        const infoDiv = createInfoDiv(currBody);
        const btn = createButton("Delete", currBody.id);

        assembleDiv(bodyDiv, infoDiv, btn);

        bodyDiv.classList.add("bodyDiv");
    }
}

const unhideInfoPage = () => {
    const allBodyDivs = document.querySelectorAll(".bodyDiv");

    for (let i = 0; i < allBodyDivs.length; i++) {
        const bodyDiv = allBodyDivs[i];
        bodyDiv.addEventListener("click", () => {
            bodyDiv.children[1].classList.toggle("hide"); // make sure to replace 1 with whatever the infoDiv number is at the time.
        })
    }
}