import { _decorator, Component, Vec3, math } from 'cc';
import { InputManager } from '../InputManager';


const { ccclass, property } = _decorator;

@ccclass('ShipMovement')
export class ShipMovement extends Component {
    protected _targetPosition: Vec3;

    @property protected speed: number = 0.1;

    private newPos: Vec3;


    protected start(): void {
    }

    update(deltaTime: number) {
        this.getTargetPosition();
        this.moving();
        this.lookAtTarget();
    }

    protected lookAtTarget() {
        let diff: Vec3 = this._targetPosition.subtract(this.node.parent.getPosition());
        diff.normalize();
        let rotate_z: number = math.toDegree(Math.atan2(diff.y, diff.x));
        this.node.parent.angle = rotate_z;
    }

    protected getTargetPosition() {
        this._targetPosition = InputManager.instance.mouseWorldPos;
    }

    protected moving() {
        this.newPos = this.node.parent.position.lerp(this._targetPosition, this.speed);
        this.node.parent.setPosition(this.newPos);
    }
}

