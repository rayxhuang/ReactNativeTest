import store from './src/redux/Store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Albums from './src/screens/Albums';
import Photos from './src/screens/Photos';
import SortIcon from './src/components/SortIcon';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Albums"
            component={ Albums }
            options={{
              headerStyle: {
                backgroundColor: '#2196f3',
              },
              headerTitleStyle: {
                color: 'white',
              },
              headerRight: (props) => <SortIcon {...props} />,
            }}
          />
          <Stack.Screen 
            name="Photos"
            component={ Photos }
            options={({ route }) => ({ 
              title: route.params.title,
              headerStyle: {
                backgroundColor: '#2196f3',
              },
              headerTitleStyle: {
                color: 'white',
              },
              headerTintColor: 'white'
             })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
