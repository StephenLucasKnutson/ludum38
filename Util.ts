class Util {
    static copyPhysicsTo(physics, mesh) {
        let position: CANNON.Vec3 = physics.position;
        mesh.position.set(position.x, position.y, position.z);
        let quaternion: CANNON.Quaternion = physics.quaternion;
        mesh.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    }
}