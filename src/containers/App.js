import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {

    startInput: {
      startValue: '',
      startFlag: false,
      inputStartHour: 0,
      inputStartMinute: 0,
    },
    endInput: {
      endValue: '',
      endFlag: false,
      inputEndHour: 0,
      inputEndMinute: 0,
    },
    startButton: {
      startLabel: 'Start',
      startButtonFlag: null
    },
    pauseButton: {
      pauseLabel: 'Pause',
      pauseButtonFlag: null
    },
    resumeButton: {
      resumeLabel: 'Resume',
      resumeButtonFlag: null
    },
    stopButton: {
      stopLabel: 'Stop',
      stopButtonFlag: null
    },
    currentTimer: {
      currentValue: '',
      currentTimerFlag: false,
      currentHour: 0,
      currentMinute: 0,
      currentSecond: 0
    },
    backGroundTimer: {
      backGroundValue: '',
      backGroundTimerFlag: null,
      backGroundHour: null,
      backGroundMinute: null,
      backGroundSecond: null
    }
  }

  //Function to accept input value from user
  handleChange = (e) => {
    const { startInput, endInput } = this.state

    //to store targetName from input field
    let inputHTMLname = e.target.name

    //local variables to store inputName , hour , minute, flag values
    let x, hh, mm, flag

    //depending on the start or end input
    if (inputHTMLname === 'startValue') {
      x = startInput
      hh = 'inputStartHour'
      mm = 'inputStartMinute'
      flag = 'startFlag'
    }
    else if (inputHTMLname === 'endValue') {
      x = endInput
      hh = 'inputEndHour'
      mm = 'inputEndMinute'
      flag = 'endFlag'
    }

    //storing targetValue from the input
    let inputHTMLvalue = e.target.value

    //depending on the values it will correctly assign the values
    //will store object value for specified input
    x[inputHTMLname] = inputHTMLvalue;

    //extract hour from inputValue
    x[hh] = parseInt(inputHTMLvalue.substr(0, 2))

    //extract minute from inputValue
    x[mm] = parseInt(inputHTMLvalue.substr(3, 2))

    //will assign flag value true
    x[flag] = true

    this.setState({
      startInput,
      endInput,
    });


  }

  startTimerHandler = (e) => {

    this.initialAssignTimer();
    this.currentTimeRunner();
  }

  //to store the initial start time to currenttimer value
  initialAssignTimer = () => {
    let { startInput, currentTimer } = this.state

    const { inputStartHour, inputStartMinute } = startInput
    let { currentHour, currentMinute } = currentTimer;

    currentHour = inputStartHour
    currentMinute = inputStartMinute

    //used spread operator so we have to assign it to a object or variable
    currentTimer = {
      ...currentTimer,
      currentHour, currentMinute
    }

    this.setState({
      currentTimer
    })
  }

  //function to run for currentTimer
  currentTimeRunner = () => {
    setInterval(() => {

      //will calculate the updated time
      this.incrementTimer();
    }, 10)
  }

  incrementTimer = () => {
    const { currentTimer, endInput } = this.state

    const { inputEndHour, inputEndMinute } = endInput
    let { currentHour, currentMinute, currentSecond, currentTimerFlag } = currentTimer;

    if ((inputEndHour > currentHour) || ((inputEndHour === currentHour) && (inputEndMinute > currentMinute)))
    {

      currentTimerFlag = true;
      currentSecond = currentSecond + 1;
      if (currentSecond > 59) {
        currentSecond = 0;
        currentMinute += 1;
      }
      if (currentMinute > 59) {
        currentMinute = 0;
        currentHour += 1;
      }

      this.setState({
        currentTimer: {
          ...currentTimer,
          currentSecond,
          currentMinute,
          currentHour,
          currentTimerFlag
        }
      })
    }
    else {
      currentTimerFlag = false;
    }
  }


  stopTimerHandler = () => {

  }

  render() {
    const { startInput, endInput, startButton, stopButton, currentTimer } = this.state
    const { startValue } = startInput
    const { endValue } = endInput
    const { startLabel } = startButton
    const { stopLabel } = stopButton

    const { handleChange, startTimerHandler, stopTimerHandler } = this

    let { currentValue, currentHour, currentMinute, currentSecond } = currentTimer

    currentValue = `${currentHour}:${currentMinute}:${currentSecond}`

    // console.log(startInput, endInput)
    console.log(currentTimer)
    return (
      <div className="App" >
        <div className="input-time-display">
          Start
          <input type='time' name='startValue' value={startValue} onChange={handleChange}></input><br />
          End
          <input type='time' name='endValue' value={endValue} onChange={handleChange}></input>
        </div>
        <div>
          {currentValue}
        </div>
        <div>
          <input type='button' value={startLabel} onClick={startTimerHandler}></input><br />
          <input type='button' value={stopLabel} onClick={stopTimerHandler}></input>
        </div>

      </div>
    );
  }
}

export default App;
