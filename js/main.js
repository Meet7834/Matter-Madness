renderWorld(); // renders the world
addWalls(); // adds walls to the world

// add all the bodies we created to the world
World.add(engine.world, defaultBodies);
World.add(engine.world, bodies);
refreshedPage();

// canvas will resize if the user resizes browser window
window.addEventListener('resize', resizeCanvas);