import { Component } from "react";
import "./assets/webfonts/webfonts.css";
// import "./assets/css/normalize.css";
import "./assets/css/index.min.css";
import {
	BrowserRouter as Router,
	Route,
} from "react-router-dom";
import Navigation from "./components/Navigation.js"
import Header from "./components/Header.js"

class App extends Component {
	constructor() {
		super();
		this.state = {
			navOpen: false,
		}
		this.getData = this.getData.bind(this);
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
	componentDidMount() {
	}
	render() {
		return (
			<Router basename={'/chapel'}>
				<div className={this.state.navOpen ? "navOpen" : ""}>
					<Navigation
						getData={this.getData}
						navOpen={this.state.navOpen}/>
					<Header/>
					<Route
						path={`/`}
						exact
						render={props => {
							return <div {...props}>
								Homepage!!!!!!!
							</div>
						}} />
					<Route
						path={`/example`}
						render={props => {
							return <button {...props}>
								example page!!!!!!!
							</button>
						}} />
				</div>
			</Router>
		);
	};
}; export default App;