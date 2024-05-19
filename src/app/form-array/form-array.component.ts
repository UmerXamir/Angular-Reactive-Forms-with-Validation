import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent {
  
  formData: FormGroup = new FormGroup({
    name: new FormControl(''),
    universityName: new FormControl(''),
    courses: new FormArray([
      new FormGroup({
        courseName: new FormControl(''),
        creditHours: new FormControl('')
      })
    ]),
  })
  
  get courses(): FormArray {

    return this.formData.get('courses') as FormArray;
  }
  
   maxCourse: boolean = false
  onAddCourses(){
    const control = <FormArray>this.formData.controls['courses'];
    control.push(
      new FormGroup({
        courseName: new FormControl(''),
        creditHours: new FormControl('')
        })
    )
    if(control.length >= 5){
      this.maxCourse = true
    }
  }

  removeCourses(index: number){
    const removeCourse = <FormArray>this.formData.controls['courses']
    removeCourse.removeAt(index)
    if(index < 5){
      this.maxCourse = false
    }
  }


  onSubmit(){
    const data = this.formData.value
    console.log('Data:', data)
    this.formData.reset()
  }
}
