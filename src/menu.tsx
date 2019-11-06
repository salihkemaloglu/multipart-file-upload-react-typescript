import * as React from 'react';
import Done from '@material-ui/icons/Done';
import Cross from '@material-ui/icons/WarningOutlined';
import { Dropdown, Flag, Label, Form, Message, Button, Progress } from 'semantic-ui-react';
import './menu.css';
import { useState } from 'react';
import { Container, Divider, Grid, Header, Image, List, Menu, Responsive, Segment, Sidebar, Icon } from 'semantic-ui-react'
var logo = require('./unit.png');
var logoGignox = require('./unit.png');
const HomepageLayout: React.FC = () => {
    const [loader, setLoader] = useState("active");
    const [fade, setFade] = useState("signup");
    const [loginMessageType, setloginMessageType] = useState("info");
    const [loginHeaderNotify, setloginHeaderNotify] = useState("");
    const [loginMessageNotify, setloginMessageNotify] = useState("");
    const [signupMessageType, setsignupMessageType] = useState("info");
    const [signupHeaderNotify, setsignupHeaderNotify] = useState("");
    const [signupMessageNotify, setsignupMessageNotify] = useState("");
    const [passwordStrenghtWidth, setpasswordStrenghtWidth] = useState("");
    const [passwordStrenghtColor, setpasswordStrenghtColor] = useState("off");
    const [sidebarOpened, setsidebarOpened] = useState(false)
    const [loginScreenOpened, setloginScreenOpened] = useState(false)
    const [signupScreenOpened, setsignupScreenOpened] = useState(false)
    const [activeMenu, setActiveMenu] = useState("home")
    const [loginForm, setLoginForm] = useState("active")
    const [minHeight, setminHeight] = useState(35)
    const [backgroundColor, setbackgroundColor] = useState("black")
    let loginAttemptCount = 0;
    function sidebarScreenBack() {
        setloginScreenOpened(false)
        setsignupScreenOpened(false)
        setsidebarOpened(true)
    }
    function orSignin() {
        setloginScreenOpened(true)
        setsignupScreenOpened(false)
    }
    document.addEventListener('DOMContentLoaded', (event) => {
        const windowsWidth = Responsive.onlyTablet.minWidth
        let authenticationType = sessionStorage.getItem("authenticationType") == null ? JSON.parse(JSON.stringify("null")) : sessionStorage.getItem("authenticationType");
        var count = localStorage.getItem("loginAttemptCount") == null ? JSON.parse(JSON.stringify("0")) : localStorage.getItem("loginAttemptCount");
        loginAttemptCount = parseInt(count, 10);
        if (loginAttemptCount > 20) {
            setloginMessageType("warning");
            setLoginForm("active");
        }

        if (authenticationType != "null") {
            if (windowsWidth != undefined && windowsWidth < 991) {
                if (authenticationType == "signin") {
                    setsidebarOpened(true)
                    setloginScreenOpened(true)
                } else if (authenticationType == "signup") {
                    setsidebarOpened(true)
                    setsignupScreenOpened(true)
                }
                sessionStorage.removeItem("authenticationType");
            }
            else {
                if (authenticationType == "signin") {
                    setFade("signin");
                } else if (authenticationType == "signup") {
                    setFade("signup");
                }
                sessionStorage.removeItem("authenticationType");
            }

        }
    })

    function getWidth() {
        const isSSR = typeof window === 'undefined'

        return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
    }
    function Login() {

    }

    function Signup() {
        setLoader("loading");
        setsignupHeaderNotify("");

    }
    function handleUsernameChangeForRegister(e: any) {

    }

    function handleEmailChangeForRegister(e: any) {

    }
    function handlePasswordChange(e: any) {
        if (!e.target.value) {
            setpasswordStrenghtColor("");
        }
    }
    function handleOnKeyPress(e: any) {
        if (e.key === 'Enter') {
            if (fade == "signin") {
                Login();
            } else if (fade == "signup") {
                Signup();
            }
        }
    }

    var temp = true
    function scrollToElement(e: any) {
        var text = e.currentTarget.childNodes[0].data
        var topBar = document.getElementById("topBar") as HTMLElement
        if (text == "Home") {
            window.scrollTo(0, 0)
            setActiveMenu("home")
            topBar.style.width = '65%'
            temp = false
        }
        else if (text == "About") {
            window.scrollTo(0, window.innerHeight)
            setActiveMenu("about")
            topBar.style.width = '100%'
            temp = false
        }
        else if (text == "Contact") {
            window.scrollTo(0, 2 * window.innerHeight)
            setActiveMenu("contact")
            topBar.style.width = '100%'
            temp = false
        }
        else if (text == "Donation") {
            window.scrollTo(0, 3 * window.innerHeight)
            setActiveMenu("donation")
            topBar.style.width = '100%'
            temp = false
        }
    }

    window.addEventListener('scroll', (e: any) => {
        if (temp == true) {
            var topBar = document.getElementById("topBar") as HTMLElement
            if (e.currentTarget.scrollX == 0 && e.currentTarget.scrollY <= window.innerHeight - 70) {
                setActiveMenu("home")
                topBar.style.width = '65%'
            }
            else if (e.currentTarget.scrollY > window.innerHeight - 70 && e.currentTarget.scrollY <= 2 * window.innerHeight - 70) {
                setActiveMenu("about")
                topBar.style.width = '100%'
            }
            else if (e.currentTarget.scrollY > 2 * window.innerHeight - 70 && e.currentTarget.scrollY <= 3 * window.innerHeight - 70) {
                setActiveMenu("contact")
                topBar.style.width = '100%'
            }
            else if (e.currentTarget.scrollY > 3 * window.innerHeight - 70 && e.currentTarget.scrollY <= 4 * window.innerHeight - 70) {
                setActiveMenu("donation")
                topBar.style.width = '100%'
            }
        }
        else {
            temp = false
        }
    })

    function test(type: boolean) {
        if (type) {
            setsidebarOpened(type)
            setminHeight(250)
            setbackgroundColor("grey")
        } else {
            setsidebarOpened(type)
            setbackgroundColor("black")
            setminHeight(35)
        }
    }
    function testAuth(type: boolean) {
        if (type) {
            setloginScreenOpened(type)
            setminHeight(450)
        } else {
            setminHeight(250)
            setbackgroundColor("grey")
            setloginScreenOpened(type)
        }
    }
    return (
        <div className="wrap">
            <section className="navSection Logos" id="topBar" style={{ backgroundColor: 'black', width: '100%', position: 'fixed', zIndex: 1000 }}>

                <Segment
                    textAlign='center'
                    vertical
                    style={{ padding: '0' }}
                >
                    <Menu size='small' inverted borderless>
                        <Menu.Item as='div'>
                            <a href="/" className="logo_link">
                                <img src={logo} className="authentication-app-logo" alt="logo" />
                                <img src={logoGignox} className="authentication_logo_word" alt="logo" />
                            </a>
                        </Menu.Item>
                        <Menu.Item as='div' borderless style={{ left: '50px' }}>
                            <Menu.Item as='a' className={activeMenu == "home" ? "activeMenu" : ""} onClick={(e) => scrollToElement(e)} style={{ color: 'white' }}>Home</Menu.Item>
                            <Menu.Item as='a' className={activeMenu == "about" ? "activeMenu" : ""} onClick={(e) => scrollToElement(e)} style={{ color: 'white' }}>About</Menu.Item>
                            <Menu.Item as='a' className={activeMenu == "contact" ? "activeMenu" : ""} onClick={(e) => scrollToElement(e)} style={{ color: 'white' }}>Contact</Menu.Item>
                            <Menu.Item as='a' className={activeMenu == "donation" ? "activeMenu" : ""} onClick={(e) => scrollToElement(e)} style={{ color: 'white' }}>Donation</Menu.Item>
                        </Menu.Item>
                    </Menu>
                </Segment>

            </section>
            <Responsive
                as={Sidebar.Pushable}
                getWidth={() => (getWidth ? window.innerWidth : 0)}
                maxWidth={Responsive.onlyTablet.maxWidth}
                style={{ backgroundColor: 'black', width: '100%' }}
            >
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={() => test(false)}
                    vertical
                    visible={sidebarOpened}
                    style={{ backgroundColor: "black"}}
                >
                    <a href="/" className="logo_link" style={{ display: 'inherit' }}>
                        <img src={logo} className="authentication-app-logo" alt="logo" />
                        <img src={logoGignox} className="authentication_logo_word" alt="logo" />
                    </a>
                    <Menu.Item as='a' onClick={() => testAuth(true)}>Sign in</Menu.Item>
                    <Menu.Item as='a' onClick={() => testAuth(true)}>Sign Up</Menu.Item>
                </Sidebar>


                {/******* Login screen **********/}
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={() => testAuth(false)}
                    vertical

                    visible={loginScreenOpened}
                    style={{ backgroundColor: 'white', width: '100%' }}
                >

                    <Menu.Item as='a' style={{ marginBottom: '10px', paddingBottom: '15px', backgroundColor: '#2B2F43', minHeight: '50px' }} onClick={sidebarScreenBack}><Icon name='chevron circle left' style={{ color: 'white', float: 'left', fontSize: '25px' }} /></Menu.Item>
                    <Menu.Item as='a'>
                        <div className="Login" style={{ lineHeight: '2', padding: '0' }}>
                            <div style={{ display: loginForm === "passive" ? 'block' : 'none' }}>
                                <Message warning style={{ display: loginMessageType === "warning" ? 'block' : 'none' }}>
                                    <Message.Header>{loginHeaderNotify}</Message.Header>
                                    <p>{loginMessageNotify}</p>
                                </Message>
                            </div>
                            <form className="loginForm" style={{ display: loginForm === "active" ? 'block' : 'none' }}>
                                <Message color='red' style={{ display: loginMessageType === "error" ? 'block' : 'none' }}>
                                    <Message.Header>{loginHeaderNotify}</Message.Header>
                                    <p>{loginMessageNotify}</p>
                                </Message>
                                <Message warning style={{ display: loginMessageType === "warning" ? 'block' : 'none' }}>
                                    <Message.Header>{loginHeaderNotify}</Message.Header>
                                    <p>{loginMessageNotify}</p>
                                </Message>
                                <label style={{ color: 'black' }}>"authentication_page_or")} <a className="signup-title" onClick={() => setsignupScreenOpened(true)} style={{ fontSize: '15px' }}>"authentication_page_create_an_account")}</a></label>
                                <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                                    <label style={{ color: 'black' }}>"authentication_page_username_or_email")}</label>
                                    <input className="input_control" autoFocus id="usernameLoginMob" />
                                </div>
                                <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                                    <label style={{ color: 'black' }}>"authentication_page_password")}</label>
                                    <input className="input_control" type="password" id="passwordLoginMob" />
                                </div>
                                <Button type="button" fluid size='large' style={{ display: loader === "active" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} onClick={Login} >
                                    "authentication_page_sign_in")}
                </Button>
                                <Button loading fluid disabled style={{ display: loader === "loading" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} color='teal'>
                                    Loading
                </Button>
                                <div className="login-need-help"><a href="password_reset" className="forgot-password-link">
                                    "authentication_page_forgot_password")}</a></div>
                            </form>
                            <div style={{ display: loginForm === "passive" ? 'block' : 'none' }} className="login-need-help"><a href="password_reset" className="forgot-password-link">"authentication_page_forgot_password")}</a></div>

                        </div>
                    </Menu.Item>
                </Sidebar>

                {/******* Sign up screen **********/}
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={() => testAuth(false)}
                    vertical
                    visible={signupScreenOpened}
                    style={{ backgroundColor: 'white', width: '100%' }}
                >
                    <Menu.Item as='a' style={{ marginBottom: '10px', paddingBottom: '15px', backgroundColor: '#2B2F43', minHeight: '50px' }} onClick={sidebarScreenBack}><Icon name='chevron circle left' style={{ color: 'white', float: 'left', fontSize: '25px' }} /></Menu.Item>

                    <Menu.Item as='a'>
                        <div className="Signup" style={{ lineHeight: '2' }}>
                            <form className="signupForm">
                                <Message color='red' style={{ display: signupMessageType === "error" ? 'block' : 'none' }}>
                                    <Message.Header>{signupHeaderNotify}</Message.Header>
                                    <p>{signupMessageNotify}</p>
                                </Message>
                                <Message warning style={{ display: signupMessageType === "warning" ? 'block' : 'none' }}>
                                    <Message.Header>{signupHeaderNotify}</Message.Header>
                                    <p>{signupMessageNotify}</p>
                                </Message>
                                <label style={{ color: 'black' }}>"authentication_page_or")} <a className="signin-title" onClick={orSignin} style={{ fontSize: '15px' }}>"authentication_page_goto_sign_in")}</a></label>

                                <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                                    <label id="usernameLabelMob" style={{ width: '100%', color: 'black' }}>"authentication_page_username")}</label>

                                    <Form.Field>
                                        <input autoComplete="new-username" className="input_control" autoFocus type="text" style={{ width: '100%', float: 'left' }} id="usernameRegisterMob" onChange={handleUsernameChangeForRegister} onKeyPress={handleOnKeyPress} />
                                        <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="userExistDoneMob"><Done style={{ color: 'green', fontSize: '20px' }} /></span>
                                        <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="userExistCrossMob"><Cross style={{ color: 'red', fontSize: '20px' }} /></span>
                                        <Label id="validationUsernameMob" basic color='red' pointing style={{ display: 'none' }} />
                                    </Form.Field>
                                </div>

                                <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                                    <label id="emailLabelMob" style={{ width: '100%', color: 'black' }}>Email</label>
                                    <Form.Field>
                                        <input autoComplete="new-email" className="input_control" placeholder="Email" autoFocus type="email" style={{ width: '100%', float: 'left' }} onChange={handleEmailChangeForRegister} id="emailRegisterMob" />
                                        <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="emailExistDoneMob"><Done style={{ color: 'green', fontSize: '20px' }} /></span>
                                        <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="emailExistCrossMob"><Cross style={{ color: 'red', fontSize: '20px' }} /></span>
                                        <Label id="validationEmailMob" basic color='red' pointing style={{ display: 'none' }} />
                                    </Form.Field>
                                </div>

                                <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                                    <label style={{ width: '100%', color: 'black' }}>"authentication_page_password")}</label>
                                    <input autoComplete="new-password" className="input_control" type="password" onChange={handlePasswordChange} style={{ width: '100%', float: 'left' }} id="passwordRegisterMob" />
                                </div>
                                <div>
                                    <div style={{ display: passwordStrenghtColor === "red" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='red' size='tiny' /></div>
                                    <div style={{ display: passwordStrenghtColor === "orange" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='orange' size='tiny' /></div>
                                    <div style={{ display: passwordStrenghtColor === "yellow" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='yellow' size='tiny' /></div>
                                    <div style={{ display: passwordStrenghtColor === "olive" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='olive' size='tiny' /></div>
                                    <div style={{ display: passwordStrenghtColor === "green" ? 'block' : 'none', width: passwordStrenghtWidth }}><Progress percent={100} color='green' size='tiny' /></div>
                                </div>
                                <Button type="button" fluid size='large' style={{ display: loader === "active" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} onClick={Signup} >
                                    "authentication_page_sign_up")}
                </Button>
                                <Button loading fluid disabled style={{ display: loader === "loading" ? 'block' : 'none', backgroundColor: 'rgb(23, 162, 184)', color: 'white' }} color='teal'>
                                    Loading
                </Button>
                            </form>
                        </div>
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{backgroundColor: backgroundColor, minHeight: minHeight, padding: '1em 0em' }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size='large'>
                                <Menu.Item style={{ marginLeft: '0', width: '240px' }}>
                                    <a href="/" className="logo_link" style={{ display: 'inherit' }}>
                                        <img src={logo} className="authentication-app-logo" alt="logo" />
                                        <img src={logoGignox} className="authentication_logo_word" alt="logo" style={{ height: '30px', marginTop: '5px' }} />
                                    </a>
                                </Menu.Item>
                                <Menu.Item onClick={() => test(true)} style={{ marginBottom: '10px', fontSize: '23px', marginLeft: 'auto' }}>
                                    <Icon name='sidebar' />
                                </Menu.Item>
                            </Menu>
                        </Container>
                    </Segment>




                </Sidebar.Pusher>
            </Responsive>
        </div>
    );
};

export default HomepageLayout;