import { _decorator, Component, Node } from 'cc';
import { DespawnByDistance } from '../Despawn/DespawnByDistance';
import { BulletSpawner } from '../Spawner/BulletSpawner';
const { ccclass, property } = _decorator;

@ccclass('BulletDespawn')
export class BulletDespawn extends DespawnByDistance {

    protected despawnObject(): void {
        BulletSpawner.instance.despawn(this.node.parent)
    }
}
