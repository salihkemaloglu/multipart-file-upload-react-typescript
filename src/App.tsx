import React from 'react';
import './App.css';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Header, Icon, Segment, Image } from 'semantic-ui-react'
import Typography from '@material-ui/core/Typography';
import { LinearProgress, Switch, TextField } from '@material-ui/core';

var logo = require('./avatar3.png')
var logo2 = require('./avatar2.png')
const App: React.FC = () => {

  function getSteps() {
    return ['Publisher Information', 'File upload', 'Send file to FUTURE'];
  }

  // function getStepContent(stepIndex: any) {
  //   switch (stepIndex) {
  //     case 0:
  //       return 'Select campaign settings...';
  //     case 1:
  //       return 'What is an ad group anyways?';
  //     case 2:
  //       return 'This is the bit I really care about!';
  //     default:
  //       return 'Uknown stepIndex';
  //   }
  // }

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  const [completed, setCompleted] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);


  const progress = React.useRef(() => { });
  React.useEffect(() => {
    progress.current = () => {
      if (completed > 100) {
        setCompleted(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setCompleted(completed + diff);
        setBuffer(completed + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    function tick() {
      progress.current();
    }
    const timer = setInterval(tick, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };
  const handleChangePublisher = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  const handleChangePublisherEmail = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  return (
    <div className="App" style={{ width: '80%', marginLeft: '10%' }}>

      <Segment placeholder color="black" style={{ width: '60%', marginLeft: '20%', marginTop: '2%', display: activeStep === 0 ? 'block' : 'none' }} >
        <div style={{ display: state.checkedB === false ? 'block' : 'none' }}>
          <div style={{ float: "left" ,marginTop: "4%"}}>
            <Image src={logo2} size='small' circular />
          </div>
          <div style={{ float: "left", marginTop: "3%", marginLeft: "2%", textAlign: "left" }}>
              <TextField
                id="standard-name"
                label="Publisher"
                defaultValue="John wick"
                onChange={handleChangePublisher('name')}
                margin="normal"
              /><br />
              <TextField
                id="standard-name"
                label="Information Email"
                defaultValue="john@wick.com"
                onChange={handleChangePublisherEmail('name')}
                margin="normal"
              /><br />
          </div>
          <div style={{ float: "right", marginRight: "1%" }}>
            <strong>Anonym:<Switch
              checked={state.checkedB}
              onChange={handleChange('checkedB')}
              value="checkedB"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            /></strong>
          </div>
        </div>
        <div style={{ display: state.checkedB === true ? 'block' : 'none' }}>
          <div style={{ float: "left" ,marginTop: "4%"}}>
            <Image src={logo} size='small' circular />
          </div>
          <div style={{ float: "left", marginTop: "7%", marginLeft: "2%", textAlign: "left" }}>
            <code><p><strong>Publisher: </strong>Anonymous User</p></code><br />
            <code><p><strong>Information Email: </strong>Anonymous Email</p></code>
          </div>
          <div style={{ float: "right", marginRight: "1%" }}>
            <strong>Anonym:<Switch
              checked={state.checkedB}
              onChange={handleChange('checkedB')}
              value="checkedB"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            /></strong>
          </div>
        </div>
      </Segment>
      <Segment placeholder color="grey" style={{ width: '60%', marginLeft: '20%', marginTop: '2%', display: activeStep === 1 ? 'block' : 'none' }}>
        <Header icon>
          <Icon className='pdf file outline' />
          No documents are listed for this customer.
          <LinearProgress color="secondary" variant="buffer" value={completed} valueBuffer={buffer} />
        </Header>
        <Button color="primary">Add Document</Button>
      </Segment>
      <Segment placeholder color="green" style={{ width: '60%', marginLeft: '20%', marginTop: '2%', display: activeStep === 2 ? 'block' : 'none' }} >
        <p>end</p>
      </Segment>
      <div style={{ marginLeft: '5%' }}>
        <Stepper activeStep={activeStep} alternativeLabel style={{ color: 'black' }} color="black">
          {steps.map(label => (
            <Step key={label} style={{ color: 'black' }} color="black">
              <StepLabel style={{ color: 'black' }} color="black">{label}</StepLabel >
            </Step>
          ))}
        </Stepper>
        <div >
          {activeStep === steps.length ? (
            <div>
              <Typography >All steps completed</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
              <div>
                {/* <Typography className={classes.instructions} style={{ color: 'black' }}>{getStepContent(activeStep)}</Typography> */}
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}

                  >
                    Back
              </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>

                </div>
              </div>
            )}
        </div>
      </div>


    </div>
  );
}

export default App;
