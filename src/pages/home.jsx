import React, { Component } from 'react';
import instance from '../api/axios_api';
import image1 from "../assets/img1.png";

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        services: [],
        special: [],
      };
    }
  

    componentDidMount() {   
        instance
        .get('web-service-home/')
        .then((res) => {
          this.setState({ services: res.data.RESPONSE });
        })
        .catch((err) => {
          console.log(err);
        });

    instance
        .get('special-service/')
        .then((res) => {
            this.setState({ special: res.data.RESPONSE });
          })
          .catch((err) => {
            console.log(err);
          });
    }
    
    render(){
        const { services , special } = this.state;
    return(
        <>
        <div class="container" style={{marginTop: '3%'}}>
        <div class="row">
            <div class="col-md-12 col-lg-6">
                <div class="container"><img src={image1} style={{ width: '100%'}} /></div>
            </div>
            <div class="col-md-12 col-lg-6">
                <div class="container" style={{marginTop: '7%'}}>
                    <div class="base_header"><span><small class="bor_header_left"></small>Welcome to CarMeet: A Community for Car Enthusiasts<small class="bor_header_right"></small></span>
                        <h3>Meet the perfect driver and their car</h3>
                    </div>
                    <div class="base_footer">
                        <p>There is no better place to find someone with the perfect car. Race with them, just meet up to compare cars or just go for a drive together</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <br />
        </>
    );
    }
}

export default Home