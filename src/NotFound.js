import React from 'react'
import "./Style2.css"
import axios from 'axios';
import { BASE_URL } from "./constants"
import { useHistory } from "react-router-dom";

export default function NotFound(props) {
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

    return (<>
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
                    <h1>Not Matched</h1>
                </div>
                <div class="messageBox">
                    <h2>Not Matched</h2>
                    <div id="message">
                        <p>
                            Registered face is'nt matched.<br /><br />
                            We have stored your registered information and uploaded image.
                            That will be stored for the another person to upload
                            the same face here. Your registered information will be displayed
                            to them so they can contact you.<br /><br />
                            Hope and wait for good tidings.<br />
                            Thank you!

                        </p>
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}
