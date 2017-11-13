import { FormControl } from '@angular/forms';
import {UserService} from "../providers/user.service";

export class UsernameValidator {

  constructor(private userService: UserService) {
  }

  checkUsername(control: FormControl): any {

    this.userService.getUserByEmail(control.value.toLowerCase()).then(user => {
      return new Promise(resolve => {

        //Fake a slow response from server

        setTimeout(() => {
          if (user) {

            resolve({
              "username taken": true
            });

          } else {
            resolve(null);
          }
        }, 2000);

      });
    });
  }
}
