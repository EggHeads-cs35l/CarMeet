import React , {Component} from 'react';
import image1 from "./img1.png";
import instance from './axios_api';

class Home extends Component {
    /*constructor(props) {
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
    }*/
    
    render(){
        //const { services , special } = this.state;
    return(
        <>
        console.log("HIRED");
        <h1 id="CarMeet">Welcome to CarMeet</h1>
        <div class="container">
        <div class="row">
                <div class="container"><img src={image1} style={{ width: '100%'}} /></div>
                <div class="container">
                    <div class="base_header"><span><small class="bor_header_left"></small>Welcome to CarMeet: A Community for Car Enthusiasts<small class="bor_header_right"></small></span>
                        <h1>Meet the perfect driver and their car</h1>
                    </div>
                    <div class="base_footer">
                        <p>There is no better place to find someone with the perfect car. Race with them, just meet up to compare cars or just go for a drive together</p>
                    </div>
                </div>
        </div>
    </div>
        <br />
        <div class="page: ">
            <body>
                <h2>TESTING</h2>
            </body>
        </div>
        </>
    );
    }
}

export default Home