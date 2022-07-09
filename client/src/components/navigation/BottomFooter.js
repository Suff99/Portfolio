import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Github, Envelope, HddFill } from 'react-bootstrap-icons';

const linkStyle = {
    textDecoration: "none",
    color: 'white'
};


export default function BottomFooter() {
    return (
        <div className='footer'>
            <Navbar sticky="bottom" variant="dark" bg="dark">
                <Container>

                    <Navbar.Brand>Find me here</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link style={linkStyle} href="https://github.com/Suff99"><Github /></Nav.Link>
                        <Nav.Link style={linkStyle} href="mailto:craig@craig.software"><Envelope /> </Nav.Link>
                        <Nav.Link style={linkStyle} href="https://www.bisecthosting.com/clients/aff.php?aff=3107"><HddFill /></Nav.Link>
                    </Nav>
                </Container>
            </Navbar></div>)
};