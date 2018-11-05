import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import HeaderNavbar from '../Navbar/Navbar';
import Editor from '../Editor/Editor';
import Visualizer from '../Visualizer/Visualizar';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
