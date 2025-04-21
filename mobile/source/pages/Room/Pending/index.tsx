/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import { useRoom } from '../../../apis/room/queries';
import { useSession } from '../../../apis/player/queries';

import InfosIcon from '../../../assets/icons/infos.svg';
import MissionIcon from '../../../assets/icons/mission.svg';
import PlayersIcon from '../../../assets/icons/players.svg';
import SettingsIcon from '../../../assets/icons/settings.svg';
import { type RootStackParamList } from '../../../types/navigation';

import { RoomInfos } from './RoomInfos';
import { RoomMissions } from './RoomMissions';
import { RoomPlayers } from './RoomPlayers';
import { RoomSettings } from './RoomSettings';

const Tab = createBottomTabNavigator<RootStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'PendingRoom'>;

export function PendingRoomTabs({ route }: Props): JSX.Element {
  const { roomCode } = route.params;
  const { room } = useRoom(roomCode!);
  const { session } = useSession();

  const shouldDisplayRoomMissions =
    !room?.isGameMastered ||
    (room?.isGameMastered && session?.status === 'SPECTATING');

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
      sceneContainerStyle={{ backgroundColor: '#fdf7f2' }}
    >
      <Tab.Screen
        name="RoomInfos"
        component={RoomInfos}
        initialParams={{
          roomCode: route.params.roomCode,
          routeName: 'PendingRoom',
        }}
        options={{
          tabBarIcon: ({ color }) => <InfosIcon fill={color} />,
          tabBarLabel: 'Informations',
        }}
      />
      {shouldDisplayRoomMissions && (
        <Tab.Screen
          name="RoomMissions"
          component={RoomMissions}
          initialParams={{
            roomCode: route.params.roomCode,
            routeName: 'PendingRoom',
          }}
          options={{
            tabBarIcon: ({ color }) => <MissionIcon fill={color} />,
            tabBarLabel: 'Missions',
          }}
        />
      )}
      <Tab.Screen
        name="RoomPlayers"
        component={RoomPlayers}
        initialParams={{
          roomCode: route.params.roomCode,
          routeName: 'PendingRoom',
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
          routeName: 'PendingRoom',
        }}
        options={{
          tabBarIcon: ({ color }) => <SettingsIcon fill={color} />,
          tabBarLabel: 'Paramètres',
        }}
      />
    </Tab.Navigator>
  );
}
