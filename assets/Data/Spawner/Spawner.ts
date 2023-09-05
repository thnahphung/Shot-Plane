import { _decorator, Component, find, Node, instantiate, Prefab, Vec3 } from 'cc';
import { MyComponent } from '../MyComponent';
const { ccclass, property } = _decorator;

@ccclass('Spawner')
export abstract class Spawner extends MyComponent {

    @property([Node]) protected prefabs: Node[] = [];

    @property([Node]) protected poolObjs: Node[] = [];

    @property(Node) protected holder: Node;

    protected loadComponents() {
        this.loadPrefabs();
        this.loadHolder();
    }

    protected loadPrefabs() {
        if (this.prefabs.length > 0) return;

        let prefabObjs = this.node.getChildByName('Prefabs');
        prefabObjs.children.forEach(prefabObj => {
            this.prefabs.push(prefabObj);
        });
        this.hidePrefabs();
    }

    protected loadHolder() {
        if (this.holder != null) return;

        this.holder = this.node.getChildByName('Holder');
    }

    protected hidePrefabs() {
        this.prefabs.forEach(prefab => {
            prefab.active = false;
        })
    }

    public despawn(obj: Node) {
        this.poolObjs.push(obj);
        obj.active = false;
    }

    public spawn(prefabName: string, position: Vec3, angle: number): Node {
        let prefab: Node = this.getPrefabByName(prefabName);
        if (prefab == null) {
            console.warn("Prefab not found: " + prefabName);
            return null;
        }

        let newPrefab: Node = this.getObjectFromPool(prefab);
        newPrefab.position = position;
        newPrefab.angle = angle;
        newPrefab.parent = this.holder;
        return newPrefab;
    }

    protected getObjectFromPool(prefab: Node): Node {
        for (let i = 0; i < this.poolObjs.length; i++) {
            if (this.poolObjs[i].name == prefab.name) {
                return this.removeObjInPoolObjs(i);
            }
        }
        let newPrefab: Node = instantiate(prefab);
        newPrefab.name = prefab.name;
        return newPrefab;
    }

    public getPrefabByName(prefabName: string): Node {
        for (const prefab of this.prefabs) {
            if (prefab.name == prefabName) {
                return prefab;
            }
        }
        return null;
    }

    protected removeObjInPoolObjs(i) {
        return this.poolObjs.splice(i, 1)[0];
    }



}

