import { View, Button } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import store from './src/redux/Store';
import Albums from './src/screens/Albums';
import Photos from './src/screens/Photos';
import DrawerIcon from './src/components/DrawerIcon';
import SortIcon from './src/components/SortIcon';
import DrawerContent from './src/components/DrawerContent';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

export default App = () => {
  const AlbumStack = ({ navigation }) => {
    return (
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
            headerLeft: (props) => <DrawerIcon {...props} navigation={navigation}/>,
            headerRight: (props) => <SortIcon {...props} />,
          }}
        />
        <Stack.Screen 
          name="Photos"
          component={ Photos }
          options={({ route }) => ({ 
            title: route.params.title,
            headerBackTitle: 'Albums',
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
    );
  }
  
  const ScreenB = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }

  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName="AlbumStack"
          screenOptions={{
            header: () => <View style={{height: 40, backgroundColor: '#2196f3'}}/>,
          }}
          drawerContent={props => <DrawerContent {...props}/>}
        >
          <Drawer.Screen name="AlbumStack" component={AlbumStack} initialParams={{ title: "Albums" }}/>
          <Drawer.Screen name="ScreenB" component={ScreenB} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
