import React, { useState } from "react";
import "./App-list.css";
import { Segment, Image, Header, Label } from "semantic-ui-react";
var avatarAnonym = require("./user.png");
const AppList: React.FC = () => {
  var dates = new Date();
  const [countDown, setCountDown] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minute: 0,
    second: 0,
  });

  const incomeDates = [] as any;
  document.addEventListener('DOMContentLoaded', (event) => {
    for (let index = 0; index < 100; index++) {
      dates.setDate(dates.getDate() + index);
      incomeDates.push(dates);
    }
    startCountdown();
  });
  function startCountdown() {
    var interval = setInterval(() => {
      incomeDates.forEach((element: any) => {
        calculateCountdown(element);
      });
      if (countDown.second < 0) {
        clearInterval(interval);
      };
    }, 1000);
  };
  function calculateCountdown(endDate: Date) {
    let diff = (Date.parse(new Date(endDate).toString()) - Date.parse(new Date().toString())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      minute: 0,
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
      timeLeft.minute = Math.floor(diff / 60);
      diff -= timeLeft.minute * 60;
    }
    timeLeft.second = diff;

    setCountDown({ years: timeLeft.years, days: timeLeft.days, hours: timeLeft.days, minute: timeLeft.minute, second: timeLeft.second });

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
    for (let index = 0; index < 100; index++) {
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
                  <p ><strong>Publisher: </strong>Anonymous User</p>
                  <p className="email-anonym" style={{ marginTop: "7%" }}><strong>File Name: </strong>Anonymous Email</p>
                  <p className="email-anonym" style={{ marginTop: "7%" }}><strong>File Hash: </strong>043a718774c572bd8a25adbeb1bfcd5c0256ae11cecf9f9c3f925d0e52beaf89</p>
                </div>
                <Label color="black" style={{ float: "right" }}>#{index}</Label>
                <Segment.Group horizontal>
                  <Segment className="square">
                    <Header as='h1'  >
                      {addLeadingZeros(countDown.days)}
                      <Header.Subheader >{countDown.days === 1 ? 'Day' : 'Days'}</Header.Subheader>
                    </Header>
                  </Segment>
                  <Segment className="square">
                    <Header as='h1' >
                      {addLeadingZeros(countDown.hours)}
                      <Header.Subheader>Hours</Header.Subheader>
                    </Header>
                  </Segment>
                  <Segment className="square">
                    <Header as='h1' >
                      {addLeadingZeros(countDown.minute)}
                      <Header.Subheader>Minute</Header.Subheader>
                    </Header>
                  </Segment>
                  <Segment className="square">
                    <Header as='h1' >
                      {addLeadingZeros(countDown.second)}
                      <Header.Subheader>Second</Header.Subheader>
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
