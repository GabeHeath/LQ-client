import React from 'react';
import createReactClass from 'create-react-class';
import Winner from './Winner';
import Vote from './Vote';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default createReactClass({
	mixins: [PureRenderMixin],
	render: function() {
		return <div>
		{this.props.winner ?
			<Winner ref="winner" winner={this.props.winner} /> :
			<Vote {...this.props} />}
			</div>;
		}
	});