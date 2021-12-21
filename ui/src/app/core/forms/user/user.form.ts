import { FormBuilder, Validators } from '@angular/forms';
import { validateNotTakenByOthers } from 'src/app/core/validators/custom.validator';

export class UserForms {
  public static ConfirmUser(currentUser: IUser) {
    return new FormBuilder().group({
      username: [currentUser.username],
      password: ['', [Validators.required]],
      email: 'amishm766@gmail.com',
    });
  }

  public static EditDetails(currentUser: IUser, allUsers: IUser[]) {
    return new FormBuilder().group({
      id: [{ value: null, disabled: false }],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
        validateNotTakenByOthers(currentUser, allUsers).bind(this),
      ],
      first_name: [''],
      last_name: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$'
          ),
        ],
        validateNotTakenByOthers(currentUser, allUsers).bind(this),
      ],
    });
  }

  public static EditProfile(currentUser: IUser) {
    return new FormBuilder().group({
      user: [currentUser?.id],
      bio: ['', [Validators.maxLength(150)]],
      address: new FormBuilder().group({
        user: [currentUser],
        city: [''],
        state: [''],
        street: [''],
        zip_code: [''],
      }),
      birth_date: [null],
      email_confirmed: [false],
      image: [null],
    });
  }
}
