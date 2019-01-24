//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import player from "./player.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    player,
    clickedPlayer: [],
    score: 0
  };

//when you click on a card ... the player is taken out of the array
  imageClick = event => {
    const currentPlayer = event.target.alt;
    const PlayerAlreadyClicked =
      this.state.clickedPlayer.indexOf(currentPlayer) > -1;

//if you click on a player that has already been selected, the game is reset and cards reordered
    if (PlayerAlreadyClicked) {
      this.setState({
        player: this.state.player.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedPlayer: [],
        score: 0
      });
        alert("You are Not a Fan! Play again?");

//if you click on an available player, your score is increased and cards reordered
    } else {
      this.setState(
        {
          player: this.state.player.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedPlayer: this.state.clickedPlayer.concat(
            currentPlayer
          ),
          score: this.state.score + 1
        },
//if you get all 12 player corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win! You Are a True Fan!");
            this.setState({
              player: this.state.player.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedPlayer: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.player.map(player => (
            <FriendCard
              imageClick={this.imageClick}
              id={player.id}
              key={player.id}
              image={player.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;