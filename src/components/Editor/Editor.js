import React from 'react';
import { connect } from 'react-redux';
import './Editor.css';
import Atom from '../Atom/Atom';

const Editor = ({ materialName, newMaterial }) => {
  const { elements, numberOfAtoms, spaceDistribution } = newMaterial;
  console.log(spaceDistribution);

  // const atomsForm =

  return (
    <div className="editor d-flex flex-column justify-content-between">
      <div>{materialName}</div>
      <div>other details</div>
      <div className="editor d-flex flex-column justify-content-around">
        <Atom />
        <Atom />
        <Atom />
        <Atom />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    newMaterial: state.data[state.picked_material], // get current selected material.
    materialName: state.picked_material,
  };
};

export default connect(
  mapStateToProps,
  {},
)(Editor);
