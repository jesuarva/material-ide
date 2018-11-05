import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import HeaderNavbar from '../Navbar/Navbar';
import Editor from '../Editor/Editor';
import Visualizer from '../Visualizer/Visualizar';
import { fetchingItems } from '../../actions';

class App extends Component {
  componentDidMount() {
    const { fetchingItems } = this.props;
    fetchingItems();
  }

  render() {
    const { fetched_Item } = this.props;

    return fetched_Item ? (
      <div className="App">
        <HeaderNavbar />
        <div className="container-fluid align-content-stretch ">
          <div className="row">
            <div className="editor-container col-4">
              <Editor />
            </div>
            <div className="row col-8">
              <Visualizer />
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state, dispatch) => {
  return {
    fetched_Item: state.fetched_Item,
    dispatch,
  };
};

export default connect(
  mapStateToProps,
  { fetchingItems },
)(App);
