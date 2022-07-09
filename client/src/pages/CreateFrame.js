import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Component, React } from 'react';

import silverPlayerFrame0 from '../images/frames/silver/player_frame_0.png'
import silverPlayerFrame1 from '../images/frames/silver/player_frame_1.png'
import silverPlayerFrame2 from '../images/frames/silver/player_frame_2.png'
import silverPlayerFrame3 from '../images/frames/silver/player_frame_3.png'

import goldPlayerFrame0 from '../images/frames/player_frame_0.png'
import goldPlayerFrame1 from '../images/frames/player_frame_1.png'
import goldPlayerFrame2 from '../images/frames/player_frame_2.png'
import goldPlayerFrame3 from '../images/frames/player_frame_3.png'
import { isUuid, toDataURL } from '../util/utils';
import mergeImages from 'merge-images';
import { Form , Col} from 'react-bootstrap';

const frames = [goldPlayerFrame0, goldPlayerFrame1, goldPlayerFrame2, goldPlayerFrame3, silverPlayerFrame0, silverPlayerFrame1, silverPlayerFrame2, silverPlayerFrame3]

export default class CreateFrame extends Component {

    constructor() {
        super()
        this.state = {
            uuid: 'ec561538-f3fd-461d-aff5-086b22154bce',
            frame: goldPlayerFrame0
        }
    }

    componentDidMount() {
        document.title = "Player Frame Creator";
    }

    render() {
        return (
                <div className='body'>
                    <div class="col">
                        <figure>
                            <img src={"https://visage.surgeplay.com/bust/800/" + this.state.uuid} style={{ height: "250px" }} data-bs-toggle="tooltip" id='frame' alt='Player Frame' />
                            {manualframe("https://visage.surgeplay.com/bust/800/" + this.state.uuid, this.state.frame)}

                            <form>

                                <Form.Group className="mb-3" controlId="minecraftUser">
                                    <Form.Label>Minecraft UUID</Form.Label>
                                    <Form.Control onChange={e => this.setState({ uuid: getUuid(e.target.value) })} type="username" placeholder="Search" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Frame</Form.Label>
                                    <Form.Select id="frame" name="frame" required defaultValue="Choose..."  onChange={e => this.setState({ frame: frames[e.target.value] })}>
                                    <option value={0}>Gold 0</option>
                                            <option value={1}>Gold 1</option>
                                            <option value={2}>Gold 2</option>
                                            <option value={3}>Gold 3</option>
                                            <option value={4}>Silver 0</option>
                                            <option value={5}>Silver 1</option>
                                            <option value={6}>Silver 2</option>
                                            <option value={7}>Silver 3</option>
                                    </Form.Select>
                                </Form.Group>
                            </form>
                        </figure>
                    </div>
                </div>
        );
    }
}

function getUuid(uuid) {
    if (isUuid(uuid)) {
        return uuid;
    }
    return 'ec561538-f3fd-461d-aff5-086b22154bce';
}

function manualframe(imgSource, frame) {
    toDataURL(imgSource)
        .then(dataUrl => {
            mergeImages([
                { src: frame },
                { src: dataUrl, x: 150, y: 243 }])
                .then(b64 => document.getElementById('frame').src = b64);
        })
}

