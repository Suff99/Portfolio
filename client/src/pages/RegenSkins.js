
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import SkinComponent from '../components/SkinComponent';
import { BarLoader } from 'react-spinners'


export default class Skinpack extends React.Component {


    constructor() {
        super()
        this.state = {
            skins: [],
            isLoaded: false,
            searchQuery: ''
        }
    }


    componentDidMount() {
        fetch('https://mc-api.craig.software/skins')
            .then((response) => response.json())
            .then((res) => {
                this.setState({ skins: res.data, isLoaded: true })
            })
    }



    render() {
        document.title = "Regeneration Skins";

        return (

            <div className='body'>
                {!this.state.isLoaded && <BarLoader color="white" height={8} loading speedMultiplier={1} width={window.innerWidth} />}

                <div className="container-lg">
                    <h1>Skins</h1>

                    <div className="ui input">
                        <input onChange={e => this.setState({ searchQuery: e.target.value })} type="text" placeholder="Search Skins..." />
                    </div>

                    <div className="row text-center justify-content-center align-items-center mx-0 px-0">
                        {this.state.skins.sort((a, b) => a.name.localeCompare(b.name)).sort((b, a) => a.author.link.localeCompare(b.author.link)).filter(skin => skin.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())).map((object) =>
                            <SkinComponent data={object} key={object.name} />
                        )}
                        <br /><br /><br />
                    </div>


                </div>
            </div>
        );
    }
}


function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}