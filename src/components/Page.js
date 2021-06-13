import { Component } from "react";
	import {Link} from "react-router-dom";
	import Header from "./Header.js"
class Page extends Component {
constructor() {
	super();
	this.state = {
		page: [],
		people: []
	}
	this.matchParams = this.matchParams.bind(this);
	this.getPeople = this.getPeople.bind(this);
};
async matchParams(){
	let slug
	this.props.match.params.end 
		? slug = this.props.match.params.end
		: slug = this.props.match.params.node;
	let page = await this.props.getData("pages", `&slug=${slug}`);
	this.setState({
		page: page
	})
}

async getPeople(){
	let people = await this.props.getData("people", "");
	people = people.filter(p=>p.acf.chaplaincy === this.props.match.params.end)
	this.setState({
		people: people
	})
}

componentDidUpdate(){
	this.matchParams();
	if(this.props.match.params.end){
		this.getPeople();
	}
}
componentDidMount(){
	this.matchParams();
	if(this.props.match.params.end){
		this.getPeople();
	}
}

renderPeople(people){
	if(this.props.match.params.end && this.state.people.length > 0){
		return <section id="people">
			<h3>Contact</h3>
			{people.map(p=>{
				return <Link to="/">
					<div className="person linked">
						<div className="person-img">
							<img src={p.acf.image} alt={`${p.fname} ${p.mname} ${p.lname}`} />
						</div>
						<div className="person-name">
							<h3>{p.title.rendered}</h3>
							<p>{p.acf.title}</p>
						</div>
					</div> 
				</Link>
			})}
		</section>
	}
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
						{this.renderPeople(this.state.people)}
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