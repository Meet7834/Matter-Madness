const clearPlaygroundBtn = document.querySelector("#clearPlaygroundBtn");
clearPlaygroundBtn.addEventListener("click", clearCanvas);

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