import React from 'react';
import './App.css';
import MintPage from './pages/mint/mint';


class App extends React.Component {
  
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <MintPage />
        </header>
      </div>
    );
  }
}

export default App;
