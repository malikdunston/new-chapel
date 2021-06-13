import { Component } from "react";
	import "./assets/webfonts/webfonts.css";
	// import "./assets/css/normalize.css";
	import "./assets/css/index.min.css";
	import {
		BrowserRouter as Router,
		Route,
		Link
	} from "react-router-dom";
	import moment from "moment";
	import Navigation from "./components/Navigation.js"
	import Header from "./components/Header.js"
	import Connect from "./components/Connect.js"
	import Event from "./components/Event.js"
	import Homepage from "./components/Homepage.js"
	import Page from "./components/Page.js"
class App extends Component {
	constructor() {
		super();
		this.state = {
			navOpen: false,
			events: []
		}
		this.getData = this.getData.bind(this);
		this.sortEvents = this.sortEvents.bind(this);
	};
	async getData(type, params) {
		let url = "https://hendrickswp.cecildunston.com/wp-json/wp/v2/", ext = "";
		switch (type) {
			case "pages":
				ext = "pages";
				break
			case "people":
				ext = "people";
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
	async componentDidMount() {
		let data = await fetch("https://dev.malikdunston.com/data/chapel/get_events.php");
		let events = await data.json();
		this.setState({events: this.sortEvents(JSON.parse(events))})
	};
	sortEvents(events){
		return events.map(e => {
			return {
				...e,
				month: moment(e.startDateTime).format("MMM"),
				day: moment(e.startDateTime).format("DD"),
				startTime: moment(e.startDateTime).format("h:mm A"),
				endTime: moment(e.endDateTime).format("h:mm A")
			}
		})
	}
	render() {
		return (
			<Router basename={'/chapel'}>
				<Navigation
					getData={this.getData}
					navOpen={this.state.navOpen} />
				<div className={"ui-view" + (this.state.navOpen ? " navOpen" : "")}>
					<Route
						path={`/`} exact
						render={props => {
							return <Homepage 
								event={this.state.events[0]} 
								getData={this.getData} 
								{...props}/>
						}} />
					<Route
						path={`/events`}
						render={props => {
							return <div>
								{this.state.events.map(event=>{
									return <Event {...event} />
								})}
							</div>
						}} />
					<Route
						path={`/:node/:end?`}
						render={props => {
							return <Page getData={this.getData} {...props}/>
						}} />

				</div>
				<Connect getData={this.getData} />
			</Router>
		);
	};
}; export default App;