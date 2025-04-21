import Avenger from '../assets/avatars/avenger.svg';
import Beach from '../assets/avatars/beach.svg';
import Captain from '../assets/avatars/captain.svg';
import Football from '../assets/avatars/football.svg';
import Gladiator from '../assets/avatars/gladiator.svg';
import Jedi from '../assets/avatars/jedi.svg';
import Milk from '../assets/avatars/milk.svg';
import Pirate from '../assets/avatars/pirate.svg';
import Samurai from '../assets/avatars/samurai.svg';
import Surf from '../assets/avatars/surf.svg';

interface AvatarList {
  height: number;
  width: number;
}

export const avatarsList = ({
  height,
  width,
}: AvatarList): Record<string, JSX.Element> => ({
  avenger: <Avenger height={height} width={width} />,
  beach: <Beach height={height} width={width} />,
  captain: <Captain height={height} width={width} />,
  football: <Football height={height} width={width} />,
  gladiator: <Gladiator height={height} width={width} />,
  jedi: <Jedi height={height} width={width} />,
  milk: <Milk height={height} width={width} />,
  pirate: <Pirate height={height} width={width} />,
  samurai: <Samurai height={height} width={width} />,
  surf: <Surf height={height} width={width} />,
});

export function getRandomAvatar(): string {
  const avatars = Object.keys(avatarsList({ height: 100, width: 100 }));
  const randomIndex = Math.floor(Math.random() * avatars.length);

  return avatars[randomIndex];
}
