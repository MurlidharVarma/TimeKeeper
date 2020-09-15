import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'app/core/services';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  mins: number = 2;
  
  constructor(private router: Router, private es: ElectronService) { }

  ngOnInit(): void {
  }

  startCountDown(){
    this.router.navigate(['timer',this.mins])
  }

  close(){
    let win = this.es.remote.getCurrentWindow()
    win.close();
  }
}
