require('./css/index.scss');
import React from "react";
import { render } from "react-dom";
import { Game } from "./components/Game";

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      score: 0,
      lives: 5
    }
  }

  updateScore(attempt){
    if(attempt) {
      console.log("score should go up");
      this.setState({
        score: this.state.score + 100
      })
    } else {
      this.setState({
        score: this.state.score - 50,
        lives: this.state.lives - 1
      })
    }

    if(this.state.lives <=0) {
      this.setState({
        score: 0,
        lives: 3
      })
    }
  }

  render(){
    return(
      <div id="App">
        <header>
          <h2 className="score">Score:<span>{this.state.score}</span></h2>
          <h2 className="lives">Lives: <span>{this.state.lives}</span></h2>
          <div className="clearfix"></div>
        </header>
        <Game updateScore={this.updateScore.bind(this)} lives={this.state.lives}/>
      </div>
    )
  }
}

render(<App/>,document.getElementById('app'));
