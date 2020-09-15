import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectronService } from 'app/core/services';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  timerHandle: any = null;
  mins: number = 0;

  txt: string = null;
  status: string = "green";

  constructor(private route: ActivatedRoute, private router: Router,  private es: ElectronService) {
      let m = this.route.snapshot.paramMap.get("mins");
      if(m && m!=null && m.trim().length>0){
        this.mins = parseInt(m);
      }else{
        this.mins = 0;
      }
   }

  ngOnInit(): void {
    let countDownDate = new Date();
    countDownDate.setMinutes(countDownDate.getMinutes() + this.mins);

    this.timerHandle = setInterval(()=>{
        let now = Date.now();

        let remaining = countDownDate.getTime() - now;
        let hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        this.txt = hours + "h " + minutes + "m " + seconds + "s ";

        if(remaining<0){
            clearInterval(this.timerHandle);
            this.status = "red";
            this.txt = "Time's Up!"
        }

    },1000);
  }

  stopCountDown(){
    if(this.timerHandle && this.timerHandle!=null){
      this.status = "red";
      this.txt = "Stopped!";
      clearInterval(this.timerHandle);
      this.timerHandle=null;
      setTimeout(()=>{
          this.router.navigate(["/config"]);
      },2000);
    }
  }

  back(){
    this.txt=null;
    this.mins=0;
    clearInterval(this.timerHandle);
    this.timerHandle=null;
    this.router.navigate(["/config"]);
  }

  close(){
    let win = this.es.remote.getCurrentWindow()
    win.close();
  }

}
