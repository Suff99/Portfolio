
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { BarLoader } from 'react-spinners'
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';

export default class Skinpack extends React.Component {


  constructor() {
    super()
    this.state = {
      fortnite: [],
      isLoaded: false,
      searchQuery: 'fish'
    }
  }


  componentDidMount() {
    fetch('https://fortnite-api.com/v2/cosmetics/br/new')
      .then((response) => response.json())
      .then((res) => {
        this.setState({ fortnite: res.data.items, isLoaded: true })
      })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Typical usage (don't forget to compare props):
    if (prevState.searchQuery !== this.state.searchQuery) {
      fetch('https://fortnite-api.com/v2/cosmetics/br/search/all?matchMethod=contains&name=' + this.state.searchQuery)
        .then((response) => response.json())
        .then((res) => {
          if (res.data !== undefined) {
            this.setState({ fortnite: res.data, isLoaded: true })
          }
        })
    }
  }


  render() {
    document.title = "Fortnite Search";

    return (

      <div className='body'>
        {!this.state.isLoaded && <BarLoader color="white" height={8} loading speedMultiplier={1} width={window.innerWidth} />}

        <div className="container-lg">
          <h1>Fortnite</h1>

          <div className="ui input">
            <input onChange={e => this.setState({ searchQuery: e.target.value })} type="text" placeholder="Search..." />
          </div>         <br /><br /><br />

          <div class="ui horizontal inverted cards">
            {this.state.fortnite !== undefined && this.state.fortnite.map((object) =>

              < div class="ui horizontal invert card" >
                <div class="image">
                  <img src={object.images.icon} />
                </div>
                <div class="content">
                  <a class="header">{object.name}</a>
                  <div class="meta">
                    <span class="date">{moment(object.added).endOf('seconds').fromNow()}</span>
                  </div>
                  <div class="description">
                    {object.description}
                  </div>
                </div>
                <div class="extra content">
                  {object.introduction !== null && object.introduction.text}

                  {object.showcaseVideo !== null && <a href={'https://www.youtube.com/watch?v=' + object.showcaseVideo}>youtube</a>}

                </div>
              </div>
            )}</div>

          <br /><br /><br />


        </div>
      </div >
    );
  }
}


function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}