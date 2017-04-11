import { HomePage } from './home/home';
import { SettingsPage } from './settings/settings';
import { TutorialPage } from './tutorial/tutorial';
import { WelcomePage } from './welcome/welcome';
import { InvitedPage } from './invited/invited'
import { ConfigsPage } from './configs/configs'
import { ContactsPage } from './contacts/contacts'
import { TabsPage } from "./tabs/tabs";
import { NearbyPage } from "./nearby/nearby";

// The page the user lands on after opening the app and without a session
export const FirstRunPage = TutorialPage;
// The main page the user will see as they use the app over a long period of time.
export const MainPage = TabsPage;
//individual pages
export {
    SettingsPage, WelcomePage, HomePage, TutorialPage, InvitedPage, ConfigsPage, ContactsPage, TabsPage, NearbyPage
}
//all pages array
export const AllPages: any[] = [
    SettingsPage,
    WelcomePage,
    HomePage,
    TutorialPage, 
    InvitedPage,
    ConfigsPage,
    ContactsPage,
    TabsPage,
    NearbyPage
]
