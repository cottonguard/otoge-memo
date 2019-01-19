import React, { Component } from 'react';
import './App.css';

import FindMusic from './FindMusic.js';
import MemoList from './MemoList.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextId: 1,
      list: []
    };

    this.generateId = this.generateId.bind(this);
    this.addMemo = this.addMemo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  generateId() {
    let id = this.state.nextId;
    this.setState({ nextId: id + 1 });
    return id;
  }

  addMemo(data) {
    let id = this.generateId();
    this.setState((state, props) => {
      let list = this.state.list;
      list.push({
	id,
	status: 'unplayed',
	...data
      });
      return { list };
    });
  }

  handleSubmit(e) {
    this.addMemo(e.data);
  }

  handleChangeStatus(e, id, status) {
    this.setState((state, props) => {
      let list = state.list;
      let index = list.findIndex(elem => elem.id === id);
      list[index].status = status;
      return { list };
    });
  }

  render() {
    return (
      <div className="App">
	<div className="main-container">
	  <h2>やる曲メモ</h2>
	  <FindMusic onSubmit={this.handleSubmit} />
	  <MemoList data={this.state.list}
	   onChangeStatus={this.handleChangeStatus} />
	</div>
      </div>
    );
  }
}

export default App;
