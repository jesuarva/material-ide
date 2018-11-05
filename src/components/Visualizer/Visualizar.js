import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as THREE from 'three';
import pointImg from '../../media/disc.png';

class Visualizer extends Component {
  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps, prevState) {
    this.init();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  init() {
    const { spaceDistribution, numberOfAtoms } = this.props.newMaterial;

    const width = this.mount.clientWidth;
    const height = window.innerHeight;

    //ADD SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(100, width / height, 1, 0);
    this.camera.position.z = 5;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor('#fff');
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    // PLANE
    const planeGeometry = new THREE.PlaneBufferGeometry(2000, 2000);
    planeGeometry.rotateX(-Math.PI / 2);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = -200;
    plane.receiveShadow = true;
    this.scene.add(plane);

    // HELPER
    const helper = new THREE.GridHelper(2000, 100);
    helper.position.y = -199;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    this.scene.add(helper);

    // ADD CUBE
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' });
    this.cube = new THREE.Mesh(geometry, material);
    // this.scene.add(this.cube);

    // POINTS
    const pointGeometry = new THREE.BufferGeometry();
    const pointSprite = new THREE.TextureLoader().load(pointImg);
    // Generate an array with all the x-y-z coordinates
    const vertices = spaceDistribution.reduce((control, vertex) => {
      const { x, y, z } = vertex;
      control.push(Number(x), Number(y), Number(z));
      // console.log(vertex, control);
      return control;
    }, []);

    pointGeometry.addAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3),
    );

    const pointMaterial = new THREE.PointsMaterial({
      size: 0.7,
      sizeAttenuation: true,
      map: pointSprite,
      alphaTest: 0.5,
      transparent: true,
    });
    pointMaterial.color.setHSL(1.0, 0.3, 0.7);

    this.atomsToDraw = new THREE.Points(pointGeometry, pointMaterial);
    this.scene.add(this.atomsToDraw);

    this.start();
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    // this.atomsToDraw.rotation.x += 0.01;
    // this.atomsToDraw.rotation.y += 0.01;
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };
  render() {
    const { atomUpdated } = this.props;

    return (
      <div
        key={`store-updated-${atomUpdated}`}
        style={{ width: '100%', height: '100%' }}
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newMaterial: state.data[state.picked_material], // get current selected material.
    atomUpdated: state.atomUpdated,
  };
};

export default connect(
  mapStateToProps,
  {},
)(Visualizer);
