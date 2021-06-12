import { Component } from "react";
	import {Link} from "react-router-dom";
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
async componentDidMount(){
	setTimeout(()=>{
		this.setState({headerOpen: true})
	}, 700)
}
render() {
	return (
		<div id="header-main">
			<div className={"header-image" + (this.state.headerOpen ? " header-image-open" : "")}>
				<img src={this.state.data.img.src} alt={this.state.data.img.alt} />
			</div>
			<h1 id="header-title">
				{this.state.data.title}
			</h1>
		</div>
	);
};
}; export default Header;