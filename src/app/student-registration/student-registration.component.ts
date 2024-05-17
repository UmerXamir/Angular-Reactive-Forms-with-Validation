import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from  '@angular/common/http';
@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit, AfterViewInit{
 
  registrationForm: FormGroup= new FormGroup({
    firstName: new FormControl('',[Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('',[Validators.required, Validators.minLength(2)]),
    fullName: new FormControl(''),
    DOB: new FormControl(''),
    age: new FormControl(''),
    licenseNumber:new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    identityType:new FormControl(''),
    idCardNo: new FormControl(''),

  })

  constructor(private http: HttpClient){}

  //runs when page loads
  ngOnInit(): void {
    this.registrationForm.controls['firstName'].valueChanges.subscribe((res)=>
    {
      this.creteFullName()
    })

    this.registrationForm.controls['lastName'].valueChanges.subscribe(res=>{
      this.creteFullName()
    })
  }

  ngAfterViewInit(): void {
    this.registrationForm.controls['DOB'].valueChanges.subscribe((res)=>{
      const selectedDOB = new Date(res)
      const dobYear = selectedDOB.getFullYear()
      const currentYear = new Date().getFullYear()
      const age = currentYear - dobYear;
      this.registrationForm.controls['age'].setValue(age)

      if(age>18){
        this.registrationForm.controls['licenseNumber'].setValidators(Validators.required)
      }
      else{
        this.registrationForm.controls['licenseNumber'].removeValidators(Validators.required)
      }
      this.registrationForm.controls['country'].valueChanges.subscribe((res)=>{
        if(res==='Pakistan'){
          this.registrationForm.controls['state'].setValidators(Validators.required)
        }
        else{
          this.registrationForm.controls['state'].removeValidators(Validators.required)
        }

      })
    })
  }


  creteFullName(){
    const fullName = this.registrationForm.controls['firstName'].value +' '
    + this.registrationForm.controls['lastName'].value 

    this.registrationForm.controls['fullName'].setValue(fullName
    )
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    const data = this.registrationForm.value;
    this.http.post('https://jsonplaceholder.typicode.com/users', data).subscribe((res) => {
      alert('User Registered');
    });
    console.log(data);
    setTimeout(() => {
      window.location.reload()
    }, 2000);
    
  }
  private markAllAsTouched() {
    this.registrationForm.markAllAsTouched();
  }
 
}
 