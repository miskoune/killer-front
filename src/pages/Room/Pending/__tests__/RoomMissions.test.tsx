import { screen } from '@testing-library/react';
import { sources } from 'eventsourcemock';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ROOM_TOPIC } from '@/constants/endpoints';
import { RoomMissions } from '@/pages/Room/Pending/RoomMissions';
import { renderWithProviders } from '@/tests/utils';

describe('<RoomMissions />', () => {
  it('should show the count of all missions in the room', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL']}>
        <Routes>
          <Route path="/room/:roomCode" element={<RoomMissions />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('There is currently 5 missions in this room.'),
    ).toBeInTheDocument();
  });

  it('should update the count of all missions in the room when SSE emits a new message', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7JKL']}>
        <Routes>
          <Route path="/room/:roomCode" element={<RoomMissions />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('There is currently 2 missions in this room.');

    const messageEvent = new MessageEvent('message');

    const missionsEventSource = `${ROOM_TOPIC}/X7JKL/mission/{id}`;

    sources[missionsEventSource].emit(messageEvent.type, messageEvent);

    expect(
      await screen.findByText('There is currently 3 missions in this room.'),
    ).toBeInTheDocument();

    sources[missionsEventSource].close();
  });
});
