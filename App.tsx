import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { EnterScreen } from './screens/EnterScreen';
import { ViewScreen } from './screens/ViewScreen';
import { MenuItem } from './util/types';

const Stack = createStackNavigator();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [preparedMenus, setPreparedMenus] = useState<{ [key: string]: MenuItem[] }>({});

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!loggedInUser ? (
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} onLogin={setLoggedInUser} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home">
              {props => (
                <HomeScreen
                  {...props}
                  user={loggedInUser}
                  menuItems={menuItems}
                  preparedMenus={preparedMenus}
                  onLogout={() => setLoggedInUser(null)}
                />
              )}
            </Stack.Screen>
            {loggedInUser === 'Chef' && (
              <>
                <Stack.Screen name="Enter">
                  {props => (
                    <EnterScreen
                      {...props}
                      menuItems={menuItems}
                      setMenuItems={setMenuItems}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="View">
                  {props => (
                    <ViewScreen
                      {...props}
                      menuItems={menuItems}
                      setMenuItems={setMenuItems}
                      preparedMenus={preparedMenus}
                      setPreparedMenus={setPreparedMenus}
                    />
                  )}
                </Stack.Screen>
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}