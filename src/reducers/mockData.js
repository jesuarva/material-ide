import * as ELEMENTS from './elements';

export const MOCK_DATA = {
  aluminium_oxide: {
    elements: ['O', 'Al'],
    atoms: 6,
    material: {
      atom_1: {
        element: ELEMENTS.O,
        x: -0.083333,
        y: 0.25,
        z: 0.583333,
      },
      atom_2: {
        element: ELEMENTS.O,
        x: 0.25,
        y: 0.583333,
        z: -0.083333,
      },
      atom_3: {
        element: ELEMENTS.O,
        x: -0.25,
        y: -0.583333,
        z: 0.083333,
      },
      atom_4: {
        element: ELEMENTS.O,
        x: 0.083333,
        y: -0.25,
        z: -0.583333,
      },
      atom_5: {
        element: ELEMENTS.Al,
        x: 0.583333,
        y: 0.583333,
        z: 0.583333,
      },
      atom_6: {
        element: ELEMENTS.Al,
        x: -0.583333,
        y: -0.583333,
        z: -0.583333,
      },
    },
  },
};
