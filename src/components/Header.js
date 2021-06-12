import { Component } from "react";
class Header extends Component {
constructor() {
	super();
	this.state = {
		headerOpen: false,
		data: {
			title: "A Student-Centered Global Home for Religious, Spiritual, Moral, and Ethical Life.",
			img: {
				src: `${process.env.PUBLIC_URL}/assets/images/choir.png`,
				alt: "We are Syracuse's student-centered home for spiritual life."
			}
		}
	}
};
componentDidMount(){
	setTimeout(()=>{
		this.setState({headerOpen: true})
	}, 700)
}
render() {
	return (
		<div id="header-main">
			<img 
				className={"header-image" + (this.state.headerOpen ? " header-image-open" : "")}
				src={this.state.data.img.src} 
				alt={this.state.data.img.alt} />
			<h1 id="header-title">
				{this.state.data.title}
			</h1>
		</div>
	);
};
}; export default Header;