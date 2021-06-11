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
	let data = await this.props.getData("pages", "");
	let allPages = data.map(m=>{
		return {
			id: m.id,
			parent: m.parent,
			slug: m.slug,
			img: m.acf.image,
			title: m.title.rendered,
			brief: m.excerpt.rendered,
			selected: false
		}
	})
	let main = allPages.filter(p=>p.parent == 0);
	let otherPages = allPages.filter(p=>p.parent !== 0);
	let menu = main.map(tab=>{
		let nodes = otherPages.filter(p=>p.parent == tab.id);
		nodes = nodes.map(n=>{
			return {
				...n,
				ends: otherPages.filter(e=>e.parent == n.id)
			}
		})
		let menuItem = {
			...tab,
			nodes: nodes
		}
		return menuItem
	})
	this.setState({
		menu: menu,
		current: menu[0]
	})
}
selectNavOption(x){
	this.setState({current: this.state.menu[x]})
}
select = (node) => (ev) =>{
	let current = this.state.current;
	let thisNode = current.nodes.filter(n=>n.id === node.id)[0];
	thisNode.selected = !thisNode.selected;
	this.setState({current: current});
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
					{this.state.current.nodes.map(node=>{
						return <li 
							key={node.id}
							className={"list-parent" + (node.selected ? " selected" : "")}>
							<div className="parent-title">
								{node.title}
								<div className="parent-title-icon" onClick={this.select(node)}></div>
							</div>
							<ul className="list-child">
								{node.ends.map(end=>{
									return <li key={end.id} className="child-title">
										{end.title}
									</li>
								})}
							</ul>
						</li>
					})}
				</ul>
				<div id="body-options"></div>
			</div>
		</div>
	);
};
}; export default Navigation;