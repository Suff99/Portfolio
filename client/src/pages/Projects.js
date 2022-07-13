import Mod from '../components/ModComponent';
import React from 'react';
import { BarLoader } from 'react-spinners'
import { isDev } from '../util/utils';

export default class Projects extends React.Component {
    state = { activeIndex: 0 }

    constructor() {
        super()
        this.state = {
            projects: [],
            downloadCount: 0,
            isLoading: false,
        }
    }

    async componentDidMount() {
        document.title = "Projects";
        await fetch(isDev() ? 'http://localhost:3001/get-mods' : 'https://mc-be.craig.software/get-mods').then((response) => response.json()).then(res => {
            this.setState({ projects: res.data });

            let downloads = 0;

            for (let index = 0; index < res.data.length; index++) {
                const element = res.data[index];
                downloads += element.downloads;
            }
            this.setState({ downloadCount: downloads })

        })
        this.setState({ isLoaded: true })

    }

    render() {

        return (
            <div className="body">
                {!this.state.isLoaded && <BarLoader color="white" height={8} loading speedMultiplier={1} width={window.innerWidth} />}
                {!this.state.isLoaded && <p style={{ color: 'white' }}>Loading Projects...</p>}

                <h1>Minecraft Mods</h1>

                
                <div className="container-lg justify-content-center align-items-center">

               
                    <p style={{ color: 'white' }}><div className='ui red label'>Mod Pack</div> - Modpacks are a collection of Minecraft mods that create an overall theme</p>
                    <p style={{ color: 'white' }}><div className='ui blue label'>Mod</div> - A Minecraft mod is an independent, user-made modification to the Mojang video game Minecraft.</p>

                    {this.state.projects.sort((b, a) => a.downloads - b.downloads).map((project) =>
                        <Mod mod={project} key={project.name} />
                    )}

                </div><br /><br /><br />
            </div>
        );
    }
}



