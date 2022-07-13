import React, { Component } from 'react';
import { Col, Accordion, Carousel, Row, Button } from 'react-bootstrap';
import { isDev } from '../util/utils';
import moment from 'moment';


export default class Mod extends Component {

    constructor(props) {
        super(props)
        this.state = {
            authors: []
        }
    }

    async componentDidMount() {
        for (let index = 0; index < this.props.mod.authors.length; index++) {
            const element = this.props.mod.authors[index];
            let link = isDev() ? 'http://localhost:3001/twitch?user=' : 'https://mc-be.craig.software/twitch?user=';
            await fetch(link + element.name, {
            }).then(data => data.json()).then(data => {
                this.setState(previousState => ({
                    authors: [...previousState.authors, { name: element.name, url: element.url, title: element.title, pfp: data !== undefined ? data.profile_image_url : 'https://icons-for-free.com/download-icon-twitch-1320194643260954752_512.png' }]
                }));
            })
        }
    }

    render() {
        return (
            <div className="ui message">
                <div className="ui items ">
                    <div className="item">
                    <div className={(this.props.mod.classId === 6 ? 'blue' : 'red') + ' ui bottom attached label'} >{this.props.mod.classId === 6 ? 'Mod' : 'Mod Pack'}</div>

                        <a className="ui small image">
                            <img draggable="false" src={this.props.mod.logo} />
                        </a>



                        <div className="content">
                            <a href={this.props.mod.website} className="header">{this.props.mod.title} {this.state.authors.filter(e => e.name === 'Suff99').length == 0 && <div class="ui purple horizontal label">Contributed</div>}
                            </a>

                            <div className="description">
                                <p><i>{this.props.mod.summary}</i></p>
                                <p>Downloads: {this.props.mod.downloads}</p>
                                <p>Released: {moment(this.props.mod.dateCreated).startOf('seconds').fromNow()} ({moment(this.props.mod.dateCreated).format('MMMM Do YYYY')})</p>
                                <p>Last release: {moment(this.props.mod.dateReleased).startOf('seconds').fromNow()} ({moment(this.props.mod.dateReleased).format('MMMM Do YYYY')})</p>

                                <p>Authors: <Row> {this.state.authors.map((author) =>
                                    <Col className='col-auto mc-font'>
                                        <a href={author.url}>
                                            <img class="ui avatar image" alt={author.name} src={author.pfp} /></a>
                                        <span>{author.name}</span>
                                    </Col>
                                )}

                                </Row></p>

                                <Accordion>

                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header className='mc-font'>Categories</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="row">
                                                {this.props.mod.categories.map((category) =>
                                                    <Col className='col-auto mc-font'>
                                                        <a href={category.url} className="ui image label">
                                                            <img alt={category.name} src={category.iconUrl} />  {category.name}
                                                        </a>
                                                    </Col>
                                                )}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>


                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header className='mc-font'>Supported Minecraft Versions</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="row">
                                                {this.props.mod.versionFiles.sort((b, a) => a.version.localeCompare(b.version)).map((version) =>
                                                    <Col className='col-auto mc-font'>
                                                        <a href={version.file.url} class="ui label">
                                                            {version.version}
                                                        </a>
                                                    </Col>
                                                )}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    {this.props.mod.contributionMsg !== null && <Accordion.Item eventKey="2">
                                        <Accordion.Header className='mc-font'>Contribution</Accordion.Header>
                                        <Accordion.Body>
                                            {this.props.mod.contributionMsg}
                                        </Accordion.Body>
                                    </Accordion.Item>}

                                    {this.props.mod.screenshots != 0 && <Accordion.Item eventKey="3">
                                        <Accordion.Header className='mc-font'>Screenshots</Accordion.Header>
                                        <Accordion.Body>

                                            <Carousel>
                                                {this.props.mod.screenshots.map((category) =>

                                                    <Carousel.Item>
                                                        <img draggable="false"
                                                            className="d-block w-100"
                                                            src={category.url}
                                                            alt={category.title}
                                                        />
                                                        <Carousel.Caption>
                                                            <div class="ui inverted message">
                                                                <div class="mc-font">
                                                                    {category.title}
                                                                </div>
                                                                <p>{category.description}</p>
                                                            </div>
                                                        </Carousel.Caption>
                                                    </Carousel.Item>)}
                                            </Carousel>
                                        </Accordion.Body>
                                    </Accordion.Item>}

                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
