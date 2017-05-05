import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';
import {List} from 'immutable';
import Voting from '../../src/components/Voting';
import {expect} from 'chai';

describe('Voting', () => {

	it('renders a pair of buttons', () => {
		const component = renderIntoDocument(
			<Voting pair={["Jurassic Park", "Lost World"]} />
			);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
		expect(buttons[0].textContent).to.equal('Jurassic Park');
		expect(buttons[1].textContent).to.equal('Lost World');
	});

	it('invokes callback when a button is clicked', () => {
		let votedWith;
		const vote = (entry) => votedWith = entry;

		const component = renderIntoDocument(
			<Voting pair={["Jurassic Park", "Lost World"]}
			vote={vote}/>
			);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[0]);

		expect(votedWith).to.equal('Jurassic Park');
	});

	it('disables buttons when user has voted', () => {
		const component = renderIntoDocument(
			<Voting pair={["Jurassic Park", "Lost World"]}
			hasVoted="Jurassic Park" />
			);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
		expect(buttons[0].hasAttribute('disabled')).to.equal(true);
		expect(buttons[1].hasAttribute('disabled')).to.equal(true);
	});

	it('adds label to the voted entry', () => {
		const component = renderIntoDocument(
			<Voting pair={["Jurassic Park", "Lost World"]}
			hasVoted="Jurassic Park" />
			);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons[0].textContent).to.contain('Voted');
	});

	it('renders just the winner when there is one', () => {
		const component = renderIntoDocument(
			<Voting winner="Jurassic Park" />
			);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(0);

		const winner = ReactDOM.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Jurassic Park');
	});

	it('renders as a pure component', () => {
		const pair = ["Jurassic Park", "Lost World"];
		const container = document.createElement('div');
		let component = ReactDOM.render(
			<Voting pair={pair} />,
			container
			);

		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Jurassic Park');

		pair[0] = 'Jurassic Park III';
		component = ReactDOM.render(
			<Voting pair={pair} />,
			container
			);
		firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Jurassic Park');
	});

	it('does update DOM when prop changes', () => {
		const pair = List.of("Jurassic Park", "Lost World");
		const container = document.createElement('div');
		let component = ReactDOM.render(
			<Voting pair={pair} />,
			container
			);

		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Jurassic Park');

		const newPair = pair.set(0, 'Jurassic Park III');
		component = ReactDOM.render(
			<Voting pair={newPair} />,
			container
			);
		firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Jurassic Park III');
	});


});