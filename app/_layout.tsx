
import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Index from './index';
import Home from './Home';
import ChatRoom from './ChatRoom.jsx';
import { ContextProvider } from './ContextProvider.jsx'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
import { RoleContext } from './ContextProvider.jsx';


export default function RootLayout() {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="index"
        component={Index}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='ChatRoom' component={ChatRoom} />
    </Stack.Navigator>
  );
}


// function WrapLayout() {
//   // const { role, setRole } = useContext(RoleContext);

//   // useEffect(() => {
//   //   const handleRole = async () => {
//   //     const userRole = await AsyncStorage.getItem('userRole');
//   //     if (userRole) {
//   //       setRole(userRole);
//   //     }
//   //   };
//   //   handleRole();
//   // },)

//   return (
//     <Stack.Navigator >
//       <Stack.Screen
//         name="index"
//         component={Index}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="SignUp"
//         component={SignUp}
//         options={{ headerShown: false }}
//       />
//       {/* {role === 'admin' ? (
//         <Stack.Screen name='ChatRoom' component={ChatRoom} />
//       ) : (
//         <Stack.Screen name='Home' component={Home} />
//       )} */}
//       <Stack.Screen name='Home' component={Home} options={{ headerLeftLabelVisible: false }} />
//       <Stack.Screen name='ChatRoom' component={ChatRoom} />
//     </Stack.Navigator>
//   );
// }

// export default function RootLayout() {
//   // return (
//   //   <ContextProvider>
//   //     <WrapLayout />
//   //   </ContextProvider>
//   // )
//   return (
//     <Stack.Navigator >
//       <Stack.Screen
//         name="index"
//         component={Index}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="SignUp"
//         component={SignUp}
//         options={{ headerShown: false }}
//       />
//       {/* {role === 'admin' ? (
//         <Stack.Screen name='ChatRoom' component={ChatRoom} />
//       ) : (
//         <Stack.Screen name='Home' component={Home} />
//       )} */}
//       <Stack.Screen name='Home' component={Home} />
//       <Stack.Screen name='ChatRoom' component={ChatRoom} />
//     </Stack.Navigator>
//   );
// }