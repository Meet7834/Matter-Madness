const bodiesDiv = document.querySelector("#bodiesDiv");

const renderBodiesDiv = () => {
    bodiesDiv.innerHTML = "";
    for (let i = 0; i < bodies.length; i++) {
        const currBody = bodies[i];
        const div = document.createElement("div");

        div.innerHTML = `<h4>${currBody.label} ID: ${currBody.id}`;
        div.id = "body-" + currBody.id;
        
        const btn = document.createElement("button");
        btn.innerText = "Delete";
        
        const infoDiv = document.createElement("div");
        infoDiv.innerHTML += `<p>Static: ${currBody.isStatic}</p>` 
        if (currBody.isStatic) infoDiv.innerHTML += `<p>angle: ${(currBody.angle * 180 / 3.14).toFixed(1)}</p>` 
        infoDiv.innerHTML += `<p>Friction: ${currBody.friction}</p>` 
        infoDiv.innerHTML += `<p>Air Friction: ${currBody.frictionAir}</p>` 
        infoDiv.innerHTML += `<p>Static Friction: ${currBody.frictionStatic}</p>` 
        
        div.appendChild(btn);
        div.appendChild(infoDiv);
        bodiesDiv.append(div);

        div.classList.add("bodyDiv");
    }
}