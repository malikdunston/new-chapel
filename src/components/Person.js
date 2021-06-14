import { Component } from "react";
	import {Link} from "react-router-dom";
class Person extends Component {
constructor() {
	super();
	this.state = {
		person: {
			image: "",
			name: "",
			title: "",
			about: "",
			phone: "",
			email: "",
			fax: ""
		}
	}
};
async componentDidMount(){
	let person = await this.props.getData("people", `&slug=${this.props.match.params.person}`)
	this.setState({
		person: {
			image: person[0].acf.image,
			name: person[0].title.rendered,
			title: person[0].acf.title,
			about: person[0].content.rendered,
			phone: person[0].acf.phone,
			email: person[0].acf.email,
			fax: person[0].acf.fax
		}
	})
}
render() {
	return (
		<div id="person">
			<div className="person-image">
				<img src={this.state.person.image} alt="" />
			</div>
			<article class="content">
				<h2 id="name">{this.state.person.name}</h2>
				<h3 id="title">{this.state.person.title}</h3>
				<ul id="social">
					{this.state.person.phone || this.state.person.email || this.state.person.fax
						? <h3> Contact </h3> : ""}
					{this.state.person.phone 
						? <li> phone: {this.state.person.phone}</li> : ""}
					{this.state.person.email 
						? <li> email: {this.state.person.email}</li> : ""}
					{this.state.person.fax 
						? <li> fax: {this.state.person.fax}</li> : ""}
				</ul>

				<p className="wp-section">
					{this.state.person.about}
				</p>
			</article>
		</div>
	);
};
}; export default Person;