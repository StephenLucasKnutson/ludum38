import {Autowired} from "./Autowired";
//http://stackoverflow.com/questions/31655888/how-to-cast-a-visible-ray-threejs
export class CrossHair {
    autowired: Autowired;
    mesh: THREE.Mesh;


    constructor(autowired: Autowired) {
        this.autowired = autowired;

        let material = new THREE.LineBasicMaterial({color: 0xAAFFAA});

        // crosshair size
        let x = 0.01;
        let y = 0.01;

        let geometry = new THREE.Geometry();

        // crosshair
        geometry.vertices.push(new THREE.Vector3(0, y, 0));
        geometry.vertices.push(new THREE.Vector3(0, -y, 0));
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(x, 0, 0));
        geometry.vertices.push(new THREE.Vector3(-x, 0, 0));

        let mesh = new THREE.Line(geometry, material);

        // place it in the center
        let crosshairPercentX = 50;
        let crosshairPercentY = 50;
        let crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
        let crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;

        mesh.position.x = crosshairPositionX * ((autowired.camera as THREE.PerspectiveCamera).aspect);
        mesh.position.y = crosshairPositionY;

        mesh.position.z = -0.5;

        this.autowired.camera.add(mesh);
    }
}