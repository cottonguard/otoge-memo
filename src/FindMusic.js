import React, { Component } from 'react';
import './FindMusic.css'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    this.props.onSubmit({
      data: {
	musicName: this.state.value,
      }
    });
    this.setState({value: ''});
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
	<input type="text" 
	 value={this.state.value}
	 onChange={this.handleChange}
         className="find-textbox"
	 placeholder="曲名" />
      </form>
    );
  }
}
