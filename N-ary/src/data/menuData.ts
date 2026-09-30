export interface MenuNode {
  title: string;
  link: string;
  component: string;
  children?: MenuNode[];
}

export const menuTree: MenuNode[] = [
  { title: "Profile", link: "/profile", component: "ProfileComponent" },
  { title: "Messages", link: "/messages", component: "MessagesComponent" },
  {
    title: "Settings",
    link: "#",
    component: "SettingsWrapper",
    children: [
      {
        title: "Account",
        link: "/settings/account",
        component: "AccountComponent",
      },
      {
        title: "Profile",
        link: "/settings/profile",
        component: "ProfileSettingsComponent",
      },
      {
        title: "Security & Privacy",
        link: "/settings/security",
        component: "SecurityComponent",
      },
      {
        title: "Password",
        link: "/settings/password",
        component: "PasswordComponent",
      },
      {
        title: "Notification",
        link: "/settings/notification",
        component: "NotificationComponent",
      },
    ],
  },
  {
    title: "Help",
    link: "#",
    component: "HelpWrapper",
    children: [
      { title: "FAQ's", link: "/help/faqs", component: "FaqsComponent" },
      {
        title: "Submit a Ticket",
        link: "/help/ticket",
        component: "TicketComponent",
      },
      {
        title: "Network Status",
        link: "/help/network",
        component: "NetworkComponent",
      },
    ],
  },
  { title: "Logout", link: "/logout", component: "LogoutAction" },
];
