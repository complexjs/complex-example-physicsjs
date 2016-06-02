'use strict';

let cxScript = require('complex-scripting').cxScript;

class PhisicsJSPixiPositionSyncScript extends cxScript
{
    constructor(){
        super();
        this._pixiComp = null;
        this._physicComp = null;
        this._ok = false;
    }

    onSetup(){
        this._pixiComp = this.entity.getComponent('cx.pixi.component.sprite');
        this._physicComp = this.entity.getComponent('cx.physicsjs.component');
    }

    update(){
        let x = this._physicComp.body.state.pos.x;
        let y = this._physicComp.body.state.pos.y;
        this._pixiComp.sprite.position.set(x, y);
    }
}

module.exports = PhisicsJSPixiPositionSyncScript;
