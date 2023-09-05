import { _decorator, Component, Node, Input, Vec3, Vec2, UITransform, Camera, EventMouse, input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('InputManager')
export class InputManager extends Component {

    protected static _instance: InputManager;
    public static get instance() { return this._instance; }

    protected _mouseWorldPos: Vec3 = new Vec3;
    public get mouseWorldPos() { return this._mouseWorldPos; }

    protected _isMouseClick: boolean = false;
    public get isMouseClick() { return this._isMouseClick; }

    protected mouseWorld2D: Vec2;

    @property({ type: Camera }) private camera: Camera;

    protected onLoad(): void {
        if (InputManager._instance != null)
            console.log('Only 1 InputManager allow to exist');
        InputManager._instance = this;
    }

    protected start(): void {
        this.setEventMouseMove();
        this.setEventMouseDown();
        this.setEventMouseUp();
    }

    update(deltaTime: number) {
        this.getMousePos();
    }

    private mouseMove(event: EventMouse) {
        this.mouseWorld2D = event.getLocation();
    }

    protected mouseDown(event: EventMouse) {
        this._isMouseClick = true;
    }
    protected mouseUp(event: EventMouse) {
        this._isMouseClick = false;
    }
    protected getMousePos() {
        if (this.mouseWorld2D == null)
            return;

        this._mouseWorldPos = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(this.camera.screenToWorld(new Vec3(this.mouseWorld2D.x, this.mouseWorld2D.y, 0)));
    }

    protected setEventMouseMove() {
        input.on(Input.EventType.MOUSE_MOVE, this.mouseMove, this);
    }

    protected setEventMouseDown() {
        input.on(Input.EventType.MOUSE_DOWN, this.mouseDown, this);
    }

    protected setEventMouseUp() {
        input.on(Input.EventType.MOUSE_UP, this.mouseUp, this);
    }

}

