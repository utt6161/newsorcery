import React from "react";
import Button from "react-bootstrap/Button";
import Image from "next/image";

export default function SectionButton(props){

    return(
        <Button data-cy = "section-btn" variant="outline-primary d-flex align-items-center"
                className="section-button selected-button" onClick={props.onClick}>
            <p className="selected-button-text">{props.text}</p>
            <div className = "mr-1 d-flex">
                <Image layout="fixed" className="cancel-image" src="/cancel.png" width={20} height={20}/>
            </div>
        </Button>
    )
}
