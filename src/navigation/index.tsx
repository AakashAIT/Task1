import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/HomeScreen';
import { Settings } from '../screens/SettingsScreen';
import { NotFound } from '../screens/NotFound';
import { ProfileScreen } from '../screens/ProfileScreen';
import { NotificationScreen } from '../screens/NotificationScreen';
import { HelpScreen } from '../screens/HelpScreen';
import { SearchScreen } from '../screens/SearchScreen';
const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: Home,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        headerShown: false,
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
     Profile: {
      screen: ProfileScreen,
      options: {
        title: 'Profile',
        headerShown: false,
      },
    },
    Notification: {
      screen: NotificationScreen,
      options: {
        title: 'Notification',
        headerShown: false,
      },
    },
    Help: {
      screen: HelpScreen,
      options: {
        title: 'HelpScreen',
        headerShown: false,
      },
    },
    Search: {
      screen: SearchScreen,
      options: {
        title: 'Search Screen',
        headerShown: false,
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
