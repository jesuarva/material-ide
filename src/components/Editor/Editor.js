import React from 'react';
import { connect } from 'react-redux';
import './Editor.css';
import Atom from '../Atom/Atom';
import { updatedAtom } from '../../actions';

const Editor = ({ materialName, newMaterial, updatedAtom }) => {
  const { elements, numberOfAtoms, spaceDistribution } = newMaterial;
  console.log(spaceDistribution);

  const atomsForm = spaceDistribution.map((element, index) => (
    <Atom key={Math.random() + Date.now()} data-index={index} />
  ));

  updatedAtom();

  return (
    <div className="editor d-flex flex-column justify-content-between">
      <div>{materialName}</div>
      <div>other details</div>
      <div style={{ height: window.innerHeight }} className="editor">
        {atomsForm}
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
  { updatedAtom },
)(Editor);
