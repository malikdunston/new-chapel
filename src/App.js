import { Component } from "react";
	import "./assets/webfonts/webfonts.css";
	// import "./assets/css/normalize.css";
	// import "./assets/css/index.min.css";
	import {
		BrowserRouter as Router,
		Route,
	} from "react-router-dom";

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
getData(type, params, callback) {
// need to cache proj responses for an hour to optimize performance
	let url = "http://wp.malikdunston.com/wp-json/wp/v2/", ext;
	switch (type) {
		case "projects":
			ext = "projects?per_page=100" + params
			break
	};
	fetch(url + ext)
		.then(data => data.json())
		.then(data => {
			callback(data)
		});
};
componentDidMount(){
	console.log(window);
}
render() {
	return (
		<Router>
			<div className={"home"}>
			</div>
		</Router>
	);
};
}; export default App;