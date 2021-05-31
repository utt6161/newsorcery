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

export default function Article(props) {

    const dispatch = useDispatch()
    const query = useSelector(selectQuery)
    const [renderArticle, setArticleData] = useState([])
    useEffect(() => {

        if (query.hasOwnProperty("id")) {

        }
    })

    return (
        <Sections>

        </Sections>

    )
}
