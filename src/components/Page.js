import { Component } from "react";
	import {Link} from "react-router-dom";
	import Header from "./Header.js"
class Page extends Component {
constructor() {
	super();
	this.state = {
		page: {
			title: { rendered: "" },
			content: { rendered: "" }
		},
		people: [],
		ends: []
	}
	this.matchParams = this.matchParams.bind(this);
	this.getPeople = this.getPeople.bind(this);
};
async matchParams(){
	let parentPage = await this.props.getData("pages", `&slug=${this.props.match.params.node}`);
	let childPage = await this.props.getData("pages", `&slug=${this.props.match.params.end}`);
	let page;
	!this.props.match.params.end ? page = parentPage : page = childPage;
	this.setState({
		page: page[0],
		ends: this.props.fullMenu.filter(p=>p.parent === parentPage[0].id)
	})
}
async getPeople(){
	let people = await this.props.getData("people", "");
	if(this.props.match.params.end !== "staff" ){
		people = people.filter(p=>p.acf.chaplaincy === this.props.match.params.end)
	}
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
				return <Link to={`/people/${p.slug}`}>
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
moreInThisSection(){
	return <section>
		<h3>More in this Section</h3>
		{this.state.ends.map(p=>{
			return <Link to={`/${this.props.match.params.node}/${p.slug}`}>
				<p>{p.title}</p>
			</Link>
		})}
	</section>
}
render() {
	return (
		<div id="page">
			<article className="content">
				<h1 id="site">{this.state.page.title.rendered}</h1>
				<section className="wp-section">
					{(this.props.match.params.end === "staff" )
						? this.renderPeople(this.state.people)
						: <div dangerouslySetInnerHTML={{ __html: this.state.page.content.rendered }}></div>}
				</section>
			</article>
			<article className="side">
				{this.renderPeople(this.state.people)}
				{this.moreInThisSection()}
			</article>
		</div>
	);
};
}; export default Page;