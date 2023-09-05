import { _decorator, Component, director, game, instantiate, Node, Prefab, Vec3 } from 'cc';
import { InputManager } from '../InputManager';
import { BulletSpawner } from '../Spawner/BulletSpawner';

const { ccclass, property } = _decorator;

@ccclass('ShipShooting')
export class ShipShooting extends Component {
    @property protected isShooting = false;
    @property protected shootDelay = 0.05;
    protected shootTimer = 0;

    protected update(dt: number): void {
        this.isShooting = InputManager.instance.isMouseClick;
        this.shotting();
    }

    protected shotting() {
        if (!this.isShooting) return;

        this.shootTimer += game.deltaTime;
        if (this.shootTimer < this.shootDelay) return;
        this.shootTimer = 0;

        this.createBullet();
    }

    protected createBullet() {
        let newBullet = BulletSpawner.instance.spawn(BulletSpawner.BulletOne, this.node.parent.position, this.node.parent.angle);
        if (newBullet == null) return;

        newBullet.active = true;
    }
}

