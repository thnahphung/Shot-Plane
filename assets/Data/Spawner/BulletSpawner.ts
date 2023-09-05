import { _decorator, Component, Node } from 'cc';
import { Spawner } from './Spawner';
const { ccclass, property } = _decorator;

@ccclass('BulletSpawner')
export class BulletSpawner extends Spawner {

    protected static _instance: BulletSpawner;
    public static get instance() { return this._instance; }

    public static BulletOne = 'Bullet-001';
    public static BulletTwo = 'Bullet-002';

    protected onLoad(): void {
        super.onLoad();
        if (BulletSpawner._instance != null)
            console.log('Only 1 BulletSpawner allow to exist');
        BulletSpawner._instance = this;
    }

}

