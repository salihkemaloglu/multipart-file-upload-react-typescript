import React, { useCallback, useState, Fragment } from "react";
import "./App.css";
import { Segment, Image, Progress, Message } from "semantic-ui-react";
import { Switch, TextField } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

var avatarTest = require("./avatar3.png");
var avatarAnonym = require("./avatar2.png");
const App: React.FC = () => {
  const [percent, setPercent] = useState(80);
  const [completed, setCompleted] = useState(false);
  const [dropzoneStatus, setDropzoneStatus] = useState("upload");
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
  // data.delete("file");
  // data.append("file", acceptedFiles[0], acceptedFiles[0].name);
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length >= 2) {
      alert("can not upload multiple file ")
    } else {
      var reader = new FileReader();
      reader.onload = function () {
        var arrayBuffer = reader.result;
        let currentArray = arrayBuffer === null ? JSON.parse("null") : arrayBuffer;
        var fileSize = readableBytes(acceptedFiles[0].size);
        if (fileSize >= '50 MB')
          alert("File size  can not be bigger than 50 MB")
        else {
          setFile({ fileData: currentArray, fileName: acceptedFiles[0].name, fileSize: readableBytes(acceptedFiles[0].size), selectedFile: null });
          setDropzoneStatus("edit");
        }
      };
      reader.readAsArrayBuffer(acceptedFiles[0]);
    }
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
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
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  function handleDateChange(date: Date | null) {
    setSelectedDate(date);
  }

  function CreateTimeCapsule() {
    setCompleted(true);
  }
  return (
    <div className="App" style={{ marginLeft: '10%' }}>
      <div style={{ display: completed === false ? 'block' : 'none' }}>
        <Segment placeholder color="black" style={{ width: '75%', marginLeft: '10%', marginTop: '2%' }} >
          <div style={{ display: state.checkedB === false ? 'block' : 'none' }}>
            <div style={{ float: "left" }}>
              <Image src={avatarTest} size='small' circular />
            </div>
            <div style={{ float: "left", marginLeft: "2%", textAlign: "left" }}>
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
               <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          color="black"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          color="black"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
        clearable
          margin="normal"
          id="time-picker"
          label="24 hours"
          ampm={false}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
              <Fragment>
                {/* <DateTimePicker
                  label="DateTimePicker"
                  inputVariant="outlined"
                  value={selectedDate}
                  onChange={handleDateChange}
                />

                <DateTimePicker
                  autoOk
                  ampm={false}
                  disableFuture
                  value={selectedDate}
                  onChange={handleDateChange}
                  label="24h clock"
                />

                <DateTimePicker
                  value={selectedDate}
                  disablePast
                  onChange={handleDateChange}
                  label="With Today Button"
                  showTodayButton
                /> */}
              </Fragment>
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
            <div style={{ float: "left" }}>
              <Image src={avatarAnonym} size='small' circular />
            </div>
            <div style={{ float: "left", marginTop: "3%", marginLeft: "2%", textAlign: "left" }}>
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
          <div className="line_crate" />
          {/* <div {...getRootProps()} style={{ display: dropzoneStatus === "upload" ? "block" : "none", cursor: "pointer" }}>
            <input {...getInputProps()} />
            <h2 className="ui header">
              <i className="large icons">
                <i aria-hidden="true" className="cloud upload icon" />
                <i aria-hidden="true" className="add corner icon" />
              </i>
              Add file
        </h2>
          </div> */}
          <div style={{ display: dropzoneStatus === "upload" ? "block" : "none" }}>
            <input className="file_upload_zone" type="file" onChange={(e: any) => handleChangeFile(e.target.files)} />
          </div>
          <div style={{ display: dropzoneStatus === "edit" ? "block" : "none" }}>
            {/* <div {...getRootProps()} style={{ float: "left", cursor: "pointer", width: "50%" }}>
              <input {...getInputProps()} />
              <h2 className="ui header">
                <i className="large icons">
                  <i aria-hidden="true" className="cloud upload icon" />
                  <i aria-hidden="true" className="add corner icon" />
                </i>
                Edit file
                </h2>
            </div> */}
            <input style={{ float: "left", cursor: "pointer", width: "50%" }} className="file_upload_zone" type="file" onChange={(e: any) => handleChangeFile(e.target.files)} />
            <div style={{ float: "left", textAlign: "left", width: "50%", marginTop: "4%" }}>
              <code><p><strong>File Name: </strong>{file.fileName}</p></code><br />
              <code><p><strong>File Size: </strong>{file.fileSize}</p></code>
            </div>
          </div>
        </Segment>
        <button style={{ width: '75%', marginLeft: '10%' }} className="ui fluid secondary  button" onClick={CreateTimeCapsule}>Send Time Capsule to Future</button>
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