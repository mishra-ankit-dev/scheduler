import { FormBuilder, Validators } from '@angular/forms';
import { ServerForm } from './server.form';

export class TriggerForm {
  constructor(private _formBuilder: FormBuilder) {}

  public InitForm() {
    return this._formBuilder.group({
      // server: ['', [Validators.required]],
      // triggerName: [null, [Validators.required]],
      // aeVersion: ['', [Validators.required]],
      // listenerUrl: ['', [Validators.required]],
      // processName: ['', [Validators.required]],
      // profileName: ['', [Validators.required]],
      // processExpirationTime: ['', [Validators.required]],

      // processInputs: new FormBuilder().array([]),

      server: new ServerForm.CreateServer(this._formBuilder).InItForm(),
      triggerName: [null, [Validators.required]],
      processName: ['', [Validators.required]],
      profileName: ['', [Validators.required]],
      processExpirationTime: ['', [Validators.required]],

      processInputs: new FormBuilder().array([]),
    });
  }

  public initProcessInputRows(name: string, value: string) {
    return this._formBuilder.group({
      name: [name, Validators.required],
      value: [value],
    });
  }
}
