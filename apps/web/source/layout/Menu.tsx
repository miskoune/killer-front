import { useTranslation } from '@killerparty/intl';

import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/NavigationMenu';
import { languageToLocale, localeToLanguage } from '@/constants/languages';

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleUpdateLanguage = (language: string): void => {
    i18n.changeLanguage(languageToLocale[language]);
    localStorage.setItem('locale', languageToLocale[language]);
  };

  const language = localeToLanguage[i18n.language];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <div className="flex items-center gap-2 justify-center">
              <p>{language}</p>
              {language === 'Français' ? '🇫🇷' : '🇺🇸'}
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-3 md:w-[130px]">
              <ListItem
                onClick={() => handleUpdateLanguage('Français')}
                title="Français 🇫🇷"
              />
              <ListItem
                onClick={() => handleUpdateLanguage('English')}
                title="English 🇺🇸"
              />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
