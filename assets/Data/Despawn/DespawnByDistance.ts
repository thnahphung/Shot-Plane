import { _decorator, Component, Node, find, Vec2 } from 'cc';
import { Despawn } from './Despawn';
const { ccclass, property } = _decorator;

@ccclass('DespawnByDistance')
export class DespawnByDistance extends Despawn {
    @property protected distanceLimit: number = 700;

    @property protected distance: number = 0;

    @property(Node) protected mainCamera: Node;

    protected update(dt: number): void {
        this.despawning();
    }

    protected loadComponents(): void {
        this.loadCamera();
    }

    protected loadCamera() {
        if (this.mainCamera != null) return;

        this.mainCamera = find("Canvas/Main Camera");
    }

    protected canDespawn(): boolean {
        this.distance = Vec2.distance(this.node.parent.position, this.mainCamera.position);
        return this.distance > this.distanceLimit;

    }
}

