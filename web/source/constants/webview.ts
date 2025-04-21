import InstagramLogo from '@/assets/images/instagram.png';
import MessengerLogo from '@/assets/images/messenger.png';
import TwitterLogo from '@/assets/images/twitter.png';

export enum WebViewApp {
  Messenger = 'Messenger',
  Instagram = 'Instagram',
  Twitter = 'Twitter',
}

export const AppLogo: Record<string, string> = {
  Messenger: MessengerLogo,
  Instagram: InstagramLogo,
  Twitter: TwitterLogo,
};

export const TWITTER_WEBVIEW_URL = 'https://t.co';
