import React, { useState } from "react";
import "./App.css";
import { Segment, Image, Progress, Message, Popup, Icon } from "semantic-ui-react";
import { Switch, TextField } from "@material-ui/core";
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CryptoJS from 'crypto-js';
import axios from 'axios'
import { tr } from 'date-fns/esm/locale';
registerLocale("tr", tr);
var avatarTest = require("./user.png");
var avatarAnonym = require("./user.png");
const App: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [disabledStatus, setDisabledStatus] = useState(false);
  const [dropzoneStatus, setDropzoneStatus] = useState("upload");
  const [fileHash, setFileHash] = useState("");
  const [inputPublisher, setInputPublisher] = useState({
    publisher: '',
    validationStatus: false,
    helperText: ""
  });
  const [message, setMessage] = useState({
    messageShow: false,
    messageType: '',
    messageTitle: '',
    messageText: '',
  });
  const [inputEmail, setInputEmail] = useState({
    email: '',
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
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(),
  );
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
    if (event.target.value.length == 0) {
      setInputPublisher({ publisher: "", validationStatus: true, helperText: "Publisher can not be empty" });
    } else {
      setInputPublisher({ publisher: event.target.value, validationStatus: false, helperText: "" });
    }
  };
  const handleChangePublisherEmail = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length == 0) {
      setInputEmail({ email: "", validationStatus: true, helperText: "Information Email can not be empty" });
    } else {
      setInputEmail({ email: event.target.value, validationStatus: false, helperText: "" });
    }
  };
  function handleChangeFile(selectorFiles: FileList) {
    // data.delete("file");
    data.append('email', 'test2@pay-mon.com');
    data.append("file", selectorFiles[0], selectorFiles[0].name);
    var reader = new FileReader();
    reader.onload = function () {
      var arrayBuffer = reader.result;
      let currentArray = arrayBuffer === null ? JSON.parse("null") : arrayBuffer;
      var fileSize = readableBytes(selectorFiles[0].size);
      if (fileSize >= '50 MB')
        alert("File size  can not be bigger than 50 MB")
      else {
        var encrypted = CryptoJS.SHA256(currentArray);
        setFileHash(encrypted.toString());
        setFile({ fileData: currentArray, fileName: selectorFiles[0].name, fileSize: readableBytes(selectorFiles[0].size), selectedFile: null });
        setDropzoneStatus("edit");
      }
    };
    reader.readAsArrayBuffer(selectorFiles[0]);
  }
  async function CreateTimeCapsule() {
    let publisher;
    let email;
    var currentDate = new Date();
    var date = startDate == null ? JSON.parse(JSON.stringify("null")) : startDate;
    publisher = (document.getElementById("publisherInformation") as HTMLInputElement).value;
    email = (document.getElementById("InformationEmail") as HTMLInputElement).value;
    if (state.checkedB === false && (!publisher || !email || !file.fileName)) {
      if (!publisher) {
        setMessage({ messageShow: true, messageTitle: "", messageType: "warning", messageText: "Publisher name can not be empty!" })
      } else if (!email) {
        setMessage({ messageShow: true, messageTitle: "", messageType: "warning", messageText: "Information email can not be empty!" })
      }
    }
    if (date == "null") {
      setMessage({ messageShow: true, messageTitle: "", messageType: "warning", messageText: "Date can not be empty!" })
    } else if (date <= currentDate) {
      setMessage({ messageShow: true, messageTitle: "", messageType: "warning", messageText: "Date can not be smaller than current time!" })
    } else if (file.fileName == "") {
      setMessage({ messageShow: true, messageTitle: "", messageType: "warning", messageText: "File can not be empty,please choose a file!" })
    } else {
      setMessage({ messageShow: true, messageTitle: "Please wait until encription and upload is finish", messageType: "info", messageText: "" })
      setDropzoneStatus("progress")
      setDisabledStatus(true);
      await fileUploadHandler();
    }
  }

  async function fileUploadHandler() {
    let url = 'http://localhost:8900/uploadfile';
    await axios.post(url,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setPercent(percentCompleted);
        }
      }
    ).then(res => {
      console.log(res)
      console.log('SUCCESS!!');
    })
      .catch(err => {
        console.log(err)
        console.log('FAILURE!!');
      });
  }
  return (
    <div className="App" style={{ paddingTop: '2%' }}>
      <div>
        <div className="time_capsule_block" >
          <Segment placeholder color="black"  >
            <div style={{ display: state.checkedB === false ? 'block' : 'none' }}>
              <div className="avatar-image" style={{ float: "left" }}>
                <Image src={avatarTest} size='small' />
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
                    error={inputPublisher.validationStatus}
                    id="publisherInformation"
                    label="Publisher"
                    defaultValue="John wick"
                    onChange={handleChangePublisher('name')}
                    margin="normal"
                    helperText={inputPublisher.helperText}
                  />
                </div><br />
                <div className="label-text-email">
                  <TextField
                    required
                    disabled={disabledStatus}
                    error={inputEmail.validationStatus}
                    id="InformationEmail"
                    label="Information Email"
                    defaultValue="john@wick.com"
                    onChange={handleChangePublisherEmail('name')}
                    margin="normal"
                    helperText={inputEmail.helperText}
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
                  id="datePicker"
                  locale="tr"
                  timeFormat="p"
                  timeIntervals={15}
                  timeCaption="Time"
                  todayButton="Today"
                  dateFormat="d MMMM yyyy p  "
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
                <Image src={avatarAnonym} size='small' />
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
                  id="datePickerAnonym"
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
                  <Message info style={{ display: message.messageShow === true && message.messageType === "info" ? 'block' : 'none' }}>
                    <Message.Header>{message.messageTitle}</Message.Header>
                    <p>{message.messageText}</p>
                  </Message>
                </div>
              </div>
            </div>
          </Segment>
        </div>
        <Message warning className="button" style={{ display: message.messageShow === true && message.messageType === "warning" ? 'block' : 'none' }}>
          <Message.Header>{message.messageTitle}</Message.Header>
          <p>{message.messageText}</p>
        </Message>
        <button style={{ marginTop: '1%' }} className="ui fluid secondary  button" onClick={CreateTimeCapsule} disabled={disabledStatus}>Create Time Capsule</button>
      </div>
    </div>
  );
};

export default App;
