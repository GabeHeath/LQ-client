import React from 'react';
import createReactClass from 'create-react-class';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default createReactClass({
	mixins: [PureRenderMixin],
	render: function() {
		return <div className="winner">
		Winner is {this.props.winner}!
		</div>;
	}
});