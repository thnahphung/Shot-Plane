import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MyComponent')
export class MyComponent extends Component {
    resetInEditor(): void {
        this.loadComponents();
    }

    protected start(): void {
        // For override
    }

    protected onLoad(): void {
        this.loadComponents();
    }

    protected loadComponents() {
        // For override
    }
}

