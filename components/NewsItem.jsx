import React from 'react';
import strip from "../utils/stripHtml";
import {currentURL} from "../store/crutial_data";


class NewsItem extends React.Component {

    // let options = {
    //     era: 'long',
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    //     weekday: 'long',
    //     timezone: 'UTC',
    //     hour: 'numeric',
    //     minute: 'numeric'
    // };
    render() {
        // <Row className = "m-1 pt-1">
        //     <Col md={3}>
        //         <Image src={props.data.thumbnail} width={250} height={225} layout="fixed"></Image>
        //     </Col>
        //     <Col md = {9} className = "">
        //         <p>{props.data.headline}</p>
        //         <p>{props.data.trailText}</p>
        //     </Col>
        // </Row>

        // <Card style={{ minHeight: '10rem' }}>
        //     <Card.Img variant="top" src={props.data.thumbnail} />
        //     <Card.Body>
        //         <Card.Title>{props.data.headline}</Card.Title>
        //         <Card.Text>
        //             {props.data.trailText}
        //         </Card.Text>
        //         <Button variant="primary">Go somewhere</Button>
        //     </Card.Body>
        // </Card>

        const itemURL = `${currentURL}/article?&id=${encodeURIComponent(this.props.data.id)}`

        return <a href={itemURL} style = {{ textDecoration: "none"}}>
            <div className="card mb-3 no_rounding full_border custom_card">
                <img className="card-img-top no_rounding card-img-size" src={this.props.data.fields.thumbnail}
                    alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{strip(this.props.data.fields.headline)}</h5>
                    <p className="card-text">{`${strip(this.props.data.fields.trailText)}...`}</p>
                    <p className="card-text">
                        <small
                        >
                            {`last updated: ${new Date(this.props.data.fields.lastModified).toLocaleString()}`}
                        </small>
                    </p>
                </div>
            </div>
        </a>

        // <Card className="bg-dark text-white">
        //     <Card.Img src={props.data.thumbnail} alt="Card image" />
        //     <Card.ImgOverlay>
        //         <Card.Title>{props.data.headline}</Card.Title>
        //         <Card.Text>
        //             {props.data.trailText}
        //         </Card.Text>
        //         <Card.Text>Last updated 3 mins ago</Card.Text>
        //     </Card.ImgOverlay>
        // </Card>

        // <Card>
        //     <Card.Img variant="top" src={props.data.thumbnail} />
        //     <Card.Body>
        //         <Card.Title>{props.data.headline}</Card.Title>
        //         <Card.Text >
        //             {props.data.trailText}
        //         </Card.Text>
        //     </Card.Body>
        // </Card>
    }
}

export default NewsItem
