import React from "react";
import FormData from 'form-data';
import axios from 'axios';
import './Style.css'
import {BASE_URL} from "./constants"

export class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      location: '',
      sta: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }


  handlePhoneChange(event) {
    this.setState({ phone: event.target.value });
  }


  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }


  handleImageChange(event) {
    this.setState({ image: event.target.value });
  }

  handleStateChange(event) {
    this.setState({ sta: event.target.value });
  }


  handleSubmit(event) {
    let file = this.fileInput.current.files[0]
    //form validation
    let isFormDateValidated = true;

    if (this.state.phone.length !== 10) {
      isFormDateValidated = false;
      // console.log(1)
    }
    if (this.state.sta.length === 0) {
      isFormDateValidated = false;
      // console.log(2)
    }

    if (!(file && file['type'].split('/')[0] === 'image')) {
      isFormDateValidated = false;
      // console.log(3)
    }

    if (isFormDateValidated) {
      let formData = new FormData();
      formData.set('name', this.state.name);
      formData.set('phone', this.state.phone);
      formData.set('location', this.state.location);
      formData.set('state', this.state.sta);
      axios.post(BASE_URL+ '/data/', formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((response) => {
        var id = response.data.id

        formData = new FormData();
        formData.set('docfile', file);
        axios.post(BASE_URL +'/doc/', formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }).then((response) => {
          axios.get(BASE_URL+`/doc/${id}`
          ).then((response) => {
            if(response.data.head.found === 0){
              this.props.history.push({
                pathname: '/notfound',
                search: '',
                state: { detail: response.data }
              })
  
            }
            else{
              this.props.history.push({
                pathname: '/found',
                search: '',
                state: { detail: response.data }
              })
  
            }

            
          })
        });
      }
        , (error) => {
          console.log(error);
        }
      );
    }
    else {
      alert("Provide valid details.")
      console.log("Name : ",this.state.name)
      console.log("Phone : ",this.state.phone)
      console.log("Location : ",this.state.location)
      console.log("state : ",this.state.sta)
      console.log("image : ",(file && file['type'].split('/')[0] === 'image'))
    }

    // console.log("closed")

    event.preventDefault();
  }

  render() {
    return (
      
      <form onSubmit={this.handleSubmit}>
        <section>
          <div class="container">
            <div class="show">
              <h2>Look for Lost</h2>
              <div class="items">
                <img src="face-scan.png" />
              </div>
            </div>
            <div class="contactForm">
              <h2>Register the face</h2>
              <div class="formBox">
                <div class="inputBox w50">
                  <input type="text" required value={this.state.name} onChange={this.handleNameChange} />
                  <span>Full Name</span>
                </div>
                <div class="inputBox w50">
                  <input type="number" required value={this.state.phone} onChange={this.handlePhoneChange} />
                  <span>Contact No.</span>
                </div>
                <div class="inputBox w100">
                  <input type="text" required value={this.state.location} onChange={this.handleLocationChange} />
                  <span>Location</span>
                </div>
                <div class="inputBox w50" id="r1r2">
                  <input type="radio" value="lost" checked={this.state.sta === "lost"} onChange={this.handleStateChange} />
                  <label>Lost</label>
                  <br />
                  <input type="radio" value="found" checked={this.state.sta === "found"} onChange={this.handleStateChange} />
                  <label>Found</label>
                </div>
                <div class="inputBox w100">
                  <label id="upload">Upload Image
                        <input type="file" id="file" accept="image/*" ref={this.fileInput} />
                  </label>
                </div>
                <div class="inputBox w100">
                  <input type="submit" value="Send" />
                </div>
              </div>
            </div>
          </div>

        </section>
      </form>

    );
  }

}