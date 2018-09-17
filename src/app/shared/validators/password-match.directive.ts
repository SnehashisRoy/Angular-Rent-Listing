import { ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    if(!control.get('password2').value){
        return null;

    }
    if(control.get('password1').value !== control.get('password2').value){
        return {notMatched: true};
    }

    return null;
    
  };