import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Settings } from '../../providers/settings';
import { UserProvider } from "../../providers/user";
import { SettingsModel } from "../../model/settings-model";
import { UserModel } from "../../model/user-model";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  mask_phone = {
    mask: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    guide: false,
    showMask: false
  }

  // Our local settings object
  localSettings: SettingsModel;
  // Our local user settings object
  localProfile: UserModel;
  settingsReady = false;
  profileReady = false;
  form: FormGroup;

  profileNavSettings = {
    page: 'profile',
    pageTitle: 'Perfil'
  };

  page: string = 'main';
  pageTitle: string = 'Configurações';

  subSettings: any = SettingsPage;

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public userProvider: UserProvider,
    public formBuilder: FormBuilder,
    public navParams: NavParams) {
  }

  get radius() {
    return this.form.value.searchRadius;
  }

  _buildFormSettings() {
    let group: any = {
      searchRadius: [this.localSettings.searchRadius],
      geofances: [this.localSettings.geofances],
      notifications: [this.localSettings.notifications],
      promotions: [this.localSettings.promotions],
    };

    this.form = this.formBuilder.group(group);

    // Watch the form for changes
    this.form.valueChanges
      .debounceTime(850)
      .distinctUntilChanged()
      .subscribe((v) => {
        this.settings.merge(v);
      });
  }

  _buildFormProfile() {
    let group: any = {
      displayName: [this.localProfile.displayName],
      gender: [this.localProfile.gender],
      telephone: [this.localProfile.telephone]
    };

    this.form = this.formBuilder.group(group);

    // Watch the form for changes
    this.form.valueChanges
      .debounceTime(850)
      .distinctUntilChanged()
      .subscribe((v) => {
        //workarounds
        if (v.telephone === "(")
          v.telephone = "";
        if (v.telephone.length > this.mask_phone.mask.length) {
          v.telephone = (<string>v.telephone).substring(0, this.mask_phone.mask.length);
        }
        this.userProvider.merge(v);
      });
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitle = this.navParams.get('pageTitle') || this.pageTitle;

    switch (this.page) {
      case 'main':
        this.settings.load().then(() => {
          this.settingsReady = true;
          this.localSettings = this.settings.allSettings;
          this._buildFormSettings();
        });
        break;
      case 'profile':
        this.userProvider.loadUser().then(() => {
          this.profileReady = true;
          this.localProfile = this.userProvider.user;
          this._buildFormProfile();
        });
        break;
    }
  }

}
