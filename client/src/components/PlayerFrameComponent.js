import React from 'react'

import mergeImages from 'merge-images';

// There has to be a better way
import silverPlayerFrame0 from '../images/frames/silver/player_frame_0.png'
import silverPlayerFrame1 from '../images/frames/silver/player_frame_1.png'
import silverPlayerFrame2 from '../images/frames/silver/player_frame_2.png'
import silverPlayerFrame3 from '../images/frames/silver/player_frame_3.png'

import goldPlayerFrame0 from '../images/frames/player_frame_0.png'
import goldPlayerFrame1 from '../images/frames/player_frame_1.png'
import goldPlayerFrame2 from '../images/frames/player_frame_2.png'
import goldPlayerFrame3 from '../images/frames/player_frame_3.png'
import { toDataURL } from '../util/utils';

export default class PlayerFrame extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      uuid: 'ec561538-f3fd-461d-aff5-086b22154bce'
    }
  }


  render() {
    return (

      <div className="col">
        <figure>
          {<img id={this.props.player.mc_name} src={"https://visage.surgeplay.com/bust/800/" + this.props.player.uuid} style={{ height: "250px" }} data-bs-toggle="tooltip" title={this.props.player.mc_name} alt={this.props.player.mc_name} />}
          <figcaption>
            <h5 className={this.props.isDonator ? 'donator' : 'developer'}>{this.props.player.mc_name}</h5> </figcaption>
          {createFrameForPlayer(this.props.player.mc_name, "https://visage.surgeplay.com/bust/800/" + this.props.player.uuid, this.props.isDonator)}
        </figure>
      </div>

    )
  }
}

function createFrameForPlayer(playerImgName, imgSource, isDonator) {
  toDataURL(imgSource)
    .then(dataUrl => {
      mergeImages([
        { src: getRandomFrame(isDonator) },
        { src: dataUrl, x: 150, y: 243 }])
        .then(b64 => {
          document.getElementById(playerImgName).src = b64;
        });
    })
}



const goldenFrames = [
  goldPlayerFrame0, goldPlayerFrame1,
  goldPlayerFrame2,
  goldPlayerFrame3
];

const silverFrames = [
  silverPlayerFrame0, silverPlayerFrame1,
  silverPlayerFrame2,
  silverPlayerFrame3
];

function getRandomFrame(isDonator) {
  let frames = isDonator ? silverFrames : goldenFrames;
  return frames[Math.floor(Math.random() * frames.length)];
}