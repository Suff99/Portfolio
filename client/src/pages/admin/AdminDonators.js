import '../../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import PlayerFrame from '../../components/PlayerFrameComponent';
import { getUserDetails, isUserAdmin } from '../../util/utils';
export default class AdminDonators extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            vips: [],
            searchQuery: '',
            user: ''
        }
    }

    componentDidMount() {

        getUserDetails().then(data => {

            this.setState({ user: data });
            if (!isUserAdmin(data)) {
                this.context.router.history.push("/");
            }
        }).catch((err) => {
            this.context.router.history.push("/");
        }
        )


        fetch('https://mc-api.craig.software/vips')
            .then((response) => response.json())
            .then((res) => this.setState({ vips: res.data }))

        document.title = "Admin Dashboard";

    }

    render() {

        function deleteUser(e) {
            console.log(e.target.id)
            const data = {
                uuid: e.target.id
            }
            axios.post('https://mc-api.craig.software/post/delete_vip', data);

        }

        return (
            <div className='body'>
                <div className="container-lg">
                    <h1 className="donator">Donators</h1>

                    <Form>
                        <Form.Group className="mb-3" controlId="minecraftUser">
                            <Form.Label>Minecraft Username</Form.Label>
                            <Form.Control onChange={e => this.setState({ searchQuery: e.target.value })} type="username" placeholder="Enter minecraft username" />
                        </Form.Group>
                    </Form>

                    <div className="container-lg">
                        <div className="row text-center justify-content-center align-items-center mx-0 px-0">
                            {this.state.vips.filter(player => player.mc_name.includes(this.state.searchQuery)).map((object) =>
                                <div className='col'>
                                    <PlayerFrame player={object} isDonator={false} />
                                    <button id={object.uuid} onClick={deleteUser} class="minecraft-btn mx-auto w-64 text-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200">Delete</button>
                                    <br></br><br></br>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
