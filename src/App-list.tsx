import React, { useState } from "react";
import "./App-list.css";
import { Segment, Image, Header, Label } from "semantic-ui-react";
import { UserInfo } from "./user";
var avatarAnonym = require("./user.png");
// import { UserInfo } from './user';
const AppList: React.FC = () => {
  var dates = new Date();
  const [publisherInfo, setPublisherInfo] = useState<any>([]);
  var damiData = [] as any;
  function startCountdown() {
    var interval = setInterval(() => {
      console.log("damiData", damiData.length);
      for (var i = 0; i < damiData.length; i++) {
        var remaningTime = calculateCountdown(new Date(damiData[i].FileOpenedDate));
        if (remaningTime.years <= 0 && remaningTime.days <= 0 && remaningTime.hours <= 0 && remaningTime.minutes <= 0) {
          damiData.splice(i, 1);
        } else {
          damiData[i].RemaningDate.splice(0, 1);
          damiData[i].RemaningDate.push(remaningTime);
        }
      }
      setPublisherInfo([]);
      damiData.sort(function(a:any, b:any){return a.UnitAmount - b.UnitAmount}); 
      setPublisherInfo(damiData);
      console.log("damiData after", damiData.length);
      console.log("damiData", damiData);
      if (damiData.length <= 0) {
        clearInterval(interval);
      };
    }, 60000);
  };

  document.addEventListener('DOMContentLoaded', (event) => {
    for (let index = 0; index <= 100; index++) {
      dates.setMinutes(dates.getMinutes() + 1);
      var date = new Date(dates);
      var userInfo = new UserInfo();
      userInfo.Publisher = index + "name";
      userInfo.FileName = index + "fileName";
      userInfo.FileHash = "043a718774c572bd8a25adbeb1bfcd5c0256ae11cecf9f9c3f925d0e52beaf89";
      userInfo.FileOpenedDate = date.toString();
      userInfo.UnitAmount = Math.floor(Math.random() * 101) + 0.1;
      userInfo.RemaningDate.push(calculateCountdown(dates))
      damiData.push(userInfo);
    }
    damiData.sort(function(a:any, b:any){return a.UnitAmount - b.UnitAmount});
    setPublisherInfo(damiData);
    startCountdown();
  });
  function calculateCountdown(endDate: Date) {

    let diff = (Date.parse(new Date(endDate).toString()) - Date.parse(new Date().toString())) / 1000;
    // clear countdown when date is reached
    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      second: 0,
    };
    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.minutes = Math.floor(diff / 60);
      diff -= timeLeft.minutes * 60;
    }
    return timeLeft;
  }
  function addLeadingZeros(value: any) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }
  const item = [] as any;
  const TimeCapsule = (props: any) => {
    var count = 0;
    console.log("publisherInfo after", publisherInfo.length);
    for (let index = 0; index < publisherInfo.length; index++) {
      console.log("UnitAmount", publisherInfo[index].UnitAmount);
      item.push(
        <div className="time-capsule-block" >
          <Segment placeholder color="green" >
            <Segment.Group horizontal>
              <Segment>
                <div className="avatar-image" style={{ float: "left" }}>
                  <Image src={avatarAnonym} size='small' />
                </div>
              </Segment>
              <Segment style={{ width: "80%" }} stacked>
                <div className="publisher-info-anonym">
                  <p ><strong>Publisher: </strong>{publisherInfo[index].Publisher}</p>
                  <p className="email-anonym" style={{ marginTop: "7%" }}><strong>File Name: </strong>{publisherInfo[index].FileName}</p>
                  <p className="email-anonym" style={{ marginTop: "7%" }}><strong>File Hash: </strong>{publisherInfo[index].FileHash}</p>
                </div>
                <Label color="black" style={{ float: "right" }}>#{++count}</Label>
                <Segment.Group horizontal>
                  <Segment className="square">
                    <Header as='h1'  >
                      {addLeadingZeros(publisherInfo[index].RemaningDate[0].years)}
                      <Header.Subheader >{publisherInfo[index].RemaningDate[0].years === 1 ? 'Year' : 'Years'}</Header.Subheader>
                    </Header>
                  </Segment>
                  <Segment className="square">
                    <Header as='h1'  >
                      {addLeadingZeros(publisherInfo[index].RemaningDate[0].days)}
                      <Header.Subheader >{publisherInfo[index].RemaningDate[0].days === 1 ? 'Day' : 'Days'}</Header.Subheader>
                    </Header>
                  </Segment>
                  <Segment className="square">
                    <Header as='h1' >
                      {addLeadingZeros(publisherInfo[index].RemaningDate[0].hours)}
                      <Header.Subheader>Hours</Header.Subheader>
                    </Header>
                  </Segment>
                  <Segment className="square">
                    <Header as='h1' >
                      {addLeadingZeros(publisherInfo[index].RemaningDate[0].minutes)}
                      <Header.Subheader>Minute</Header.Subheader>
                    </Header>
                  </Segment>
                </Segment.Group>
              </Segment>
            </Segment.Group>
          </Segment>
          <br />
        </div>
      );
    }
    return item;
  }
  return (
    <div className="App" style={{ paddingTop: '2%' }}>
      <TimeCapsule />
    </div>
  );
};

export default AppList;

