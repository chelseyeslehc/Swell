import React, { Component } from 'react';
import { connect } from 'react-redux';
import Request from './Request.jsx';
import Response from './Response.jsx';

import * as actions from '../../actions/actions';

const mapStateToProps = store => ({
 
});

const mapDispatchToProps = dispatch => ({

});

class ReqRes extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return(
      <div style={{'border' : '1px solid black', 'margin' : '3px', 'display' : 'flex', 'flexDirection' : 'column'}}>
        {this.props.content.url}
        {this.props.content.request.method}
        {/* <Request/>
        <Response/> */}
        
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReqRes);