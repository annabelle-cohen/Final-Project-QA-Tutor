import React, { Component} from 'react'
import { connect } from 'react-redux'

export class SignInToAAPWithPassword extends Component{

    showDetails(){
        console.log(this.props.authAAP.userAAP)
    }

    render(){
        
        return(
           <div>
            <div>{this.props.authAAP.userAAP.email}</div>
            {this.showDetails()}
            </div>
        );

    }


}


const mapStateToProps = state => {
  
    return { authAAP: state.authAAP };
  };

  function mapDispatchToProps() {
    return {}
  }

  const SignInToAAPWithPassword1 = connect(mapStateToProps,mapDispatchToProps)(SignInToAAPWithPassword);

export default connect()(SignInToAAPWithPassword1)