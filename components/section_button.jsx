import React from "react";
import Button from "react-bootstrap/Button";
import Image from "next/image";

export default function SectionButton(props){

    return(
        <Button variant="outline-primary d-flex align-items-center"
            className="section_button selected_button" onClick={props.onClick}>
            <p className="selected_button_text">{props.text}</p>
            <div className = "mr-1 d-flex">
                <Image layout="fixed" className="cancel_image" src="/cancel.png" width={20} height={20}/>
            </div>
        </Button>
    )
}
