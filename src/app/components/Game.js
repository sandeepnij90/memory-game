import React from "react";

export class Game extends React.Component {

  constructor(props){
    super();
    this.state = {
      message: 'Welcome press start to begin!',
      status: 'start'
    }
  }

  generateSequence(){
    var self = this;
    this.setState({
      message: 'Memorise this sequence'
    })
    this.sequence = [];
    this.userSequence = [];
    for(var i=0;i<6;i++){
      this.sequence.push(Math.floor((Math.random()*6) + 1));
    }
    var array = this.sequence;
    var counter = 0;
    var button = document.querySelector('#start');
    button.disabled = true;
    button.classList.add('inactive');
    console.log(this.sequence);
    // start animation
    var interval = setInterval(function(){
      // exit animation
      if(counter>=5) {
        clearInterval(interval);
        self.setState({
          message:'Repeat the sequence',
          status:'match'
        })
      }
      // actual animation
      console.log(array[counter]);
      var element = document.querySelector('.circle[data-number="'+array[counter]+'"]');
      element.classList.add('active');
      setTimeout(function () {
        element.classList.remove('active');
      }, 500,);
      counter++;
    },1000);
  }

  match(val){
    var button = document.querySelector('#start');
    var element = document.querySelector('.circle[data-number="'+val+'"]');
    element.classList.add('active');
    setTimeout(function () {
      element.classList.remove('active');
    }, 500,);
    this.userSequence.push(val);
    this.userSequence.map((val,index)=>{
      if(val !== this.sequence[index]){
        this.props.updateScore(false);
        if(this.props.lives <=1){
          this.setState({
            message: 'You have lost the game, press start to retry'
          })
        } else {
          this.setState({
            message: 'uh oh you got it wrong! try again',
            status:'start'
          });
        }

        button.disabled = false;
        button.classList.remove('inactive');
      }
    });

    if(this.userSequence.join('') == this.sequence.join('')){
      this.setState({
        message: 'You got it right!',
        status: 'start'
      });
      button.disabled = false;
      button.classList.remove('inactive');
      this.props.updateScore(true);
    }

  }

  render() {
    var circles ='';
    if(this.state.status =='start'){
      circles = (
        <div className="circles">
          <div data-number="1" className="circle circle1"></div>
          <div data-number="2" className="circle circle2"></div>
          <div data-number="3" className="circle circle3"></div>
          <div data-number="4" className="circle circle4"></div>
          <div data-number="5" className="circle circle5"></div>
          <div data-number="6" className="circle circle6"></div>
        </div>
      )
    }

    if(this.state.status == 'match'){
      circles= (
        <div className="circles">
          <div data-number="1" onClick={() => this.match(1)} className="circle circle1"></div>
          <div data-number="2" onClick={() => this.match(2)} className="circle circle2"></div>
          <div data-number="3" onClick={() => this.match(3)} className="circle circle3"></div>
          <div data-number="4" onClick={() => this.match(4)} className="circle circle4"></div>
          <div data-number="5" onClick={() => this.match(5)} className="circle circle5"></div>
          <div data-number="6" onClick={() => this.match(6)} className="circle circle6"></div>
        </div>
      )
    }

    return (
      <div id="game">
          <h1>{ this.state.message }</h1>
          {circles}
        <button id="start" onClick={this.generateSequence.bind(this)}>Start</button>
      </div>
    )
  }
}
