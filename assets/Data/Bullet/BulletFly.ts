import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletFly')
export class BulletFly extends Component {
    @property protected moveSpeed: number = 1;
    protected direction: Vec3 = Vec3.RIGHT;

    update(dt: number): void {
        let translate = new Vec3;
        Vec3.multiplyScalar(translate, this.direction, this.moveSpeed);
        this.node.parent.translate(translate);
    }
}

