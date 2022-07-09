import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Col } from 'react-bootstrap';

let audio = new Audio('/sounds/motivation.mp3')

const linkStyle = {
    textDecoration: "none",
    color: 'white'
};

export default class PlayerCredit extends Component {

    constructor(props) {
        super(props);
        this.state = { data: this.props.data, playerName: 'Unknown' };
    }

    componentDidMount() {
        fetch('https://playerdb.co/api/player/minecraft/' + this.props.data.author.uuid)
            .then((response) => response.json())
            .then((res) => {
                this.setState({ playerName: res.data.player.username })
            })
    }


    render() {

        function handleClick(e) {
            if (e.target.id === "Graham") {
                audio.play();
            }
        }

        return (
            <Col>
                <div id={this.props.data.name}>
                    <img draggable="false" key={this.props.data.name} alt={this.props.data.name} onClick={handleClick} src={"https://api.sprax2013.de/mc/skin/x-url/body/3d?url=" + this.props.data.url} id={this.props.data.name} style={{ height: "250px" }} />
                    <h5 className='developer'>{this.props.data.name}</h5>

                    <a href={this.props.data.author.link} class="ui image label">
                        <img src={'https://api.sprax2013.de/mc/skin/' + this.props.data.author.uuid + '/head?size=64'} />  {this.state.playerName}
                    </a>
                </div >
            </Col>
        )
    }

}
