import React from 'react';
import strip from "../utils/stripHtml";
import {useSelector} from "react-redux";
import {selectOrigin} from "../store/serverSlice";


export default function NewsListItem(props) {
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
    const origin = useSelector(selectOrigin)
    const itemURL = `/article?&id=${encodeURIComponent(props.data.id)}`
    return (
        <a href={itemURL} style = {{ textDecoration: "none"}} className="news-item">
            <div className="card mb-3 no-rounding full-border custom-card bg-newspaper">
                <img className="card-img-top no-rounding border-bottom border-bottom border-dark card-img-news" src={props.data.fields.thumbnail}
                     alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{strip(props.data.fields.headline)}</h5>
                    <p className="card-text">{`${strip(props.data.fields.trailText)}...`}</p>
                    <p className="card-text">
                        <small
                        >
                            {`last updated: ${new Date(props.data.fields.lastModified).toLocaleString()}`}
                        </small>
                    </p>
                </div>
            </div>
        </a>
    )
}