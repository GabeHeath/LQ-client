import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_CLIENT_ID', () => {
   const initialState = Map();
   const action = {
     type: 'SET_CLIENT_ID',
     clientId: '1234'
   };
   const nextState = reducer(initialState, action);

   expect(nextState).to.equal(fromJS({
     clientId: '1234'
   }));
  });

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Jurassic Park', 'Lost World'),
          tally: Map({'Jurassic Park': 1})
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jurassic Park', 'Lost World'],
        tally: {'Jurassic Park': 1}
      }
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Jurassic Park', 'Lost World'],
          tally: {'Jurassic Park': 1}
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jurassic Park', 'Lost World'],
        tally: {'Jurassic Park': 1}
      }
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Jurassic Park', 'Lost World'],
          tally: {'Jurassic Park': 1}
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jurassic Park', 'Lost World'],
        tally: {'Jurassic Park': 1}
      }
    }));
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Jurassic Park', 'Lost World'],
        tally: {'Jurassic Park': 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Jurassic Park'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jurassic Park', 'Lost World'],
        tally: {'Jurassic Park': 1}
      },
      hasVoted: 'Jurassic Park'
    }));
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Jurassic Park', 'Lost World'],
        tally: {'Jurassic Park': 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Jurassic Park III'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jurassic Park', 'Lost World'],
        tally: {'Jurassic Park': 1}
      }
    }));
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Jurassic Park', 'Lost World'],
        tally: {'Jurassic Park': 1}
      },
      hasVoted: 'Jurassic Park'
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Jurassic Park III', 'Jurassic World']
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jurassic Park III', 'Jurassic World']
      }
    }));
  });

});