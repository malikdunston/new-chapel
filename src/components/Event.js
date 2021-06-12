import { Component } from "react";
class Event extends Component {
constructor() {
	super();
	this.state = {
	}
};
componentDidMount(){
}
render() {
	return (
		<div className="event">				
			<div className="event-date">
				<div className="event-month">
					{this.props.month}
				</div>
				<div className="event-day">
					{this.props.day}
				</div>
			</div>
			<div className="event-info">
				<span className="event-time">
					{this.props.startTime} - {this.props.endTime}
				</span>
				<div className="event-name">
					{this.props.title}
				</div>
			</div>
		</div>
	);
};
}; export default Event;