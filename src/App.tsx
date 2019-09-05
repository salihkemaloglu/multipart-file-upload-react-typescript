import React, { useState } from "react";
import "./App.css";
import { Segment, Image, Progress, Message, Popup, Icon } from "semantic-ui-react";
import { Switch, TextField } from "@material-ui/core";
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CryptoJS from 'crypto-js';
import { tr } from 'date-fns/esm/locale';
registerLocale("tr", tr);
var avatarTest = require("./avatar3.png");
var avatarAnonym = require("./avatar2.png");
const App: React.FC = () => {
  const [percent, setPercent] = useState(80);
  const [disabledStatus, setDisabledStatus] = useState(false);
  const [dropzoneStatus, setDropzoneStatus] = useState("upload");
  const [fileHash, setFileHash] = useState("");
  const [inputPublisherType, setInputPublisherType] = useState({
    validationStatus: false,
    helperText: ""
  });
  const [inputEmailType, setInputEmailType] = useState({
    validationStatus: false,
    helperText: ""
  });
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
      setInputPublisherType({ validationStatus: true, helperText: "Publisher can not be empty" });
    } else {
      setInputPublisherType({ validationStatus: false, helperText: "" });
    }
  };
  const handleChangePublisherEmail = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    if (event.target.value.length == 0) {
      setInputEmailType({ validationStatus: true, helperText: "Information Email can not be empty" });
    } else {
      setInputEmailType({ validationStatus: false, helperText: "" });
    }
  };
  function handleChangeFile(selectorFiles: FileList) {
    var reader = new FileReader();
    reader.onload = function () {
      var arrayBuffer = reader.result;
      let currentArray = arrayBuffer === null ? JSON.parse("null") : arrayBuffer;
      var encrypted = CryptoJS.SHA256(currentArray);
      setFileHash(encrypted.toString());
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
    setDropzoneStatus("progress")
    setDisabledStatus(true);
  }

  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );
  return (
    <div className="App" style={{ paddingTop: '2%' }}>
      <div>
        <div className="time_capsule_block" >
          <Segment placeholder color="black"  >
            <div style={{ display: state.checkedB === false ? 'block' : 'none' }}>
              <div className="avatar-image" style={{ float: "left" }}>
                <Image src={avatarTest} size='small' circular />
              </div>
              <div style={{ float: "right", marginRight: "1%" }}>
                <strong>Be Anonym:<Switch
                  checked={state.checkedB}
                  disabled={disabledStatus}
                  onChange={handleChange('checkedB')}
                  value="checkedB"
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                /></strong>
              </div>
              <div className="label-text" >
                <div className="label-text-publisher">
                  <TextField
                    required
                    disabled={disabledStatus}
                    error={inputPublisherType.validationStatus}
                    id="standard-name"
                    label="Publisher"
                    defaultValue="John wick"
                    onChange={handleChangePublisher('name')}
                    margin="normal"
                    helperText={inputPublisherType.helperText}
                  />
                </div><br />
                <div className="label-text-email">
                  <TextField
                    required
                    disabled={disabledStatus}
                    error={inputEmailType.validationStatus}
                    id="standard-name"
                    label="Information Email"
                    defaultValue="john@wick.com"
                    onChange={handleChangePublisherEmail('name')}
                    margin="normal"
                    helperText={inputEmailType.helperText}
                  />
                </div><br />
              </div>
              <div className="pickers-label">
                <code><strong>Date: </strong></code>
              </div>
              <div className="pickers">
                <DatePicker
                  disabled={disabledStatus}
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
              <div className="tooltip">
                <Popup
                  trigger={<Icon circular name='help' />}
                  content="Date of opening to capsule."
                  basic
                />
              </div>
              <div className="file-label" style={{ display: fileHash !== "" ? 'block' : 'none' }}>
                <code><strong>File Hash: </strong></code>
              </div>
              <p className="hash-text">{fileHash}</p>
            </div>
            <div style={{ display: state.checkedB === true ? 'block' : 'none' }}>
              <div className="avatar-image" style={{ float: "left" }}>
                <Image src={avatarAnonym} size='small' circular />
              </div>
              <div className="publisher-info-anonym">
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
                <code><strong>Date: </strong></code>
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
              <div className="tooltip-anonym">
                <Popup
                  trigger={<Icon circular name='help' />}
                  content="Date of opening to capsule."
                  basic
                />
              </div>
              <div className="file-label-anonym" style={{ display: fileHash !== "" ? 'block' : 'none' }}>
                <code><strong>File Hash: </strong></code>
              </div>
              <p className="hash-text-anonym">{fileHash}</p>
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
            <div style={{ display: dropzoneStatus === "progress" ? "block" : "none" }}>
              <div className="progress">
                <Progress percent={percent} progress indicating />
                <div className="progress-message">
                  <Message info header='Please wait ultil file upload' />
                </div>
              </div>
            </div>
          </Segment>
        </div>
        <button style={{ marginTop: '1%' }} className="ui fluid secondary  button" onClick={CreateTimeCapsule} disabled={disabledStatus}>Create Time Capsule</button>
      </div>
    </div>
  );
};

export default App;
