import React from 'react';
import createReactClass from 'create-react-class';
import Winner from './Winner';
import Vote from './Vote';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Voting = createReactClass({
	mixins: [PureRenderMixin],
	render: function() {
		return <div>
		{this.props.winner ?
			<Winner ref="winner" winner={this.props.winner} /> :
			<Vote {...this.props} />}
			</div>;
		}
	});

function mapStateToProps(state) {
	return {
		pair: state.getIn(['vote', 'pair']),
		hasVoted: state.get('hasVoted'),
		winner: state.get('winner')
	};
}

connect(mapStateToProps)(Voting);

export const VotingContainer = connect(
	mapStateToProps,
	actionCreators
)(Voting);