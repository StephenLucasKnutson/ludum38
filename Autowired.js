"use strict";
var World_1 = require("./World");
var PCFSoftShadowMap = THREE.PCFSoftShadowMap;
var Autowired = (function () {
    function Autowired() {
        this.world = new World_1.World();
        this.isGameOver = false;
        this.canvasElement = $("#myCanvas");
        var VIEW_ANGLE = 75;
        var NEAR = 0.1;
        var FAR = 100;
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvasElement.get(0),
            antialias: true,
            precision: "highp"
        });
        this.renderer.autoClear = false;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, window.innerWidth / window.innerHeight, NEAR, FAR);
        this.scene = new THREE.Scene();
        var light = new THREE.PointLight(0xFFFFFF, 0.5, 30);
        light.position.set(0, 0, 0);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0x404040));
        this.glowScene = new THREE.Scene();
        this.glowScene.add(new THREE.AmbientLight(0xFFFFFF));
        var dirLight = new THREE.PointLight(0xffffff, 1);
        this.camera.add(dirLight);
        this.glowScene.add(dirLight);
    }
    return Autowired;
}());
exports.Autowired = Autowired;
