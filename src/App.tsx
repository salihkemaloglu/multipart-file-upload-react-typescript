import React, { useState } from "react";
import "./App.css";
import { Segment, Image, Progress, Message } from "semantic-ui-react";
import { Switch, TextField } from "@material-ui/core";
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { tr } from 'date-fns/esm/locale';
import {
  createStyles,
  fade,
  Theme,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
registerLocale("tr", tr);
var avatarTest = require("./avatar3.png");
var avatarAnonym = require("./avatar2.png");
const App: React.FC = () => {
  const [percent, setPercent] = useState(80);
  const [completed, setCompleted] = useState(false);
  const [dropzoneStatus, setDropzoneStatus] = useState("upload");
  const [inputType, setInputType] = useState("success");
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
  });
  const [file, setFile] = React.useState({
    fileData: [],
    fileName: '',
    fileSize: '',
    selectedFile: null,
  });
  let data = new FormData();
  function readableBytes(bytes: number) {
    var i = Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
  }
  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };
  const handleChangePublisher = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    if (event.target.value.length == 0) {
      setInputType("error");
    } else {
      setInputType("success");
    }
  };
  const handleChangePublisherEmail = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  function handleChangeFile(selectorFiles: FileList) {
    var reader = new FileReader();
    reader.onload = function () {
      var arrayBuffer = reader.result;
      let currentArray = arrayBuffer === null ? JSON.parse("null") : arrayBuffer;
      var fileSize = readableBytes(selectorFiles[0].size);
      if (fileSize >= '50 MB')
        alert("File size  can not be bigger than 50 MB")
      else {
        data.delete("file");
        data.append("file", selectorFiles[0], selectorFiles[0].name);
        setFile({ fileData: currentArray, fileName: selectorFiles[0].name, fileSize: readableBytes(selectorFiles[0].size), selectedFile: null });
        setDropzoneStatus("edit");
      }
    };
    reader.readAsArrayBuffer(selectorFiles[0]);
  }
  function CreateTimeCapsule() {
    setCompleted(true);
  }

  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );
  document.addEventListener('DOMContentLoaded', (event) => {
    (document.getElementById("standard-full-width") as HTMLInputElement).style.color = 'black';
    (document.getElementById("standard-full-width2") as HTMLInputElement).style.color = 'black';


  });

  const ValidationTextField = withStyles({
    root: {
      '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important', // override inline-style
      },
      color: 'red',
    },
  })(TextField);
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      margin: {
        margin: theme.spacing(1),
      },
    }),
  );
  const classes = useStyles();

  return (
    <div className="App" style={{ paddingTop: '2%' }}>
      <div style={{ display: completed === false ? 'block' : 'none' }}>
        <div className="time_capsule_block" >
          <Segment placeholder color="black"  >
            <div style={{ display: state.checkedB === false ? 'block' : 'none' }}>
              <div className="avatar-image" style={{ float: "left" }}>
                <Image src={avatarTest} size='small' circular />
              </div>
              <div style={{ float: "right", marginRight: "1%" }}>
                <strong>Be Anonym:<Switch
                  checked={state.checkedB}
                  onChange={handleChange('checkedB')}
                  value="checkedB"
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                /></strong>

              </div>
              <div className="label-text" >
                <div className="label-text-publisher" >
                  <TextField
                    required
                    id="standard-name"
                    label="Publisher"
                    defaultValue="John wick"
                    onChange={handleChangePublisher('name')}
                    margin="normal"
                  />
                </div>
                <form className={classes.root} noValidate>
                  <ValidationTextField
                    className={classes.margin}
                    label="CSS validation style"
                    required
                    variant="outlined"
                    defaultValue="Success"
                    id="validation-outlined-input"
                  /></form><br />
                <div className="label-text-email">
                  <TextField
                    id="standard-name"
                    label="Information Email"
                    defaultValue="john@wick.com"
                    onChange={handleChangePublisherEmail('name')}
                    margin="normal"
                  />
                </div><br />
              </div>
              <div className="pickers-label">
                <TextField
                  disabled
                  id="standard-full-width"
                  defaultValue="Date of opening:"
                  margin="normal"
                  inputProps={{ 'aria-label': 'bare' }}
                />
              </div>
              <div className="pickers">
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  showTimeSelect
                  locale="tr"
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  todayButton="Today"
                  dateFormat="d MMMM yyyy h:mm "
                />
              </div>
            </div>
            <div style={{ display: state.checkedB === true ? 'block' : 'none' }}>
              <div className="avatar-image" style={{ float: "left" }}>
                <Image src={avatarAnonym} size='small' circular />
              </div>
              <div style={{ float: "left", marginTop: "3%", marginLeft: "2%", textAlign: "left" }}>
                <code><p style={{ marginTop: "2%" }}><strong>Publisher: </strong>Anonymous User</p></code>
                <code><p className="email-anonym" style={{ marginTop: "5%" }}><strong>Information Email: </strong>Anonymous Email</p></code>
              </div>
              <div className="anonym-switch" style={{ float: "right", marginRight: "1%" }}>
                <strong>Anonym:<Switch
                  checked={state.checkedB}
                  onChange={handleChange('checkedB')}
                  value="checkedB"
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                /></strong>
              </div>
              <div className="pickers-label-anonym">
                <TextField
                  disabled
                  id="standard-full-width2"
                  defaultValue="Date of opening:"
                  margin="normal"
                  inputProps={{ 'aria-label': 'bare' }}
                />
              </div>
              <div className="pickers-anonym">
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  showTimeSelect
                  locale="tr"
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  todayButton="Today"
                  dateFormat="d MMMM yyyy h:mm "
                />
              </div>
            </div>
            <div className="line_crate" />
            <div style={{ display: dropzoneStatus === "upload" ? "block" : "none" }}>
              <input className="file_upload_zone" type="file" onChange={(e: any) => handleChangeFile(e.target.files)} />
            </div>
            <div style={{ display: dropzoneStatus === "edit" ? "block" : "none" }}>
              <input style={{ float: "left", cursor: "pointer", width: "50%" }} className="file_upload_zone" type="file" onChange={(e: any) => handleChangeFile(e.target.files)} />
              <div style={{ float: "left", textAlign: "left", width: "50%", marginTop: "4%" }}>
                <code><p><strong>File Name: </strong>{file.fileName}</p></code><br />
                <code><p><strong>File Size: </strong>{file.fileSize}</p></code>
              </div>
            </div>
          </Segment>
        </div>

        <button style={{ marginTop: '1%' }} className="ui fluid secondary  button" onClick={CreateTimeCapsule}>Create Time Capsule</button>
      </div>
      <div style={{ display: completed === true ? 'block' : 'none' }}>
        <Segment placeholder color="black" style={{ width: '75%', marginLeft: '10%', marginTop: '2%' }} >
          <Progress percent={percent} progress indicating />
          <div style={{}}>
            <Message info header='Please wait ultil file upload' />
          </div>
        </Segment>
      </div>

    </div>
  );
};

export default App;
