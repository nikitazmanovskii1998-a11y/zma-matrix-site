export type SiteDictionary = {
  localeLabel: string;
  nav: {
    home: string;
    approach: string;
    projects: string;
    services: string;
    about: string;
    contact: string;
  };
  ui: {
    privacy: string;
    offer: string;
    placeholderNote: string;
  };
  preloader: {
    entering: string;
    stabilizing: string;
  };
  cookies: {
    message: string;
    accept: string;
    decline: string;
  };
  pages: {
    home: { title: string; body: string };
    approach: { title: string; body: string };
    projects: { title: string; body: string };
    services: { title: string; body: string };
    about: { title: string; body: string };
    contact: { title: string; body: string };
    privacy: { title: string; body: string };
    offer: { title: string; body: string };
  };
};
