import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
	unplayed: true,
	played: false
      }
    };

    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  handleChangeFilter(e) {
    let name = e.target.name;
    let checked = e.target.checked;
    this.setState((state, props) => ({
      filter: {
	...state.filter,
	[name]: checked
      }
    }));
  }

  handleChangeStatus(e, id) {
    this.props.onChangeStatus(e, id, e.status); 
  }

  render() {
    return (
      <div>
	<label>
	  <input type="checkbox" 
	   name="unplayed"
	   checked={this.state.filter.unplayed}
	   onChange={this.handleChangeFilter} />
	  未プレー
	</label>
	<label>
	  <input type="checkbox" 
	   name="played"
	   checked={this.state.filter.played} 
	   onChange={this.handleChangeFilter} />プレー済み
        </label>
	{
	  this.props.data
	  .filter(entry => 
	    (this.state.filter.unplayed && entry.status === 'unplayed')
	    || (this.state.filter.played && entry.status === 'played')
	  )
	  .map(entry => (
	    <MemoEntry 
	     key={entry.id}
	     data={entry}
	     onChangeStatus={e => this.handleChangeStatus(e, entry.id)} />
	  ))
	}
      </div>
    );
  }
}

class MemoEntry extends Component {
  constructor(props) {
    super(props);
    
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  handleChangeStatus(e) {
    let status = e.target.name;
    this.props.onChangeStatus({
      status
    });
  }

  render() {
    let status = this.props.data.status;
    return (
      <div className={`memo-entry memo-entry-${status}`}>
	{this.props.data.musicName}
	{
	  status === 'unplayed' &&
	  <button name="played"
	   onClick={e => this.handleChangeStatus(e)}>
	    プレーした
	  </button>
	}
      </div>
    );
  }
}
