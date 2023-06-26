/**
 * @format
 */

import {AppRegistry, View, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import { RecoilRoot } from 'recoil';

const RecoilApp = () => {
    return (
      <>
        <RecoilRoot>
          {/* React Suspence is we data  take too long he will show looding until data defined */}
          <React.Suspense
            fallback={
              <View>
                <Text>loading .......</Text>
              </View>
            }>
            <App />
          </React.Suspense>
        </RecoilRoot>
      </>
    );
  };

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => RecoilApp);
