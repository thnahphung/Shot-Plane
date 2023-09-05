import { _decorator, Component, Node } from 'cc';
import { Despawn } from './Despawn';
const { ccclass, property } = _decorator;

@ccclass('DespawnByTime')
export class DespawnByTime extends Despawn {

    //todo: finsh
    protected canDespawn(): boolean {
        throw new Error('Method not implemented.');
    }
}

