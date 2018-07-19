import React, { Component } from 'react';
import connectWrapper from '../redux/utils/connect'
import { rootActions as actions } from '../redux/rootReducer'
import MainComponent from '../components/main/mainComponent'
import SidebarComponent from '../components/sidebar/sidebarComponent'
import FilterComponent from '../components/header/headerComponent'

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      selectedView: 'MainComponent'
    }
  };

  navClicked = () => {
    this.setState({isClicked: !this.state.isClicked})
  };

  changeView = (type) => {
    if(type === 'MainComponent') this.setState({selectedView: 'MainComponent'})
  };

  render() {
    const { actions, state } = this.props;
    const main = state.map.toJS();

    return (
      <div className="App">
        <div id="sidebarToggle" className={this.state.isClicked ? 'nav-md' : 'nav-sm'}>
          <div className="container body">
            <div className="main_container">

              <SidebarComponent
                changeView={this.changeView}
              />

              <FilterComponent
                navClicked={this.navClicked}
              />

              {
                this.state.selectedView === 'MainComponent' && <MainComponent
                  main={main}
                  actions={actions}
                />
              }

            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connectWrapper(actions, AppLayout);
