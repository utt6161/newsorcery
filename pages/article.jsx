import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, {useEffect, useRef, useState} from "react";
import strip from "../utils/stripHtml";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {useDispatch, useSelector} from "react-redux";
import {selectQuery} from "../store/serverSlice";
import {setSelected} from "../store/sectionSlice";
import {setSearchText} from "../store/searchSlice";
import {setCurrentPage} from "../store/articlesSlice";
import Sections from "../components/Sections";
import axios from "axios";
import {apiKEY} from "../store/crucialData";

export default function Article(props) {

    const dispatch = useDispatch()
    const query = useSelector(selectQuery)
    const [renderArticle, setArticleData] = useState("")
    useEffect(() => {
        if (query.hasOwnProperty("id")) {
            axios.get(`https://content.guardianapis.com/${decodeURIComponent(query.id)}?api-key=${apiKEY}&show-fields=headline,body`)
                .then((response) => {
                    setArticleData(response.data.response.content.fields.body)
                })
                .catch((reason)=>{
                    setArticleData("<h1 style='color: #1f8afe' class = 'px-4 pt-4 text-center'>Seems like link to the article is broken</h1>" +
                            "<h5 style='color: #1f8afe' class = 'text-center'>try again, perhaps?</h5>")
                })
        }
    }, [renderArticle])

    function contentToString() {
        return {__html: renderArticle};
    }

    return (
        <>
            <Sections>

            </Sections>
            <Row>
                <Col>
                    <div className="m-1 p-2 full-border" dangerouslySetInnerHTML={ contentToString() }/>
                </Col>
            </Row>
        </>
    )
}
