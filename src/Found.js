import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import "./Style2.css";
import axios from 'axios';
import { BASE_URL } from "./constants"
import { useHistory } from "react-router-dom";

export default function Found(props) {
    const location = useLocation();
    const [data, setdata] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [locate, setlocate] = useState();

    let history = useHistory();

    function handleTheWall(event) {
        axios.get(BASE_URL + "/thewall/"
        ).then((responseID) => {
            axios.get(BASE_URL + "/doc/"
            ).then((responseImages) => {
                axios.get(BASE_URL + "/da/"
                ).then((responseData) => {
                    console.log(responseID.data);
                    console.log(responseImages.data);
                    console.log(responseData.data);
                    history.push({
                        pathname: '/missing',
                        search: '',
                        state: {
                            id: responseID.data.id,
                            images: responseImages.data,
                            data: responseData.data
                        }
                    })
                })
            })
        })
    }

    var o = {
        "head": { "found": 7 },
        "body": [{ "name": "788a7689", "phone": "9868967890", "location": "iuyy" },
        { "name": "916423", "phone": "1234567890", "location": "o" },
        { "name": "896897", "phone": "1234567890", "location": "tyru" },
        { "name": "1234567890", "phone": "1234567890", "location": "p" },
        { "name": "y", "phone": "1234567890", "location": "i" }]
    }

    React.useEffect(() => {
        try {
            let index = get(data, ["body"]).length - 1;
            setName(get(data, ["body", index, "name"]))
            setPhone(get(data, ["body", index, "phone"]))
            setlocate(get(data, ["body", index, "location"]))

            // console.log(name)
            // console.log(phone)
            // console.log(locate)
        } catch (error) {

        }

    })

    React.useEffect(() => {
        setdata(location.state.detail);
        // setdata(o);
    }, [])

    function get(object, path) {
        return path.reduce((obj, pathItem) => obj ? obj[pathItem] : undefined, object);
    }

    const n = (
        <h2>{name}</h2>
    )

    const p = (
        <h2>{phone}</h2>
    )

    const l = (
        <h2>{locate}</h2>
    )

    return (
        <>
            <header class="nav-section">
                <nav class="nav-container">
                    <a class="home" onClick={() => {
                        history.push({
                            pathname: '/',
                            search: '',
                            state: ''
                        })
                    }}>
                        <h4>Home</h4>
                    </a>
                    <a class="lost-people" onClick={handleTheWall}>
                        <h4>Missing</h4>
                    </a>
                </nav>
            </header>
            <section class="sec">
                <div class="cont">
                    <div class="case">
                        <h2>Look for lost</h2>
                        <h1>Matched</h1>
                    </div>
                    <div class="messageBox">
                        <h2>Matched</h2>
                        <div class="message2">
                            <div class="content">
                                <h4>Name</h4>
                                <div class="data" id="data1">
                                    <h4>{n}</h4>
                                </div>
                            </div>
                            <div class="content">
                                <h4>Contact</h4>
                                <div class="data">
                                    <h4>{p}</h4>
                                </div>

                            </div>
                            <div class="content">
                                <h4>Location</h4>
                                <div class="data">
                                    <h4>{l}</h4>
                                </div>
                            </div>
                            <div>
                                <h3>Thank you!</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
