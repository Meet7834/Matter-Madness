// it will render the demo slingshot game
const renderDemo = () => {

    // make a platform and place some hexagons on it
    let platform = Matter.Bodies.rectangle(canvasWidth * 0.75, canvasHeight * 0.6, canvasWidth * 0.30, 25, { isStatic: true });
    let stack = Matter.Composites.stack(canvasWidth * 0.65, canvasHeight * 0.1, 4, 4, 0, 0, function (x, y) {
        return Matter.Bodies.polygon(x, y, 8, 27); // 3rd value is number of sides, 4th is size of each polygon
    });

    // make a ball and a constraint(spring)
    let ball = Matter.Bodies.circle(canvasWidth * 0.20, canvasHeight * 0.75, 20);
    let sling = Matter.Constraint.create({
        pointA: { x: canvasWidth * 0.20, y: canvasHeight * 0.75 },
        bodyB: ball, // attach other side of spring to the ball
        stiffness: 0.05 // stiffness of the spring/constraint
    });

    // if the body which is fired is ball then set firing to true
    let firing = false; 
    Matter.Events.on(mouseConstraint, 'enddrag', function (e) {
        if (e.body === ball) firing = true;
    });

    // after dragging is ended update the engine
    Matter.Events.on(engine, 'afterUpdate', function () {
        if (firing && Math.abs(ball.position.x - canvasWidth * 0.20) < 20 && Math.abs(ball.position.y - canvasHeight * 0.75) < 20)  { // checks condition to see if it should fire the ball
            ball = Matter.Bodies.circle(canvasWidth * 0.20, canvasHeight * 0.75, 20); // make another ball at the same place
            Matter.World.add(engine.world, ball); // add the new the world
            bodies.push(ball); // add new ball to our array
            sling.bodyB = ball; // attack spring to it
            firing = false; // set firing to false
            refreshedPage();
        }
    });
    

    // push all the bodies to the bodies array
    bodies.push(platform);
    bodies.push(stack);
    bodies.push(ball);
    bodies.push(sling);

    refreshedPage();
}