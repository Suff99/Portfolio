import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

import PlayerFrameComponent from '../components/PlayerFrameComponent'
import { Col } from 'react-bootstrap';
import { Boop } from '../util/utils';
import { BarLoader } from 'react-spinners'

export default class HallOfFame extends React.Component {

    constructor() {
        super()
        this.state = {
            vips: [],
            isLoaded: false
        }
    }

    async componentDidMount() {
        document.title = "Hall of Fame";
        await fetch('https://mc-api.craig.software/vips')
            .then((response) => response.json())
            .then((res) => {
                this.setState({ vips: res.data, isLoaded: true });
            })
    }

    render() {
        return (
            <div className='body'>
                {!this.state.isLoaded && <BarLoader color="white" height={8} loading speedMultiplier={1} width={window.innerWidth} />}

                <div className="container-lg">

                    {this.state.isLoaded && <div className="row text-center justify-content-center align-items-center mx-0 px-0">

                        <h1 className="donator">Donators</h1>
                        <h5 className="donator">Thank you to all the players who donated to support the mods!</h5>
                        {this.state.vips.sort((a, b) => a.mc_name.localeCompare(b.mc_name)).filter(player => player.vip_type === 'donator').map((object) => <Col><Boop rotation={5} timing={200}><PlayerFrameComponent key={object.mc_name} player={object} isDonator={true} /></Boop></Col>)}
                    </div>}
                </div>

                {this.state.isLoaded && <div className="container-lg">
                    <div className="row text-center justify-content-center align-items-center mx-0 px-0">
                        <h1>Contributors</h1>
                        {this.state.vips.sort((a, b) => a.mc_name.localeCompare(b.mc_name)).filter(player => player.vip_type === 'developer').map((object) => <Col><Boop rotation={5} timing={200}><PlayerFrameComponent key={object.mc_name} player={object} isDonator={false} /></Boop></Col>)}
                    </div>
                </div>}
            </div>
        );
    }
}
