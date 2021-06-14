import { Component } from "react";
import { Link } from "react-router-dom";
class Navigation extends Component {
	constructor() {
		super();
		this.state = {
			navOpen: false,
			navIndex: 0,
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
		this.navToggle = this.navToggle.bind(this);
		this.hover = this.hover.bind(this);
	};
	async componentDidMount() {
		let data = await this.props.getData("pages", "");
		let allPages = data.map(m => {
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
		let main = allPages.filter(p => p.parent == 0);
		let otherPages = allPages.filter(p => p.parent !== 0);
		this.props.applyNav(otherPages);
		let menu = main.map(tab => {
			let nodes = otherPages.filter(p => p.parent == tab.id);
			nodes = nodes.map(n => {
				return {
					...n,
					ends: otherPages.filter(e => e.parent == n.id)
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
			current: menu[this.state.navIndex]
		})
		this.navToggle("open")("ev");
	}
	navToggle = (openClose) => (ev) => {
		switch (openClose) {
			case "open":
				this.setState({ navOpen: true })
				document.body.classList.add("navOpen");
				break;
			case "close":
				this.setState({ navOpen: false })
				document.body.classList.remove("navOpen");
				break;
			default:
				document.body.classList.toggle("navOpen");
				this.setState({
					navOpen: !this.state.navOpen
				})
				// this.state.navOpen
				// 	? disableScrolling()
				// 	: enableScrolling()
				break;
		}

		// function disableScrolling() {
		// 	var x = window.scrollX;
		// 	var y = window.scrollY;
		// 	window.onscroll = function () { window.scrollTo(x, y); };
		// }
		// function enableScrolling() {
		// 	window.onscroll = function () { };
		// }
	};
	select = (tab) => (ev) => {
		if(tab){
			let selectedTab = this.state.menu.filter(t => t.id === tab.id)[0];
			this.setState({ current: selectedTab })
		}
	}
	accordionToggle = (node) => (ev) => {
		let current = this.state.current;
		let thisNode = current.nodes.filter(n => n.id === node.id)[0];
		thisNode.selected = !thisNode.selected;
		this.setState({ current: current });
	}
	hover = (tab, openClose) => (ev) =>{
		this.select(tab)(ev);
		this.navToggle(openClose)(ev);
	}
render() {
return (
<div id="nav-menu" onMouseLeave={this.hover(null, "close")}>
	<div id="menu-top">
		<Link to={`/`} className="logo-wrap" onClick={this.navToggle("close")}>
			<img id="logo" src={`./assets/images/logo.svg`} alt="Hendricks Chapel Logo" />
		</Link>
		<button id="hamburger" onClick={this.navToggle()}>
			{this.state.navOpen ? <span>✕</span> : <span>☰</span>}
		</button>
	</div>
	<div id="menu-body">
		<div id="body-header">
			<img src={this.state.current.img} alt="" />
			<div dangerouslySetInnerHTML={{ __html: this.state.current.title }}></div>
			<h2 dangerouslySetInnerHTML={{ __html: this.state.current.brief }}></h2>
		</div>
		<ul id="body-list">
			{this.state.current.nodes.map(node => {
				return <li key={node.id}
					className={node.selected ? " selected" : ""}>
					<div>
						<Link to={`/${node.slug}`} onClick={this.navToggle("close")} dangerouslySetInnerHTML={{__html: node.title}}></Link>
						<div onClick={this.accordionToggle(node)}>
							{node.selected ? "-" : "+"}
						</div>
					</div>
					<ul>
						{node.ends.map(end => {
							return <Link to={`/${node.slug}/${end.slug}`}>
								<li key={end.id}
									className={node.selected ? "open" : ""}
									onClick={this.navToggle("close")}
									dangerouslySetInnerHTML={{__html: end.title}}>
								</li>
							</Link>
						})}
					</ul>
				</li>
			})}
		</ul>
	</div>
	<div id="tabs">
		{this.state.menu.map(tab => {
			return <div
				key={tab.id}
				className={tab.id === this.state.current.id ? " selected" : ""}
				onClick={this.select(tab)}
				onMouseEnter={this.hover(tab, "open")}>
				{tab.title}
			</div>
		})}
	</div>
</div>
);
};
}; export default Navigation;