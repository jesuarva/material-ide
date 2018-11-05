import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Label, Input } from 'reactstrap';
import { updateAtomInfo, updatedAtom } from '../../actions';

const Atom = (props) => {
  const { updateAtomInfo, updatedAtom } = props;
  const index = props['data-index'];
  const atom = props.elements[index];

  return (
    <div
      onChange={updateAtomInfo}
      className="d-flex flex-column justify-content-start"
    >
      <div className="row">
        <div className="col-12">{`${index}. ${atom.element.name}`}</div>
      </div>
      <div className="rowv form">
        <div className="col-12">
          <FormGroup>
            <Label for="x-coordinate">X</Label>
            <Input
              id={`x-coordinate-${index}`}
              type="text"
              name="x-coordinate"
              value={atom.x}
            />
            {/* value={element.x} */}
          </FormGroup>
        </div>
        <div className="col-12">
          <FormGroup>
            <Label for="y-coordinate">Y</Label>
            <Input
              id={`y-coordinate-${index}`}
              type="text"
              name="y-coordinate"
              value={atom.y}
            />
          </FormGroup>
        </div>
        <div className="col-12">
          <FormGroup>
            <Label for="z-coordinate">Z</Label>
            <Input
              id={`z-coordinate-${index}`}
              type="text"
              name="z-coordinate"
              value={atom.z}
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, dispatch) => {
  return {
    elements: state.data[state.picked_material].spaceDistribution,
    dispatch,
  };
};

export default connect(
  mapStateToProps,
  { updateAtomInfo, updatedAtom },
)(Atom);
