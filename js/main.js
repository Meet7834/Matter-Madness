renderWorld(); // renders the world
addWalls(); // adds walls to the world
renderDemo(); // renders the demo slingshot game

// add all the bodies we created to the world
World.add(engine.world, bodies);

// canvas will resize if the user resizes browser window
window.addEventListener('resize', resizeCanvas);