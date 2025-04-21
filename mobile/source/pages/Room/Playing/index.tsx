/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import { useSession } from '../../../apis/player/queries';

import InfosIcon from '../../../assets/icons/infos.svg';
import PlayersIcon from '../../../assets/icons/players.svg';
import SettingsIcon from '../../../assets/icons/settings.svg';
import { type RootStackParamList } from '../../../types/navigation';
import { RoomPlayers } from '../Pending/RoomPlayers';
import { RoomSettings } from '../Pending/RoomSettings';

import { PlayingRoomInfos } from './RoomInfos';

const Tab = createBottomTabNavigator<RootStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'PlayingRoom'>;

export function PlayingRoomTabs({ route }: Props): JSX.Element {
  const { session } = useSession();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FDF1E6',
          borderTopWidth: 1,
          height: 80,
        },
        tabBarItemStyle: { marginTop: 10, height: 40 },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: '#474D52',
        tabBarInactiveTintColor: '#9299A0',
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="RoomInfos"
    >
      {session && session.status === 'ALIVE' && (
        <Tab.Screen
          name="PlayingRoomInfos"
          component={PlayingRoomInfos}
          initialParams={{
            roomCode: route.params.roomCode,
            routeName: 'PlayingRoom',
          }}
          options={{
            tabBarIcon: ({ color }) => <InfosIcon fill={color} />,
            tabBarLabel: 'Informations',
          }}
        />
      )}
      <Tab.Screen
        name="RoomPlayers"
        component={RoomPlayers}
        initialParams={{
          roomCode: route.params.roomCode,
          routeName: 'PlayingRoom',
        }}
        options={{
          tabBarIcon: ({ color }) => <PlayersIcon fill={color} />,
          tabBarLabel: 'Joueurs',
        }}
      />
      <Tab.Screen
        name="RoomSettings"
        component={RoomSettings}
        initialParams={{
          roomCode: route.params.roomCode,
          routeName: 'PlayingRoom',
        }}
        options={{
          tabBarIcon: ({ color }) => <SettingsIcon fill={color} />,
          tabBarLabel: 'Paramètres',
        }}
      />
    </Tab.Navigator>
  );
}
