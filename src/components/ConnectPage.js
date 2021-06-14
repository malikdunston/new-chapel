import { Component } from "react";
	import {Link} from "react-router-dom";
class ConnectPage extends Component {
constructor() {
	super();
	this.state = {
		data: []
	}
};
async componentDidMount(){
	let data = await this.props.getData("connect", "");
	let items = data.filter(d=>d.acf.pages.includes(this.props.match.params.with))
	this.setState({
		data: items
	})
}
render() {
	return (
		<div id="connect-page">
			<h1>Resources for <span>{this.props.match.params.with}</span></h1>
			{this.state.data.map(d=>{
				return <a href={d.acf.link}
					className="connect-badge">
					<div className="badge-top">
						{/* <img src={d.acf.image.url} alt="" /> */}
					</div>
					<h3 className="badge-bottom">{d.title.rendered}</h3>
				</a>
			})}
			
		</div>
	);
};
}; export default ConnectPage;