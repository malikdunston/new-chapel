import { Component } from "react";
	import {Link} from "react-router-dom";
	import Event from "./Event.js"
	import Header from "./Header.js"
class Homepage extends Component {
constructor() {
	super();
	this.state = {
		page: []
	}
};
async componentDidMount(){
	this.setState({
		page: await this.props.getData("homepage", "")
	})
}
render() {
	return (
		<div id="home">
			<Header />
			<Link to={"/events"}><Event {...this.props.event} /></Link>
			{this.state.page.map(block=>{
				return <div>
					<h1>{block.title.rendered}</h1>
					<p>{block.content.rendered}</p>
				</div>
			})}
		</div>
	);
};
}; export default Homepage;