import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Container, Nav, Button, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { React, Component } from 'react';
import { getDiscordAvatar, getMinecraftDetails, getUserDetails, isDev, isUserAdmin } from '../../util/utils';
import { Discord } from 'react-bootstrap-icons';


const whiteTextStyle = {
    textDecoration: "none",
    color: 'white'
};

const blackTextStyle = {
    textDecoration: "none",
    color: 'black'
};




export default class TopNavigation extends Component {

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { user: null };
    }

    handleLoginClick() {
        window.location.href = (isDev() ? "http://localhost:3001" : "https://mc-be.craig.software") + '/auth/discord'
    }

    handleLogoutClick() {
        window.location.href = (isDev() ? "http://localhost:3001" : "https://mc-be.craig.software") + '/auth/logout'
    }

    componentDidMount() {
        getUserDetails().then(data => {
            this.setState({ user: data })
        }).catch((err) => {
            console.log(err)
        })

        const queryParams = new URLSearchParams(window.location.search);
        var code = queryParams.get("code")
        if (code != null) {
            getMinecraftDetails((isDev() ? "http://localhost:3001/auth/minecraft" : "https://mc-be.craig.software/auth/minecraft"), code).then(res => console.log(res));
            this.setState({ isLoaded: true });
        }


    }


    render() {
        const userData = this.state.user;
        let button = userData === null ? <Button onClick={this.handleLoginClick}> <h4><Discord/></h4> Login</Button> : <Button onClick={this.handleLogoutClick}>Logout</Button>;


        return (

            <><Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">



                <Container>
                    <Navbar.Brand href="#/">Craig</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#/">Home</Nav.Link>
                            <Nav.Link href="#/projects">Projects</Nav.Link>
                            <Nav.Link href="#/hall-of-fame">Hall of Fame</Nav.Link>

                            <NavDropdown title="Regeneration" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#/skins">Skins</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="https://www.bisecthosting.com/clients/aff.php?aff=3107">Need a Server?</Nav.Link>

                        </Nav>
                        <Nav>
                            {userData !== null && <Image src={getDiscordAvatar(this.state.user.data.discordId, this.state.user.data.avatar)} roundedCircle width={35} />}

                            {userData == null && button}

                            {userData !== null &&

                                <NavDropdown style={blackTextStyle} title={userData.data.username} id="collasible-nav-dropdown">

                                    <NavDropdown.Item style={blackTextStyle}><Link style={blackTextStyle} to="u/dashboard">Dashboard</Link></NavDropdown.Item>

                                    {isUserAdmin(this.state.user) && <NavDropdown.Item><Link style={blackTextStyle} to="a/add-vip">Add Donator</Link></NavDropdown.Item>}

                                    {isUserAdmin(this.state.user) && <NavDropdown.Item><Link style={blackTextStyle} to="a/donators">Edit Donators</Link></NavDropdown.Item>}
                                    <NavDropdown.Item onClick={this.handleLogoutClick} style={blackTextStyle}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar></>
        )
    };
}

//  {this.state.user !== null && this.state.user.data.role === "admin" && <Button onClick={this.handleLogoutClick}>Admin</Button>}
//{this.state.user !== null && <Image src={getDiscordAvatar(this.state.user.data.discordId, this.state.user.data.avatar)} roundedCircle width={80} />}

