import React, { useState } from "react";
import "./App-list.css";
import { Segment, Image } from "semantic-ui-react";
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
  document.addEventListener('DOMContentLoaded', (event) => {
    dates.setDate(dates.getDate() + 10);
    startCountdown();
  });
  function startCountdown() {
    var interval = setInterval(() => {
      calculateCountdown(dates);
      if (countDown.second < 0) {

        // The code here will run when
        // the timer has reached zero.

        clearInterval(interval);
        console.log('Ding!');
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
  return (
    <div className="App" style={{ paddingTop: '2%' }}>
      <div>
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
                  <code><p ><strong>Publisher: </strong>Anonymous User</p></code>
                  <code><p className="email-anonym" style={{ marginTop: "7%" }}><strong>File Name: </strong>Anonymous Email</p></code>
                  <code><p className="email-anonym" style={{ marginTop: "7%" }}><strong>File Hash: </strong>Anonymous Email</p></code>
                </div>
                <div className="Countdown">
                  <span className="Countdown-col">
                    <span className="Countdown-col-element">
                      <strong>{addLeadingZeros(countDown.days)}</strong>
                      <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
                    </span>
                  </span>

                  <span className="Countdown-col">
                    <span className="Countdown-col-element">
                      <strong>{addLeadingZeros(countDown.hours)}</strong>
                      <span>Hours</span>
                    </span>
                  </span>


                  <span className="Countdown-col">
                    <span className="Countdown-col-element">
                      <strong>{addLeadingZeros(countDown.minute)}</strong>
                      <span>Min</span>
                    </span>
                  </span>

                  <span className="Countdown-col">
                    <span className="Countdown-col-element">
                      <strong>{addLeadingZeros(countDown.second)}</strong>
                      <span>Sec</span>
                    </span>
                  </span>
                </div>
              </Segment>
            </Segment.Group>
          </Segment>
        </div>
      </div>
    </div>
  );
};

export default AppList;
