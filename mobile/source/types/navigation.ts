import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  CreateRoom: undefined;
  JoinRoom: undefined;
  ChoosePseudo?: { shouldCreateRoom: boolean };
  ChooseRoom: { playerId: number };
  ChooseAvatar: { playerId: number; shouldCreateRoom: boolean };
  ChooseRoomMode: undefined;
  PendingRoom: {
    screen: string;
    params: Record<string, unknown>;
    roomCode?: string;
  };
  PlayingRoom: {
    screen: string;
    params: Record<string, unknown>;
    roomCode?: string;
  };
  EndedRoom: { roomCode: string };
  Rules: undefined;
  RoomInfos: { roomCode: string; routeName: keyof RootStackParamList };
  RoomPlayers: { roomCode: string; routeName: keyof RootStackParamList };
  RoomMissions: { roomCode: string; routeName: keyof RootStackParamList };
  RoomSettings: { roomCode: string; routeName: keyof RootStackParamList };
  PlayerModal: {
    player: {
      id: number;
      name: string;
      avatar: string;
      hasAtLeastOneMission: boolean;
      roomCode: string;
      status: string;
    };
  };
  PlayingRoomInfos: { roomCode: string; routeName: keyof RootStackParamList };
};

export type StackNavigation = NativeStackNavigationProp<RootStackParamList>;
