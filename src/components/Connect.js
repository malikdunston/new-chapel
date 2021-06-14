import { Component } from "react";
	import {Link} from "react-router-dom";
class Connect extends Component {
constructor() {
	super();
	this.state = {
		offPage: false,
		open: false,
		menu: [
			"students",
			"community",
			"faculty"
		]
	}
};
toggleConnect = (item) => (ev) => {
	this.setState({
		open: !this.state.open
	})
}
render() {
	return (
		<div id="nav-connect"
			className={(this.state.offPage ? " offpage" : "") + (this.state.open ? " open" : "")}>
			<button onClick={this.toggleConnect()}>
				<h3>Connect</h3>
			</button>
			<ul className="connect-list">
				{this.state.menu.map(item=>{
					return <Link to={`/connect/${item}`}>
						<li className="connect-list-item">
							{item}
						</li>
					</Link>
				})}
			</ul>
		</div>
	);
};
}; export default Connect;
