import { Injectable, Optional } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SettingsModel } from '../model/models';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class SettingsProvider {
  private SETTINGS_KEY: string = '_settings';

  settings: SettingsModel;

  private _defaults: SettingsModel;

  constructor(private storage: Storage, @Optional() defaults: SettingsModel) {
    this._defaults = defaults || {};
    storage.ready().then(() => { });
  }

  /**
   * load the storage
   */
  load() {
    return this.storage.get(this.SETTINGS_KEY).then((value) => {
      if (value) {
        this.settings = value;
        this._mergeDefaults(this._defaults);
      } else {
        return this.setAll(this._defaults).then((val) => {
          this.settings = val;
        })
      }
    });
  }

  /**
   * Add the defaults into settings not overwritting and save
   * @param defaults 
   */
  private _mergeDefaults(defaults: any) {
    for (let k in defaults) {
      if (!(k in this.settings)) {
        this.settings[k] = defaults[k];
      }
    }
    return this.setAll(this.settings);
  }

  /**
   * Merge the provided settings with the current settings and save
   * @param settings 
   */
  merge(settings: any) {
    for (let k in settings) {
      this.settings[k] = settings[k];
    }
    return this.save();
  }

  /**
   * Add a value in settings and save it
   * @param key 
   * @param value 
   */
  setValue(key: string, value: any) {
    this.settings[key] = value;
    return this.storage.set(this.SETTINGS_KEY, this.settings);
  }

  /**
   * Save the value provided overwritting all the settings
   * @param value 
   */
  setAll(value: any) {
    return this.storage.set(this.SETTINGS_KEY, value);
  }

  getValue(key: string) {
    return this.storage.get(this.SETTINGS_KEY)
      .then(settings => {
        return settings[key];
      });
  }

  save() {
    return this.setAll(this.settings);
  }

  get allSettings() {
    return this.settings;
  }
}
