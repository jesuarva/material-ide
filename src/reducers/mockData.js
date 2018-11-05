import * as ELEMENTS from './elements';

export const MOCK_DATA = {
  aluminium_oxide: {
    elements: [ELEMENTS.O, ELEMENTS.Al],
    numberOfAtoms: 6,
    spaceDistribution: [
      {
        element: ELEMENTS.O,
        x: -0.083333,
        y: 0.25,
        z: 0.583333,
      },
      {
        element: ELEMENTS.O,
        x: 0.25,
        y: 0.583333,
        z: -0.083333,
      },
      {
        element: ELEMENTS.O,
        x: -0.25,
        y: -0.583333,
        z: 0.083333,
      },
      {
        element: ELEMENTS.O,
        x: 0.083333,
        y: -0.25,
        z: -0.583333,
      },
      {
        element: ELEMENTS.Al,
        x: 0.583333,
        y: 0.583333,
        z: 0.583333,
      },
      {
        element: ELEMENTS.Al,
        x: -0.583333,
        y: -0.583333,
        z: -0.583333,
      },
    ],
  },
};
