/// <reference path="definitions/three.d.ts" />
/**
 * @author mrdoob / http://mrdoob.com/
 */
//Modified by Lucas Knutson
export class PointerLockControls {
    enabled: boolean;
    camera: THREE.Camera;
    yawObject: THREE.Object3D;
    pitchObject: THREE.Object3D;

    constructor(camera: THREE.Camera) {
        this.camera = camera;
        this.camera.rotation.set(0, 0, 0);
        this.pitchObject = new THREE.Object3D();
        this.pitchObject.add(this.camera);

        this.yawObject = new THREE.Object3D();
        this.yawObject.position.y = 2;
        this.yawObject.add(this.pitchObject);

        document.addEventListener('mousemove', (event: MouseEvent) => {
            return this.onMouseMove(event, this);
        });

        this.enabled = true;
    }

    onMouseMove(event: MouseEvent, $this: PointerLockControls) {
        if (!$this.enabled) {
            return;
        }

        var PI_2 = Math.PI / 2;
        $this.yawObject.rotation.y -= event.movementX * 0.002;
        $this.pitchObject.rotation.x -= event.movementY * 0.002;

        $this.pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, $this.pitchObject.rotation.x));
    };

    //dispose() {
    //     document.removeEventListener('mousemove', this.onMouseMove, false);
    //}

    getObject(): THREE.Object3D {
        return this.yawObject;
    }

    getDirection(): THREE.Vector3 {
        let v: THREE.Vector3 = new THREE.Vector3();
        let direction = new THREE.Vector3(0, 0, -1);
        let rotation = new THREE.Euler(0, 0, 0, "YXZ");
        rotation.set(this.pitchObject.rotation.x, this.yawObject.rotation.y, 0);
        v.copy(direction).applyEuler(rotation);
        return v;
    }
}