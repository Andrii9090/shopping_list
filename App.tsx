import React, { useState } from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { Navbar } from './src/components/navbar/Navbar.component';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenName from './src/screensName';
import { Lists } from './src/components/list/Lists.component';
import { Items } from './src/components/item/Items.component';
import { UserProfile } from './src/components/user/UserProfile.component';
import { ForgotPassword } from './src/components/user/ForgotPassword.component';
import { RegistrationForm } from './src/components/user/RegistrationForm.component';
import { LoginForm } from './src/components/user/LoginForm.component';
import { getAuthToken } from './src/helpers';
import TokenContext from './src/contexts/token.context';
import { Splash } from './src/components/Splash.component';
const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
    const [token, setToken] = useState(getAuthToken())
    const [isLoadingApp, setIsLoadingApp] = useState(true)

    return (
            <SafeAreaView
                style={{
                    flex: 1,
                }}
            ><StatusBar
                    animated={true}
                    backgroundColor="rgb(222, 222, 222)"
                    barStyle="dark-content"
                    hidden={false}
                />
                <TokenContext.Provider value={{ token, setToken, isLoadingApp, setIsLoadingApp }} >
                    <NavigationContainer>
                        <View style={{ flexGrow: 8, justifyContent: 'space-between' }}>
                            <RootStack.Navigator initialRouteName={ScreenName.Splash} screenOptions={{ headerShown: false }}>
                                <RootStack.Screen name={ScreenName.Splash} component={Splash} />
                                {!token ? <>
                                    <RootStack.Screen name={ScreenName.Login} component={LoginForm} />
                                    <RootStack.Screen name={ScreenName.Lists} component={Lists} />
                                    <RootStack.Screen name={ScreenName.UserProfile} component={UserProfile} />
                                    <RootStack.Screen name={ScreenName.Registration} component={RegistrationForm} />
                                    <RootStack.Screen name={ScreenName.ForgotPassword} component={ForgotPassword} />

                                </> :
                                    <>
                                        <RootStack.Screen name={ScreenName.Lists} component={Lists} />
                                        <RootStack.Screen name={ScreenName.Login} component={LoginForm} />
                                        <RootStack.Screen name={ScreenName.ListItems} component={Items} />
                                        <RootStack.Screen name={ScreenName.UserProfile} component={UserProfile} />
                                        <RootStack.Screen name={ScreenName.ForgotPassword} component={ForgotPassword} />
                                    </>
                                }
                            </RootStack.Navigator>
                        </View>
                        {!isLoadingApp && <View style={{ flexGrow: 0 }}>
                            <Navbar />
                        </View>
                        }
                    </NavigationContainer>
                </TokenContext.Provider>
            </SafeAreaView>
    )
}

