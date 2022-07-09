import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { getDiscordAvatar, getMinecraftDetails, getMinecraftPlayerName, getUserDetails, isDev } from '../util/utils';
import React, { Component } from 'react';
import { Button, Row, Col, Form, Image } from 'react-bootstrap';
import { BarLoader } from 'react-spinners'

export default class Dashboard extends Component {


    constructor() {
        super();
        this.loginMc = this.loginMc.bind(this);

        this.state = { user: null, uuid: '', playerName: '', isLoaded: false };
    }

    loginMc() {
        window.location.href = 'https://mc-auth.com/oAuth2/authorize?client_id=2868706533640766525&redirect_uri=%redirect%&response_type=code'.replace('%redirect%', (isDev() ? "http://localhost:3000" : "https://mc.craig.software"))
    }

    componentDidMount() {


        getUserDetails().then(data => {
            this.setState({ user: data.data, uuid: data.data.minecraft, playerName: '' })
            getMinecraftPlayerName(data.data.minecraft).then(json => this.setState({ playerName: json.data.player.username }))
            this.setState({ isLoaded: true });
        }).catch((err) => {
            console.log(err)
        }
        )


        document.title = "Dashboard";

    }


    render() {
        let button = <Button onClick={this.loginMc}>Sync Minecraft</Button>;
        let loggedIn = this.state.user !== null;
        let mcConnected = this.state.uuid.length > 0;

        return (
            <div className='body'>
                {!this.state.isLoaded && <BarLoader
                    color="white"
                    height={8}
                    loading
                    speedMultiplier={1}
                    width={600}
                />}

                <div class="ui message">
                    <div class="header">
                        Under Construction
                    </div>
                    <p>This page is still under Construction.</p>
                </div>

                <div class="ui segment">

                    <div class="ui left rail">
                        <div class="ui segment">
                            {this.state.isLoaded && this.state.user !== null && <Col>

                                <div class="ui card">
                                    <div class="image">
                                        <img src={getDiscordAvatar(this.state.user.discordId, this.state.user.avatar)} />
                                    </div>
                                    <div class="content">
                                        <a class="header">{loggedIn && this.state.user.username}</a>
                                        <div class="description">
                                            <p class="header">Discord ID:</p> {loggedIn && this.state.user.discordId}
                                            <p class="header">Minecraft UUID:</p> {mcConnected && this.state.uuid}
                                            {!mcConnected && button}
                                            <p class="header">Minecraft username:</p> {mcConnected && this.state.playerName}
                                            {!mcConnected && button}
                                        </div>
                                    </div>
                                </div>
                            </Col>}
                        </div>
                    </div>


                    <div class="ui right rail">
                        <div class="ui segment">
                            <Col>
                                {mcConnected && <Form noValidate>
                                    <h1>Wings data</h1>

                                    <Row className="mb-3">
                                        <Form.Group as={Col}>
                                            <Form.Label>Wings Type</Form.Label>
                                            <Form.Select id="wings_type" name="wings_type" required defaultValue="Choose...">
                                                <option value="weeping_angels:normal">Stone</option>
                                                <option value="weeping_angels:basalt">Basalt</option>
                                                <option value="weeping_angels:copper">Copper</option>
                                                <option value="weeping_angels:diamond">Diamond</option>
                                                <option value="weeping_angels:dirt">Dirt</option>
                                                <option value="weeping_angels:emerald">Emerald</option>
                                                <option value="weeping_angels:gold">Gold</option>
                                                <option value="weeping_angels:iron">Iron</option>
                                                <option value="weeping_angels:lapis_lazuli">Lapis lazuli</option>
                                                <option value="weeping_angels:mossy">Mossy</option>
                                                <option value="weeping_angels:quartz">Quartz</option>
                                                <option value="weeping_angels:rusted">Rusted</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Wings Model</Form.Label>
                                            <Form.Select id="wings_model" name="wings_model" required defaultValue="Choose...">
                                                <option value="DISASTER_MC">Disaster</option>
                                                <option value="DOCTOR">Doctor</option>
                                                <option value="ED">Ed</option>
                                                <option value="CHERUB">Cherub</option>
                                                <option value="A_DIZZLE">Classic</option>
                                                <option value="SPARE_TIME">Spare Time</option>
                                                <option value="VILLAGER">Villager</option>
                                                {
                                                    this.state.uuid === 'bd049f17-7fdd-42aa-bd19-81a60d6b526b' && <option value="MERCY">Mercy</option>
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>

                                    <button class="minecraft-btn mx-auto w-64 text-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200" name="submit" type="submit">
                                        Submit
                                    </button>

                                </Form>}
                            </Col>
                        </div>
                    </div>


                    <p></p>
                    <p></p>
                </div>
            </div>
        )
    };
}
