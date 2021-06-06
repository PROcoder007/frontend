import React, { useState } from 'react'
import { useLocation } from "react-router-dom";

export default function Found(props) {
    const location = useLocation();
    const [data, setdata] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [locate, setlocate] = useState();

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
            let index = get(data,["body"]).length-1;
            setName(get(data,["body",index,"name"]))
            setPhone(get(data,["body",index,"phone"]))
            setlocate(get(data,["body",index,"location"]))

            // console.log(name)
            // console.log(phone)
            // console.log(locate)
        } catch (error) {
            
        }
        
    })

    React.useEffect(() => {
        setdata(location.state.detail);
        // setdata(o);
    },[])

    function get (object, path) {
        return path.reduce((obj, pathItem) => obj ? obj[pathItem] : undefined, object);
    }

    const n  = (
        <h2>{name}</h2>
    )

    const p =(
        <h2>{phone}</h2>
    )
    
    const l =(
        <h2>{locate}</h2>
    )

    return (
        <div class="matched">
            <h1>MATCHED</h1>
            <div class="info">
                <div>
                    {n}
                    <span>FullName</span>
                </div>
                <div>
                    {p}
                    <span>Contact</span>
                </div>
                <div>
                    {l}
                    <span>Location</span>
                </div>
            </div>
        </div>
    )
}
