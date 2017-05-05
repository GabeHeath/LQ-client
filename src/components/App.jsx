import React from 'react';
import createReactClass from 'create-react-class';
import {List, Map} from 'immutable';

const pair = List.of('Jurassic Park', 'Lost World');
const tally = Map({'Jurassic Park': 5, 'Lost World': 4});

export default createReactClass({
  render: function() {
    return React.cloneElement(this.props.children, {
    	pair: pair,
    	tally: tally
    });
  }
});