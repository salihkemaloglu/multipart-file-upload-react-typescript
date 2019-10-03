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
const App: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [disabledStatus, setDisabledStatus] = useState(false);
  const [dropzoneStatus, setDropzoneStatus] = useState("upload");
  const [fileHash, setFileHash] = useState("");
  const [publisher, setPublisher] = useState("John Wick");
  const [message, setMessage] = useState({
    messageShow: false,
    messageType: '',
    messageTitle: '',
    messageText: '',
  });
  const [isUserAnonym, setIsUserAnonym] = useState(false);
  const [file, setFile] = useState({
    fileName: '',
    fileSizeType: '',
    fileSize: '',
  });
  const [fileData, setFileData] = useState<string | Blob>();
  const [startDate, setStartDate] = useState<Date>(
    new Date(),
  );
  const [startTime, setStartTime] = useState<Date>(
    new Date(),
  );
  function readableBytes(fileName: string, bytes: number) {
    var i = Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    setFile({
      fileName: fileName, fileSizeType: sizes[i], fileSize: (bytes / Math.pow(1024, i)).toFixed(2)
    })
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
  }
  const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUserAnonym(event.target.checked);
    setPublisher(event.target.checked ? "Anonym Publisher" : "John Wick");
  };
  function handleChangeFile(selectorFiles: FileList) {
    readableBytes(selectorFiles[0].name, selectorFiles[0].size);
    if (selectorFiles[0].size >= 10000000) {
      setMessage({ messageShow: true, messageTitle: "File size  can not be bigger than 10 MB!", messageType: "warning", messageText: "" })
    } else {
      let file = selectorFiles[0] === undefined ? JSON.parse("null") : selectorFiles[0];
      var encrypted = CryptoJS.SHA256(file);
      setFileHash(encrypted.toString());
      setFileData(selectorFiles[0])
      setMessage({ messageShow: false, messageTitle: "", messageType: "", messageText: "" })
      setDropzoneStatus("edit");
    }
  }
  function handleDateChange(param: Date | null) {
    if (param) {
      var inputDate = param == null ? JSON.parse(JSON.stringify("null")) : param;
      setStartDate(inputDate);
      setMessage({ messageShow: false, messageTitle: "", messageType: "", messageText: "" })
    } else {
      setMessage({ messageShow: true, messageTitle: "Date can not be empty!", messageType: "warning", messageText: "" })
    }
  }
  function handleTimeChange(param: Date | null) {
    if (param) {
      var inputDate = param == null ? JSON.parse(JSON.stringify("null")) : param;
      setStartTime(inputDate);
      setMessage({ messageShow: false, messageTitle: "", messageType: "", messageText: "" })
    } else {
      setMessage({ messageShow: true, messageTitle: "Time can not be empty!", messageType: "warning", messageText: "" })
    }
  }
  async function CreateTimeCapsule() {
    var currentDate = new Date();
    var ChosenDate = new Date(startDate);
    ChosenDate.setHours(startTime.getHours());
    ChosenDate.setMinutes(startTime.getMinutes());
    if (ChosenDate <= currentDate) {
      setMessage({ messageShow: true, messageTitle: "Date can not be smaller than current time!", messageType: "warning", messageText: "" })
    } else if (file.fileName == "") {
      setMessage({ messageShow: true, messageTitle: "File can not be empty,please choose a file!", messageType: "warning", messageText: "" })
    } else {
      setMessage({ messageShow: true, messageTitle: "Please wait until encription and upload is finish", messageType: "info", messageText: "" })
      setDropzoneStatus("progress")
      setDisabledStatus(true);
      await fileUploadHandler();
    }
  }

  async function fileUploadHandler() {
    let url = 'http://localhost:8900/uploadfile';
    let data = new FormData();
    let currentFile = fileData === undefined ? JSON.parse("null") : fileData;
    if (currentFile == "null") {
      setMessage({ messageShow: true, messageTitle: "File can not be empty,please choose a file!", messageType: "warning", messageText: "" })
    } else if (parseInt(file.fileSize) >= 10000000) {
      setMessage({ messageShow: true, messageTitle: "File size  can not be bigger than 10 MB!", messageType: "warning", messageText: "" })
    } else {
      data.append("file", currentFile, file.fileName);
      await axios.post(url,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'JWT',
          },
          onUploadProgress: (progressEvent) => {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setPercent(percentCompleted);
          }
        }
      ).then(res => {
        console.log(res)
        console.log('SUCCESS!!');
      }).catch(err => {
        setDropzoneStatus("edit")
        setMessage({ messageShow: true, messageTitle: err.response.data.error, messageType: "warning", messageText: "" })
        console.log('FAILURE!!');
      });
    }

  }
  return (
    <div className="App" style={{ paddingTop: '2%' }}>
      <div>
        <div className="time_capsule_block" >
          <Segment placeholder color="black"  >
            <div>

              <Segment.Group>
                <Segment.Group horizontal>
                  <Segment><p style={{ marginTop: "2%" }}><strong>Publisher: </strong>{publisher}</p></Segment>
                  <Segment>
                    <div className="pickers-label">
                      <strong>File Opening Date: </strong>
                    </div>
                    <DatePicker
                      disabled={disabledStatus}
                      selected={startDate}
                      onChange={date => handleDateChange(date)}
                      id="datePicker"
                      locale="tr"
                      todayButton="Today"
                      dateFormat="d MMMM yyyy"
                    />
                  </Segment>
                  <Segment>
                    <div className="pickers-label">
                      <strong>File Opening Time: </strong>
                    </div>
                    <DatePicker
                      disabled={disabledStatus}
                      selected={startTime}
                      onChange={date => handleTimeChange(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      id="timePicker"
                      locale="tr"
                      timeFormat="p"
                      timeIntervals={1}
                      timeCaption="Time"
                      dateFormat="p"
                    />
                  </Segment>
                </Segment.Group>
                <Segment style={{ display: fileHash !== "" ? 'block' : 'none' }} className="hash-text">
                  <strong>File Hash:</strong> {fileHash}</Segment>
              </Segment.Group>
              <div style={{ float: "right", marginRight: "1%" }}>
                <strong>Be Anonym:<Switch
                  checked={isUserAnonym}
                  disabled={disabledStatus}
                  onChange={handleChange()}
                  value="checkedB"
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                /></strong>
              </div>
            </div>
            <div className="line_crate" />
            <div style={{ display: dropzoneStatus === "upload" ? "block" : "none" }}>
              <input className="file_upload_zone" type="file" onChange={(e: any) => handleChangeFile(e.target.files)} />
            </div>
            <div style={{ display: dropzoneStatus === "edit" ? "block" : "none" }}>
              <input style={{ float: "left", cursor: "pointer", width: "50%" }} className="file_upload_zone" type="file" onChange={(e: any) => handleChangeFile(e.target.files)} />
              <div style={{ float: "left", textAlign: "left", width: "50%", marginTop: "4%" }}>
                <p><strong>File Name: </strong>{file.fileName}</p><br />
                <p><strong>File Size: </strong>{file.fileSize}</p>
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
