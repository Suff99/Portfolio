import '../../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap';

import axios from 'axios';
import { getImage, getUserDetails, isUserAdmin } from '../../util/utils';

export default function AddDonator({ history }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [validated, setValidated] = useState(false);

    const [input, setInput] = useState({
        uuid: '',
        donator_type: 'donator',
        perked_wings: true,
        wings_type: 'weeping_angels:normal',
        wings_model: 'DISASTER_MC'
    });

    useEffect(() => {
        getUserDetails().then(data => {
            setUser(data);
            setLoading(false);
            if (!isUserAdmin(data)) {
                history.push('/');
            }
        }).catch((err) => {
            history.push('/');
            setLoading(false);
        }
        )

        document.title = "Add VIP";


    }, [])



    function handleChange(event) {
        const { name, value } = event.target;
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    function onHandleFormSubmit(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true)
        if (form.checkValidity()) {
            console.log(input)
            axios.post('https://mc-api.craig.software/post/add_vip', input);
            e.preventDefault();
        }
    }


    return !loading && (
        <div className='body'>

            <Row className="">

                <Col>
                    <Form noValidate validated={validated} onSubmit={onHandleFormSubmit}>
                        <h1>Add Donator</h1>
                        <Row className="mb-3">

                            <Form.Group as={Col}>

                                <Form.Label>UUID</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><img src={getImage(input.uuid)} alt={"Player"} /></InputGroup.Text>
                                    <Form.Control required pattern="^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$" id="uuid" name="uuid" placeholder="Minecraft UUID" value={input.uuid} onChange={handleChange} />
                                    <Form.Control.Feedback type="invalid">Please give a Valid Minecraft UUID</Form.Control.Feedback>
                                </InputGroup>

                            </Form.Group>
                        </Row>

                        <Form.Group as={Col}>
                            <Form.Label>VIP Type</Form.Label>
                            <select class="ui fluid dropdown" id="donator_type" name="donator_type" required defaultValue="Choose..." value={input.donator_type} onChange={handleChange}>
                                    <option value="donator">Donator</option>
                                    <option value="developer">Developer</option>
                            </select>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Wings Type</Form.Label>
                                <select class="ui fluid dropdown" id="wings_type" name="wings_type" required defaultValue="Choose..." value={input.wings_type} onChange={handleChange}>
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
                                </select>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Wings Model</Form.Label>
                                <select class="ui fluid dropdown" id="wings_model" name="wings_model" required defaultValue="Choose..." value={input.wings_model} onChange={handleChange}>
                                    <option value="DISASTER_MC">Disaster</option>
                                    <option value="DOCTOR">Doctor</option>
                                    <option value="ED">Ed</option>
                                    <option value="CHERUB">Cherub</option>
                                    <option value="A_DIZZLE">Classic</option>
                                    <option value="SPARE_TIME">Spare Time</option>
                                    <option value="VILLAGER">Villager</option>
                                    {
                                        input.uuid === 'bd049f17-7fdd-42aa-bd19-81a60d6b526b' && <option value="MERCY">Mercy</option>
                                    }
                                </select>
                            </Form.Group>
                        </Row>

                        <Button variant="primary" name="submit" type="submit">
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
        </div>
    );
}
