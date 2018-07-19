import reduxModule from '../abstract/reduxModule';

const ACTIONS = {
  YEAR_CHANGED: 'yearChanged',
};

class Data extends reduxModule {
  getNamespace () {
    return '[Map]';
  }

  getInitialState () {
    return {
      userData: [],
      userProjectData: [],
      year: ''
    }
  }

  defineActions () {
    const yearChanged = this.createAction(ACTIONS.YEAR_CHANGED);

    return {
      yearChanged
    };
  }

  defineReducers () {
    return {

      [ACTIONS.YEAR_CHANGED]: (state, {payload}) => {

        return state.merge({
          year: payload
        })
      },
    }
  }
}

// eslint-disable-next-line
const data = new Data ();
data.init();
export default data;
