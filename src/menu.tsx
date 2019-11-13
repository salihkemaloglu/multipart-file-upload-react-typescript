import * as React from 'react';
import Done from '@material-ui/icons/Done';
import Cross from '@material-ui/icons/WarningOutlined';
import { Label, Form, Message, Button, Progress, Input, Visibility, Header, Grid, List, Image, Container, Menu, Responsive, Segment, Sidebar, Icon, Divider } from 'semantic-ui-react';
import './menu.css';
import { useState } from 'react';
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
    const [activeItem, setActiveItem] = useState("home")
    const [loginForm, setLoginForm] = useState("active")
    const [minHeight, setminHeight] = useState(35)
    const [backgroundColor, setbackgroundColor] = useState("black")
    const [fixed, setFixed] = useState(false)
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
    function LogOut() {

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

    function scrollToElement(e: any) {
        var text = e.currentTarget.childNodes[0].data
        if (text == "Home") {
            setActiveItem("home")
        }
        else if (text == "About") {
            setActiveItem("about")
        }
        else if (text == "Contact") {
            setActiveItem("contact")
        }
        else if (text == "Donation") {
            setActiveItem("donation")
        }
    }
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
    function showFixedMenu() {
        setFixed(true);
    }
    function hideFixedMenu() {
        setFixed(false);
    }

    window.addEventListener('scroll', (e: any) => {

        if (e.currentTarget.scrollX == 0 && e.currentTarget.scrollY <= window.innerHeight - 70) {
            setActiveItem("home")
            setFixed(false)
        }
        else if (e.currentTarget.scrollY > window.innerHeight - 70 && e.currentTarget.scrollY <= 2 * window.innerHeight - 70) {
            setActiveItem("about")
            setFixed(true)
        }
        else if (e.currentTarget.scrollY > 2 * window.innerHeight - 70 && e.currentTarget.scrollY <= 3 * window.innerHeight - 70) {
            setActiveItem("contact")
            setFixed(true)
        }
        else if (e.currentTarget.scrollY > 3 * window.innerHeight - 70 && e.currentTarget.scrollY <= 4 * window.innerHeight - 70) {
            setActiveItem("donation")
            setFixed(true)
        }

    })
    const HomepageHeading = () => {
        return (
            < Container text
                /*************** HomepageHeading ******************/
                style={{ width: '100%' }
                }>
                <Header
                    as='h1'
                    content='Imagine-a-Company'
                    inverted
                    style={{
                        fontSize: '2em',
                        fontWeight: 'normal',
                        marginBottom: 0,
                        marginTop: '1.5em',
                    }}
                />
                <Header
                    as='h2'
                    content='Do whatever you want when you want to.'
                    inverted
                    style={{
                        fontSize: '1.5em',
                        fontWeight: 'normal',
                        marginTop: '0.5em',
                    }}
                />
                <Button primary size='huge'>
                    Get Started
                </Button>
            </Container >

        )
    }
    const HomepageSections = () => {
        return (
            <Container
                style={{ backgroundColor: 'white', width: '100%' }}>
                {/*************** children ******************/}
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <Grid container stackable verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    We Help Companies and Companions
</Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    We can give your company superpowers to do things that they never thought possible.
                                    Let us delight your customers and empower your needs... through pure data analytics.
</p>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    We Make Bananas That Can Dance
</Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                                    bioengineered.
</p>
                            </Grid.Column>
                            <Grid.Column floated='right' width={6}>
                                <img src={logo} className="authentication-app-logo" alt="logo" />

                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <Button size='huge'>Check Them Out</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment style={{ padding: '0em' }} vertical>
                    <Grid celled='internally' columns='equal' stackable>
                        <Grid.Row textAlign='center'>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    "What a Company"
</Header>
                                <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
                            </Grid.Column>
                            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    "I shouldn't have gone with their competitor."
</Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    <img src={logo} className="authentication-app-logo" alt="logo" />

                                    <b>Nan</b> Chief Fun Officer Acme Toys
</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <Container text>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            Breaking The Grid, Grabs Your Attention
</Header>
                        <p style={{ fontSize: '1.33em' }}>
                            Instead of focusing on content creation and hard work, we have learned how to master the
                            art of doing nothing by providing massive amounts of whitespace and generic content that
                            can seem massive, monolithic and worth your attention.
</p>
                        <Button as='a' size='large'>
                            Read More
</Button>
                        <Divider
                            as='h4'
                            className='header'
                            horizontal
                            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                        >
                            <a href='#'>Case Studies</a>
                        </Divider>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            Did We Tell You About Our Bananas?
</Header>
                        <p style={{ fontSize: '1.33em' }}>
                            Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
                            it's really true. It took years of gene splicing and combinatory DNA research, but our
                            bananas can really dance.
</p>
                        <Button as='a' size='large'>
                            I'm Still Quite Interested
</Button>
                    </Container>
                </Segment>
                <Segment inverted vertical style={{ padding: '5em 0em' }}>
                    <Container>
                        <Grid divided inverted stackable>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Header inverted as='h4' content='About' />
                                    <List link inverted>
                                        <List.Item as='a'>Sitemap</List.Item>
                                        <List.Item as='a'>Contact Us</List.Item>
                                        <List.Item as='a'>Religious Ceremonies</List.Item>
                                        <List.Item as='a'>Gazebo Plans</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Header inverted as='h4' content='Services' />
                                    <List link inverted>
                                        <List.Item as='a'>Banana Pre-Order</List.Item>
                                        <List.Item as='a'>DNA FAQ</List.Item>
                                        <List.Item as='a'>How To Access</List.Item>
                                        <List.Item as='a'>Favorite X-Men</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={7}>
                                    <Header as='h4' inverted>
                                        Footer Header
</Header>
                                    <p>
                                        Extra space for a call to action inside the footer that could help re-engage users.
</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
                {/*************** /children ******************/}
            </Container>);
    }

    return (
        <div className="wrap">
            <Responsive getWidth={() => (getWidth ? window.innerWidth : 0)} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={showFixedMenu}
                    onBottomPassedReverse={hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 700, padding: '1em 0em' }}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : undefined}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Menu.Item as='div'>
                                <a href="/" className="logo_link">
                                    <img src={logo} className="authentication-app-logo" alt="logo" />
                                    <img src={logoGignox} className="authentication_logo_word" alt="logo" />
                                </a>
                            </Menu.Item>
                            <Container>
                                <Menu.Item active={activeItem === 'home'} onClick={(e) => scrollToElement(e)} >Home</Menu.Item>
                                <Menu.Item active={activeItem === 'about'} onClick={(e) => scrollToElement(e)} >About</Menu.Item>
                                <Menu.Item active={activeItem === 'contact'} onClick={(e) => scrollToElement(e)} >Contact</Menu.Item>
                                <Menu.Item active={activeItem === 'donation'} onClick={(e) => scrollToElement(e)} >Donation</Menu.Item>
                                <Menu.Menu position='right'>
                                    <Menu.Item>
                                        <Input icon='search' placeholder='Search...' />
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Button as='a' inverted={!fixed}>Log in</Button>
                                        <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                                    </Menu.Item>
                                </Menu.Menu>
                            </Container>
                        </Menu>
                        <HomepageHeading />

                    </Segment>
                    <HomepageSections />
                </Visibility>
            </Responsive>
            <Responsive
                as={Sidebar.Pushable}
                getWidth={() => (getWidth ? window.innerWidth : 0)}
                maxWidth={Responsive.onlyTablet.maxWidth}
                style={{ backgroundColor: 'black', width: '100%' }}>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ backgroundColor: backgroundColor, minHeight: minHeight, padding: '1em 0em', }}
                        vertical>
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
                        <HomepageHeading />
                    </Segment>
                    <HomepageSections />
                </Sidebar.Pusher>
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={() => test(false)}
                    vertical
                    visible={sidebarOpened}
                    style={{ backgroundColor: "black" }}>
                    <a href="/" className="logo_link" style={{ display: 'inherit' }}>
                        <img src={logo} className="authentication-app-logo" alt="logo" />
                        <img src={logoGignox} className="authentication_logo_word" alt="logo" />
                    </a>
                    <Menu.Item as='a' onClick={() => testAuth(true)}>Sign in</Menu.Item>
                    <Menu.Item as='a' onClick={() => testAuth(true)}>Sign Up</Menu.Item>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                </Sidebar>

                {/******* Login screen **********/}
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={() => testAuth(false)}
                    vertical
                    visible={loginScreenOpened}
                    style={{ backgroundColor: 'white', width: '100%' }}>

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
                    style={{ backgroundColor: 'white', width: '100%' }}>
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
            </Responsive>
        </div>
    );
};

export default HomepageLayout;