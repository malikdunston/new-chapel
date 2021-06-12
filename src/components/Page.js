import { Component } from "react";
	import {Link} from "react-router-dom";
	import Header from "./Header.js"
class Page extends Component {
constructor() {
	super();
	this.state = {
		page: []
	}
};
async componentDidUpdate(){
	let slug
	this.props.match.params.end 
		? slug = this.props.match.params.end
		: slug = this.props.match.params.node;
	this.setState({
		page: await this.props.getData("pages", `&slug=${slug}`)
	})
}
async componentDidMount(){
	let slug
	this.props.match.params.end 
		? slug = this.props.match.params.end
		: slug = this.props.match.params.node;
	this.setState({
		page: await this.props.getData("pages", `&slug=${slug}`)
	})
}
render() {
	return (
		<div id="page">
			{this.state.page.map(block=>{
				return <div>
					<article className="content">
						<h1 id="site">{block.title.rendered}</h1>
						<section className="wp-section">
							<p>{block.content.rendered}</p>
						</section>
					</article>
					<article className="side">
						<section id="people"
							ng-if="end.people.length > 0 ">
							<h3 ng-hide="end.slug == 'staff'">
								Contact
							</h3>
							<div
								className="person linked"
								ui-sref="people({person: x.slug})"
								ng-repeat="x in end.people">
								<div className="person-img">
									<img src="" alt="" />
								</div>
								<div className="person-name">
									<h3></h3>
									<p></p>
								</div>
							</div>
						</section>
						<section>
							<h3>More in this Section</h3>
							<div
								className="linked"
								ng-repeat="x in end.sections">
								<p ui-sref="end({node: end.node.slug, end: x.slug})"
									ng-bind-html="x.title">
								</p>
							</div>
						</section>
					</article>
				</div>
			})}
		</div>
	);
};
}; export default Page;