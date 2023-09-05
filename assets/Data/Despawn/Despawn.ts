import { _decorator, find, Node, Vec2 } from 'cc';
import { MyComponent } from '../MyComponent';
const { ccclass, property } = _decorator;

@ccclass('Despawn')
export abstract class Despawn extends MyComponent {

    protected update(dt: number): void {
        this.despawning();
    }

    protected despawning() {
        if (!this.canDespawn()) return;

        this.despawnObject();

    }

    protected despawnObject() {
        this.node.parent.destroy();
    }

    protected abstract canDespawn(): boolean
}

