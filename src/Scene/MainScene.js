'use strict';

let cxScene = require('complex-engine-scene');
let cxEntity = require('complex-engine-entity');
let cxStats = require('complex-stats').cxStatsSystem;
let PIXI = require('pixi.js');
let cxPixiSystem = require('complex-pixi').cxPixiSystem;
let cxPixiComponent = require('complex-pixi').cxPixiSpriteComponent;
let cxPhysicsJsSystem = require("complex-physicsjs").cxPhysicsJsSystem;
let cxPhysicsJsComponent = require("complex-physicsjs").cxPhysicsJsComponent;
let cxScriptSystem = require('complex-scripting').cxScriptSystem;
let cxScriptComponent = require('complex-scripting').cxScriptComponent;
let Physics = require('physicsjs')

let PhisicsJSPixiPositionSyncScript = require('../Script/PhisicsJSPixiPositionSyncScript');

class MainScene extends cxScene{
    constructor(){
        super();
    }

    load ()
    {
        var viewportBounds = Physics.aabb(0, 0, window.innerWidth, window.innerHeight);

        let behaviors = [
            Physics.behavior('constant-acceleration', {
                acc: { x : 0, y: 0.0004 } // this is the default
            }),
             Physics.behavior('body-impulse-response'),
             Physics.behavior('sweep-prune'),
             Physics.behavior('constant-acceleration'),
             Physics.behavior('constant-acceleration'),
             Physics.behavior('body-collision-detection'),
             Physics.behavior('constant-acceleration'),
             Physics.behavior('edge-collision-detection', {
                 aabb: viewportBounds,
                 restitution: 0.5,
                 cof: 0.99
             }),

             Physics.integrator('verlet'),
        ];
        this.world.addSystem( new cxPhysicsJsSystem(1000/60, 4, behaviors) );
        this.world.addSystem( new cxStats() );
        this.world.addSystem( new cxScriptSystem() );
        this.world.addSystem( new cxPixiSystem( document.getElementById('screen'), window.innerWidth, window.innerHeight) );

        for(var i = 0; i < 10; i++){

            let ball = new cxEntity();
            ball.addComponent(new cxScriptComponent( new PhisicsJSPixiPositionSyncScript() ));

            ball.addComponent( new cxPixiComponent( PIXI.Texture.fromImage("/gfx/head.png"), {
                x: 100, y:100
            }, {
                x:100, y: 100
            } ));

            ball.addComponent( new cxPhysicsJsComponent( 'circle', {
                treatment: 'dynamic',
                mass: 100,
                x: Math.random() * window.innerWidth/2, // x-coordinate
                y: window.innerHeight/2,
                vx: Math.random(), // velocity in x-direction
                vy: Math.random(), // velocity in y-direction
                radius: 50
            }));

            this.world.addEntity(ball);
        }

        this.world.initSystems();
    }
}

module.exports = MainScene;
