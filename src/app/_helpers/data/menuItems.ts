export interface MenuItem {
  id: string;
  icon: string;
  name: string;
  url: string;
  description: string;
}

export const MenuItems: MenuItem[] = [
  {
    id: '1',
    icon: 'home',
    name: 'Home',
    url: '/home',
    description: 'Home Page',
  },
  {
    id: '2',
    icon: 'dashboard',
    name: 'Dashboard',
    url: '/dashboard',
    description: 'Dashboard Page',
  },
  {
    id: '3',
    icon: 'person',
    name: 'Profile',
    url: '/profile',
    description: 'Profile Page',
  },
  {
    id: '4',
    icon: 'settings',
    name: 'Settings',
    url: '/settings',
    description: 'Settings Page',
  },
  {
    id: '5',
    icon: 'help',
    name: 'Help',
    url: '/help',
    description: 'Help Page',
  },
  {
    id: '6',
    icon: 'exit_to_app',
    name: 'Logout',
    url: '/logout',
    description: 'Logout Page',
  },
];
