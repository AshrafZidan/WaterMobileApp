import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';

  constructor(private translate: TranslateService, private storage: Storage, private plt: Platform) { }

  setInitialAppLanguage() {
    // let language = this.translate.getBrowserLang();
    let language = 'ar';

    this.translate.setDefaultLang(language);

        //get from backend
    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });

    return language;
  }

  getLanguages() {
    return [
      { text: 'English', value: 'en', img: 'assets/img/en.png' },
      { text: 'Arabic', value: 'ar', img: 'assets/img/ar.png' },
    ];
  }

  setLanguage(lng) {
    this.translate.use(lng);
    this.selected = lng;
    this.storage.set(LNG_KEY, lng);
  }
}