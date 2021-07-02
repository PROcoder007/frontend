import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "./constants"
import { Box, Grid } from '@material-ui/core';

export default function TheWall() {
    const [loading, setLoading] = useState(true)
    const location = useLocation();
    const [ids, setIds] = useState([])
    const [data, setdata] = useState([])
    const [images, setimages] = useState([])
    let history = useHistory();
    let listItems;

    React.useEffect(() => {
        setIds(location.state.id);
        setimages(location.state.images);
        setdata(location.state.data);
        if (ids) {
            setLoading(false)
        }
    }, [])

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


    function getName(id) {
        let res;
        data.forEach(function (item) {
            if (item.id == id) {
                res = item.name;
            }
        })
        return res;
    }

    function getPhone(id) {
        let res;
        data.forEach(function (item) {
            if (item.id == id) {
                res = item.phone;
            }
        })
        return res;
    }

    function getLocation(id) {
        let res;
        data.forEach(function (item) {
            if (item.id == id) {
                res = item.location;
            }
        })
        return res;
    }

    listItems = images.map((item) => <>
        <Grid alignItems="center" direction="row" style={{margin:"2rem",color:"#4F4F4F",fontSize:"1.5rem"}} >
            <Grid item><img src={item.docfile} key={item.id} width="400px" /></Grid>
            <Grid item style={{textAlign:"center"}}>Name : {getName(item.id)}</Grid>
            <Grid item style={{textAlign:"center"}}>Phone : {getPhone(item.id)}</Grid>
            <Grid item style={{textAlign:"center"}}>Location : {getLocation(item.id)}</Grid>
        </Grid>
    </>
    );


    if (loading) return (<p>loading...</p>)
    return (<>
    {/* Box style={{background:"#d1d0c9"}} height="1000vh" width="100%" */}
        <header class="nav-section">
            <nav class="nav-container">
                <a class="home" style={{color:"black"}} onClick={() => {
                    history.push({
                        pathname: '/',
                        search: '',
                        state: ''
                    })
                }}>
                    <h4>Home</h4>
                </a>
                <a class="lost-people" style={{color:"black"}} onClick={handleTheWall}>
                    <h4>Missing</h4>
                </a>
            </nav>
        </header>
        <Box height="6rem"></Box>
        <Grid container>
            {listItems}
        </Grid>
    </>
    )



}
