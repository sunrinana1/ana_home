var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
    world = engine.world;

let lists = ["htmlJs", "ts", "nodejs", "linux", "mySQL"]

let canvasWidth = window.innerWidth*2/3;
let canvasHeight = window.innerHeight * 2/3;

// create renderer
var render = Render.create({
    element: document.querySelector(".curriculum"),
    engine: engine,
    options: {
        width: window.innerWidth*2/3,
        height: window.innerHeight * 2/3,
        wireframes: false,
        background: 'rgb(128,128,128)',
        // background: 'transparent'
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var group = Body.nextGroup(true);

var ropeC = Composites.stack(350, 50, 13, 1, 10, 10, function (x, y) {
    return Bodies.rectangle(x - 20, y, 50, 20, {
        collisionFilter: {
            category: 0x0004,
            mask: 0x0001,
            group: group
        },
        chamfer: 5,
        render: {
            fillStyle: "#000000"
        }
    });
});

var htmlJs = Bodies.rectangle(400, 70, 40,40, {
    // isStatic: true,
    collisionFilter: {
        mask: 0x0001 | 0x0002 | 0x0004
    },
    label: "htmlJs",
    render: {
        // strokeStyle: "black",
        lineWidth: 1.5,
        fillStyle: "rgb(135, 206, 235)",
    }
})

var ts = Bodies.rectangle(200, 110, 40,40, {
    // isStatic: true,
    collisionFilter: {
        mask: 0x0001 | 0x0002 | 0x0004
    },
    label: "ts",
    render: {
        // strokeStyle: "black",
        lineWidth: 1.5,
        fillStyle: "rgb(135, 206, 235)",
    }
})

var nodeJS = Bodies.rectangle(400, 150, 40,40, {
    // isStatic: true,
    collisionFilter: {
        mask: 0x0001 | 0x0002 | 0x0004
    },
    label: "nodejs",
    render: {
        // strokeStyle: "black",
        lineWidth: 1.5,
        fillStyle: "rgb(135, 206, 235)",
    }
})

var linux = Bodies.rectangle(200, 190, 40,40, {
    // isStatic: true,
    collisionFilter: {
        mask: 0x0001 | 0x0002 | 0x0004
    },
    label: "linux",
    render: {
        // strokeStyle: "black",
        lineWidth: 1.5,
        fillStyle: "rgb(135, 206, 235)",
    }
})

var mySQL = Bodies.rectangle(400, 230, 40,40, {
    // isStatic: true,
    collisionFilter: {
        mask: 0x0001 | 0x0002 | 0x0004
    },
    label: "mySQL",
    render: {
        // strokeStyle: "black",
        lineWidth: 1.5,
        fillStyle: "rgb(135, 206, 235)",
    }
})
let temp = render.bounds.min.x;
console.log(render);
console.log(render.bounds);
console.log(render.bounds.min)

// var curriDesc = Bodies.rectangle(render.bounds.min.x,300, 300, 300, {
//     isStatic: true,
//     collisionFilter: {
//         category: 0x0008
//     },
//     label: "curriDesc",
//     render: {
//         fillStyle: "lightgray",
//         borderRadius: "20px",
//         text:{
// 			content:"Test",
// 			color:"black",
// 			size: "30",
// 			family:"'Noto Sans KR', sans-serif",
// 		},
//     },
//     chamfer: 5
// })

Composites.chain(ropeC, 0.3, 0, -0.3, 0, {
    stiffness: 1,
    length: 0,
    render: {
        visible: false
    }
});

Composite.add(ropeC, Constraint.create({
    bodyB: ropeC.bodies[0],
    pointB: {
        x: -20,
        y: 0
    },
    pointA: {
        x: ropeC.bodies[0].position.x,
        y: ropeC.bodies[0].position.y
    },
    stiffness: 0.5,
    render: {
        zIndex: -1
    }
}));

Composite.add(ropeC, Constraint.create({
    bodyB: htmlJs,
    pointB: {
        x: -20,
        y:0
    },
    bodyA: ropeC.bodies[1],
    pointA: {
        x: +10,
        y:0
    },
    stiffness: 0.1,
    length:60,
    render: {
        type: 'line',
        anchors: false,
        zIndex: -1,
        strokeStyle: "black"
    }
}));

Composite.add(ropeC, Constraint.create({
    bodyB: ts,
    pointB: {
        x: -20,
        y:0
    },
    bodyA: ropeC.bodies[3],
    pointA: {
        x: +10,
        y:0
    },
    stiffness: 0.1,
    length:60,
    render: {
        type: 'line',
        anchors: false,
        zIndex: -1,
        strokeStyle: "black"
    }
}));

Composite.add(ropeC, Constraint.create({
    bodyB: nodeJS,
    pointB: {
        x: -20,
        y:0
    },
    bodyA: ropeC.bodies[5],
    pointA: {
        x: +10,
        y:0
    },
    stiffness: 0.1,
    length:60,
    render: {
        type: 'line',
        anchors: false,
        zIndex: -1,
        strokeStyle: "black"
    }
}));

Composite.add(ropeC, Constraint.create({
    bodyB: linux,
    pointB: {
        x: -20,
        y:0
    },
    bodyA: ropeC.bodies[7],
    pointA: {
        x: +10,
        y:0
    },
    stiffness: 0.1,
    length:60,
    render: {
        type: 'line',
        anchors: false,
        zIndex: -1,
        strokeStyle: "black"
    }
}));

Composite.add(ropeC, Constraint.create({
    bodyB: mySQL,
    pointB: {
        x: -20,
        y:0
    },
    bodyA: ropeC.bodies[9],
    pointA: {
        x: +10,
        y:0
    },
    stiffness: 0.1,
    length:60,
    render: {
        type: 'line',
        anchors: false,
        zIndex: -1,
        strokeStyle: "black"
    }
}));

Composite.add(world, [
    ropeC,
    htmlJs,
    ts,
    nodeJS,
    linux,
    mySQL,
    Bodies.rectangle(canvasWidth *1/2, canvasHeight *16/17, canvasWidth*2, 50.5, { isStatic: true })
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

Events.on(mouseConstraint, "mousedown", (e) => {
    if(mouseConstraint.body === null){
        return;
    } 
    if(lists.includes(mouseConstraint.body.label)){
        console.log(mouseConstraint.body.label)
    }
})


// fit the render viewport to the scene
Render.lookAt(render, {
    min: {
        x: 0,
        y: 0
    },
    max: {
        x: 700,
        y: 600
    }
});