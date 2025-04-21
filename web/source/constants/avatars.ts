import { avatarList } from '@/components/Gallery';

export function getRandomAvatar(): string {
  const avatars = Object.keys(avatarList);
  const randomIndex = Math.floor(Math.random() * avatars.length);

  return avatars[randomIndex];
}
