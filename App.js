import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CountdownListScreen from './src/screens/CountdownListScreen';
import CountdownDetailScreen from './src/screens/CountdownDetailScreen';
import CreateCountdownScreen from './src/screens/CreateCountdownScreen';
import UpdateCountdownScreen from './src/screens/UpdateCountdownScreen';
import CalendarScreen from './src/screens/CalendarScreen'

import { Provider as CountdownProvider } from './src/context/CountdownContext'

const navigator = createStackNavigator({
  CountdownList: CountdownListScreen,
  CountdownDetail: CountdownDetailScreen,
  CreateCountdown: CreateCountdownScreen,
  UpdateCountdown: UpdateCountdownScreen,
  Calendar: CalendarScreen
},
  {
    initialRouteName: 'CountdownList',
    defaultNavigationOptions: {
      title: 'Event List'
    }
  }); //2nd parameter is for setting default page when the app start up

const App = createAppContainer(navigator);

export default () => {
  return (
    <CountdownProvider>
      <App />
    </CountdownProvider>
  );
};


