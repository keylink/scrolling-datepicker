import React from 'react'
import PropTypes from 'prop-types';
import img from '../../images/admin.png';

export default class SidebarComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  };

  static propTypes = {
    changeView: PropTypes.func.isRequired
  };

  render () {
    return (
      <div>
        <div className="col-md-3 left_col">
          <div className="left_col scroll-view">
            <div className="navbar nav_title">
              <span className="site_title"><i className="fa fa-paw"></i> <span>React view</span></span>
            </div>
            <div className="clearfix"></div>
            <div className="profile clearfix">
              <div className="profile_pic">
                <img className="img-circle profile_img" src={img} alt={img}/>
              </div>
              <div className="profile_info">
                <span>Welcome</span>
                <h2 className="profile__username">Admin</h2>
              </div>
              <div className="clearfix"></div>
            </div>
            <h3 className="sidebar__title-menu">General</h3>
            <ul className="nav side-menu">
              <li>
                <a onClick={() => this.props.changeView('MainComponent')}><i className="fa fa-home"></i> Home </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
    )
  }
}