import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { type Session } from '../apis/player/types';
import { ROOM_PAGE_NAME } from '../constants/routes';
import { ChooseAvatar } from '../pages/ChooseAvatar';
import { ChoosePseudo } from '../pages/ChoosePseudo';
import { ChooseRoom } from '../pages/ChooseRoom';
import { ChooseRoomMode } from '../pages/ChooseRoomMode';
import { HomePage } from '../pages/Home';
import { EndedRoomPage } from '../pages/Room/Ended';
import { PendingRoomTabs } from '../pages/Room/Pending';
import { PlayerModal } from '../pages/Room/Pending/RoomPlayers/PlayerModal';
import { PlayingRoomTabs } from '../pages/Room/Playing';
import { Rules } from '../pages/Rules';
import { type RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  session: Session | null;
}

export function Routes({ session }: Props): JSX.Element {
  const currentRouteName = (
    session?.room?.status ? ROOM_PAGE_NAME[session.room.status] : 'Home'
  ) as keyof RootStackParamList;

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: '#fdf7f2' },
        contentStyle: { backgroundColor: '#fdf7f2' },
        headerShown: false,
      }}
      initialRouteName={currentRouteName}
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen
        name="ChoosePseudo"
        component={ChoosePseudo}
        options={{
          animation: 'slide_from_bottom',
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="ChooseRoom"
        component={ChooseRoom}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ChooseAvatar"
        component={ChooseAvatar}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ChooseRoomMode"
        component={ChooseRoomMode}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="PendingRoom"
        component={PendingRoomTabs}
        initialParams={{ roomCode: session?.room?.id }}
      />
      <Stack.Screen
        name="PlayingRoom"
        component={PlayingRoomTabs}
        initialParams={{ roomCode: session?.room?.id }}
      />
      <Stack.Screen
        name="EndedRoom"
        component={EndedRoomPage}
        initialParams={{ roomCode: session?.room?.id }}
      />
      <Stack.Screen
        name="Rules"
        component={Rules}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="PlayerModal"
        component={PlayerModal}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
