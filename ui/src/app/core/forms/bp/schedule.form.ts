import { FormBuilder, Validators } from '@angular/forms';

export class ScheduleForm {
  constructor(private _formBuilder: FormBuilder) {}

  public InitForm() {
    return this._formBuilder.group({
      trigger: ['', [Validators.required]],
      scheduleName: [null, [Validators.required]],
      recurringType: ['', [Validators.required]],
      occurOnceDateTime: [null],
      recurringTime: [null],
      recurringStartDate: [null],
      recurringEndDate: [null],
      userName: [
        (<IUser>JSON.parse(sessionStorage.getItem('userToken') || '').user)
          .username,
        [Validators.required],
      ],
    });
  }
}
