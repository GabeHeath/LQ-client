import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import Results from '../../src/components/Results';
import {expect} from 'chai';

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Jurassic Park', 'Lost World');
    const tally = Map({'Jurassic Park': 5});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
      );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [jp, lw] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(jp).to.contain('Jurassic Park');
    expect(jp).to.contain('5');
    expect(lw).to.contain('Lost World');
    expect(lw).to.contain('0');
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('Jurassic Park', 'Lost World');
    const component = renderIntoDocument(
      <Results pair={pair}
      tally={Map()}
      next={next}/>
      );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner="Jurassic Park"
      pair={["Jurassic Park", "Lost World"]}
      tally={Map()} />
      );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Jurassic Park');
  });

});