import { FormBuilder, Validators } from '@angular/forms';

export class ServerForm {
  static CreateServer = class {
    constructor(private _formBuilder: FormBuilder) {}

    InItForm() {
      return this._formBuilder.group({
        serverName: [null, Validators.required],
        aeVersion: [null, Validators.required],
        dbServerName: [null, Validators.required],
        dbName: [null, Validators.required],
        serverIp: [null, Validators.required],
        aeSiteUrl: [null, Validators.required],
        listenerUrl: [null, Validators.required],
        messagingUrl: [null, Validators.required],
        createdBy: [
          (<IUser>JSON.parse(sessionStorage.getItem('userToken') || '').user)
            .id,
          Validators.required,
        ],
        owner: [
          (<IUser>JSON.parse(sessionStorage.getItem('userToken') || '').user)
            .id,
          Validators.required,
        ],
        lastEditedBy: [
          (<IUser>JSON.parse(sessionStorage.getItem('userToken') || '').user)
            .id,
          Validators.required,
        ],

        aeSite: [false, [Validators.required]],
        listener: [false, [Validators.required]],
        messaging: [false, [Validators.required]],
        controlTower: [false, [Validators.required]],
        etl: [false, [Validators.required]],

        aeFilePath: [null, Validators.required],
        userName: [null, Validators.required],
        password: [null, Validators.required],
      });
    }
  };
}
