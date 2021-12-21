import { FormBuilder, Validators } from '@angular/forms';
import { ServerForm } from './server.form';

export class TriggerForm {
  constructor(private _formBuilder: FormBuilder) {}

  public InitForm() {
    return this._formBuilder.group({
      // server: ['', [Validators.required]],
      // releaseKey: ['', [Validators.required]],
      // triggerName: [null, [Validators.required]],
      // version: ['', [Validators.required]],
      // loginUrl: ['', [Validators.required]],
      // releasesUrl: ['', [Validators.required]],
      // startJobUrl: ['', [Validators.required]],
      // processName: ['', [Validators.required]],
      // tenancyName: ['', [Validators.required]],

      // processInputs: new FormBuilder().array([]),

      server: new ServerForm.CreateServer(this._formBuilder).InItForm(),
      releaseKey: ['', [Validators.required]],
      triggerName: [null, [Validators.required]],
      processName: ['', [Validators.required]],
      tenancyName: ['', [Validators.required]],

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
