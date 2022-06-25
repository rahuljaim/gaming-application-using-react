import React, { Component } from "react";
import "./App.css";
import alpha from "./mock";

import correct from "./correctanswer.wav";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCount: 0,
      bestTime: 0,
      inputVal: "",
      bool: false,
      textDisplay: "",
      count: 0,
      play: false,
    };
    this.time = 0;
    this.audio = new Audio(correct);
  }
  timer = () => {
    this.time = setInterval(() => {
      if (this.state.inputVal !== "" || this.state.currentCount !== 0) {
        this.setState({
          currentCount: this.state.currentCount + 1,
        });
      }
      if (this.state.count === 19) {
        this.setState(
          {
            bool: false,
            bestTime: this.state.currentCount,
            textDisplay: "Success!",
            play: !this.state.play,
          },
          () => {
            this.state.play ? this.audio.play() : this.audio.pause();
          }
        );
        clearInterval(this.time);
      }
    }, 500);
  };
  componentDidMount() {
    let textArray = alpha[this.state.count].toUpperCase();
    this.setState({ textDisplay: textArray[0] });
  }
  componentDidUpdate(previousProps, previousState) {
    let textArray = alpha[this.state.count].toUpperCase();
    if (previousProps.data !== this.props.data) {
      this.setState({ textDisplay: textArray[0] });
    }
  }
  handleInput = (e) => {
    let inputTest = e.target.value;
    this.setState({
      inputVal: e.target.value,
      bool: true,
    });
    if (this.state.currentCount === 0) {
      this.timer();
    }
    let textArray = alpha[this.state.count].toUpperCase();

    if (textArray.length !== inputTest.length) {
      if (
        inputTest[inputTest.length - 1]?.toUpperCase() ===
        textArray[inputTest.length - 1]
      ) {
        this.setState({ textDisplay: textArray[inputTest.length] });
      }
    } else {
      this.setState(
        {
          count: this.state.count + 1,
          inputVal: "",
          textDisplay: alpha[this.state.count + 1][0],
          play: !this.state.play,
        },
        () => {
          this.state.play ? this.audio.play() : this.audio.pause();
        }
      );
    }
  };
  reset = () => {
    this.setState({ inputVal: "", bool: false });
    clearInterval(this.time);
  };

  componentWillUnmount() {
    clearInterval(this.time);
  }
  render() {
    let actualTime =
      this.state.currentCount > 60
        ? Math.floor(this.state.currentCount / 60) +
          " : " +
          (this.state.currentCount % 60)
        : this.state.currentCount;
    return (
      <div className="cover-container d-flex w-100 h-100  mx-auto flex-column">
        <main className="px-3">
          <h1 className="mt-3 pt-3 display-6">
            <strong>Type The Alphabet</strong>
          </h1>
          <h5 className=" m-2 lh-lg mb-3">
            Typing game to see how fast you type. <br /> Timer starts when you
            do {":)"}
          </h5>
          <div
            className="card border-dark mb-3 center"
            style={{ maxWidth: "38rem", maxHeight: "15rem" }}
          >
            <div className="card-body text-dark">
              <h1
                className="card-title p-4 display-2"
                style={{ color: "green", fontWeight: "bold" }}
              >
                {this.state.textDisplay}
              </h1>
            </div>
          </div>

          <p className="lead mb-2">Timer: {actualTime} seconds</p>
          <p className="lead mb-2">My best time is : {this.state.bestTime}</p>
        </main>

        <footer className="mt-auto sticky-bottom">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Type here"
              aria-label="Type here"
              aria-describedby="button-addon2"
              value={this.state.inputVal}
              onInput={this.handleInput}
            />
            <button
              className="btn btn-danger btn-lg"
              type="button"
              id="button-addon2"
              onClick={this.reset}
            >
              Reset
            </button>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
