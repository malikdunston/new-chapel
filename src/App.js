import { Component } from "react";
	import "./assets/webfonts/webfonts.css";
	// import "./assets/css/normalize.css";
	import "./assets/css/index.min.css";
	import {
		BrowserRouter as Router,
		Route,
	} from "react-router-dom";
	import Navigation from "./components/Navigation.js"

class App extends Component {
constructor() {
	super();
	this.state = {
		navOpen: false,
	}
	this.getData = this.getData.bind(this);
	this.navToggle = this.navToggle.bind(this);
};
navToggle(){
	this.setState({
		navOpen: !this.state.navOpen
	})
};
async getData(type, params) {
	let url = "https://hendrickswp.cecildunston.com/wp-json/wp/v2/", ext = "";
	switch (type) {
		case "pages":
			ext = "pages";
			break
		case "nav":
			ext = "pages";
			break
		case "homepage":
			ext = "homepage";
			break
		case "connect":
			ext = "connect";
			break
		default: 
			break
	};
	let resp = await fetch(url + ext + "?per_page=100" + params);
	let data = await resp.json();
	return data;
};
componentDidMount(){
}
render() {
	return (
		<Router>
			<div className={this.state.navOpen ? "navOpen" : ""}>
				<Navigation
					getData={this.getData}
					navOpen={this.state.navOpen}
					navToggle={this.navToggle}/>
			</div>
		</Router>
	);
};
}; export default App;