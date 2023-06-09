// @flow

import React, { Fragment, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import SoundComponent from './components/common/SoundComponent';
import { ThemeContextProvider } from './ThemeContextProvider';
import ApplicationNavigator from './routes';
import store from './store';
import './config/ReactotronConfig';

const App = (): Object => (
  <Fragment>
    <Provider
      store={store}
    >
      <ThemeContextProvider>
        <ApplicationNavigator />
        <SoundComponent />
      </ThemeContextProvider>
    </Provider>
  </Fragment>
);
export default App;
