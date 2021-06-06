import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, {useEffect, useRef, useState} from "react";
import strip from "../src/utils/stripHtml";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {useDispatch, useSelector} from "react-redux";
import {selectQuery} from "../src/store/serverSlice";
import {setSelected} from "../src/store/sectionSlice";
import {setSearchText} from "../src/store/searchSlice";
import {setCurrentPage} from "../src/store/articlesSlice";
import Sections from "../src/components/Sections";
import axios from "axios";
import {apiKEY} from "../src/store/crucialData";

export default function Article(props) {

    const dispatch = useDispatch()
    const query = useSelector(selectQuery)
    const [renderArticle, setArticleData] = useState("")
    useEffect(() => {
        if (query.hasOwnProperty("id") && query.id !== "undefined") {
            let articleId;
            try{
                articleId = decodeURIComponent(query.id)
                axios.get(`https://content.guardianapis.com/${articleId}?api-key=${apiKEY}&show-fields=headline,body`)
                    .then((response) => {
                        setArticleData(response.data.response.content.fields.body)
                    })
                    .catch((reason)=>{
                        setArticleData("<h1 class = 'px-4 pt-4 text-center'>Seems like link to the article is broken</h1>" +
                            "<h5 class = 'text-center'>try again, perhaps?</h5>")
                    })
            }catch (e) {
                setArticleData("<h1 class = 'px-4 pt-4 text-center'>Seems like link to the article is broken</h1>" +
                    "<h5 class = 'text-center'>try again, perhaps?</h5>")
            }
        } else {
            setArticleData("<h1 class = 'px-4 pt-4 text-center'>Seems like link to the article is broken</h1>" +
                "<h5 class = 'text-center'>try again, perhaps?</h5>")
        }
    }, [renderArticle])

    function contentToString() {
        return {__html: renderArticle};
    }

    useEffect(()=>{
        window.twttr = (function(d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s); js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
            t._e = []; t.ready = function(f) {
                t._e.push(f);
            };
            return t;
        }(document, "script", "twitter-wjs"));
    })


    return (
        <>
            <Sections>

            </Sections>
            <Row>
                <Col>
                    <div className="m-1 p-2 full-border bg-white" dangerouslySetInnerHTML={ contentToString() }/>
                </Col>
            </Row>
        </>
    )
}
