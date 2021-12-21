import { FormBuilder, Validators } from '@angular/forms';

export class ServerForm {
  static CreateServer = class {
    constructor(private _formBuilder: FormBuilder) {}

    InItForm() {
      return this._formBuilder.group({
        serverName: [null, Validators.required],
        version: [null, Validators.required],
        dbServerName: [null, Validators.required],
        dbName: [null, Validators.required],
        serverIp: [null, Validators.required],
        loginUrl: [null, Validators.required],
        releasesUrl: [null, Validators.required],
        startJobUrl: [null, Validators.required],
        getJobsUrl: [null, Validators.required],

        status: [false, Validators.required],
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
        // lastRestartTime: ['', Validators.required],
        // createdAt: ['', Validators.required],

        uiPathFilePath: [null, Validators.required],
        userName: [null, Validators.required],
        password: [null, Validators.required],

        orchUserName: [null, Validators.required],
        orchPassword: [null, Validators.required],

        dbUserName: [null, Validators.required],
        dbPassword: [null, Validators.required],
      });
    }
  };
}
