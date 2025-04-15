import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import { classNames } from '@/helpers/utils';

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={classNames('absolute left-0 top-full flex justify-center')}>
    <NavigationMenuPrimitive.Viewport
      className={classNames(
        `
        origin-top-center relative mt-1.5 
        h-[var(--radix-navigation-menu-viewport-height)] 
        w-full rounded-md 
        data-[state=open]:animate-in 
        data-[state=closed]:animate-out 
        md:w-[var(--radix-navigation-menu-viewport-width)]
      `,
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={classNames(
      `
      relative z-10 flex max-w-max 
      flex-1 items-center justify-center
    `,
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));

NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={classNames(
      `group flex flex-1 list-none 
      items-center justify-center space-x-1`,
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(`
  group inline-flex h-10 w-max 
  items-center justify-center 
  rounded-md px-4 py-2 
  text-sm font-medium 
  transition-colors 
  text-white 
  hover:bg-white/10
  focus:outline-none
`);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={classNames(navigationMenuTriggerStyle(), 'group', className)}
    {...props}
  >
    {children}
    <ChevronDown
      className={classNames(`
        relative top-[1px] ml-1 h-3 w-3 
        transition duration-200 
        group-data-[state=open]:rotate-180
      `)}
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={classNames(
      `left-0 top-0 w-full rounded-md
      bg-white/10
    `,
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={classNames(
      `
      top-full z-[1] flex h-1.5 
      items-end justify-center overflow-hidden 
    `,
      className,
    )}
    {...props}
  >
    <div
      className={classNames(`
      relative top-[60%] h-2 w-2 
      rotate-45 rounded-tl-sm 
      bg-border shadow-md
    `)}
    />
  </NavigationMenuPrimitive.Indicator>
));

NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={classNames(
            `
            block select-none cursor-pointer 
            space-y-1 rounded-md p-2 
            leading-none no-underline 
            outline-none transition-colors
           hover:bg-white/10
          `,
            className,
          )}
          {...props}
        >
          <div
            className={classNames(`
            text-m font-medium leading-none
          `)}
          >
            {title}
          </div>
          <p
            className={classNames(`
            line-clamp-2 text-sm 
            leading-snug text-muted-foreground
          `)}
          >
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = 'ListItem';

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  ListItem,
};
