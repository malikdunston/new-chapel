import { Component } from "react";
class Navigation extends Component {
constructor() {
	super();
	this.state = {
		menu: [],
		current: {
			id: null,
			slug: null,
			img: "",
			title: "",
			brief: "",
			nodes: []
		}
	}
};
async componentDidMount(){
	this.setState({menu: await this.props.getData("pages", "&parent=0")})
}
selectNavOption(x){
	this.setState({current: this.state.menu[x]})
}
render() {
	return (
		<div id="nav-menu">
			<div id="menu-top">
				<a href="/" className="logo-wrap">
					<img id="logo" src="images/logo.svg" alt="Hendricks Chapel Logo" />
				</a>
				<button id="hamburger" onClick={this.props.navToggle}>
					{this.props.navOpen ? <span>✕</span> : <span>☰</span>}
				</button>
			</div>
			<div id="menu-body">
				<div id="body-header">
					<div className="header-image">
						<img src={this.state.current.img} alt="" />
					</div>
					<a className="header-title">
						{this.state.current.title}
					</a>
					<h2 className="header-brief">
						{this.state.current.brief}
					</h2>
				</div>
				<ul id="body-list">
					<li className="list-parent">
						<div className="parent-title">
							Something Here
							<div className="parent-title-icon"></div>
						</div>
						<ul className="list-child">
							<li className="child-title">
								a sub
							</li>
							<li className="child-title">
								a sub
							</li>
							<li className="child-title">
								a sub
							</li>
						</ul>
					</li>
				</ul>
				<div id="body-options"></div>
			</div>
		</div>
	);
};
}; export default Navigation;