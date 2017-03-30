import { HomePage } from './home/home';
import { SettingsPage } from './settings/settings';
import { TutorialPage } from './tutorial/tutorial';
import { WelcomePage } from './welcome/welcome';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = TutorialPage;
// The main page the user will see as they use the app over a long period of time.
export const MainPage = HomePage;
//individual pages
export {
    SettingsPage, WelcomePage, HomePage, TutorialPage
}
//all pages array
export const Pages: any[] = [
    SettingsPage,
    WelcomePage,
    HomePage,
    TutorialPage
]
