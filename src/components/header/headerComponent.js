import React from 'react'
import PropTypes from 'prop-types'
import img from '../../images/admin.png';

export default class HeaderComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    }
  };

  static propTypes = {
    navClicked: PropTypes.func.isRequired
  };

  filterChanged = () => {
    this.setState({isClicked: !this.state.isClicked})
  };

  render () {
    return (
      <div className='filter__component'>
        <div className="top_nav">
          <div className="nav_menu">
            <nav>
              <div id="sidebarBtn" className="nav toggle">
                <a id="menu_toggle"><i className="fa fa-bars"></i></a>
              </div>

              <ul className="nav navbar-nav navbar-right">
                <li className="">
                  <a onClick={this.filterChanged} className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src={img} alt={img} />
                    <span className=" fa fa-angle-down"></span>
                  </a>
                  <ul style={{display: this.state.isClicked ? 'block': 'none'}} className="dropdown-menu dropdown-usermenu pull-right">
                    <li><a href="#"> Profile</a></li>
                    <li><a href="#"><i className="fa fa-sign-out pull-right"></i> Log Out</a></li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}