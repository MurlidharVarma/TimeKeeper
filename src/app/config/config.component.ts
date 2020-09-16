import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ElectronService } from 'app/core/services';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private es: ElectronService, private fb: FormBuilder) {
    this.form = this.fb.group({
      mins: [null, Validators.compose([Validators.required, Validators.min(1), Validators.max(86400)])]
    })
  }

  ngOnInit(): void {
  }

  startCountDown(){
    if(this.form.valid){
      this.router.navigate(['timer',this.form.get("mins").value])
    }else{
      this.form.markAsDirty();
    }
  }

  close(){
    let win = this.es.remote.getCurrentWindow()
    win.close();
  }
}
