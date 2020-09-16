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
  remaining: number = 0;

  isPause: boolean = false;

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
    this.ticker(this.mins*60*1000); //converting mins to ms
  }

  pauseResumeCountDown(){
    this.isPause = !this.isPause;
    if(this.isPause){
      if(this.timerHandle && this.timerHandle!=null){
        this.status = "red";
        clearInterval(this.timerHandle);
        this.timerHandle=null;
      }
    }else{
      this.status="green";
      this.ticker(this.remaining);
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

  ticker(ms){
    let countDownDate = new Date();
    countDownDate.setMilliseconds(countDownDate.getMilliseconds() + ms);

    this.timerHandle = setInterval(()=>{
        let now = Date.now();

        this.remaining = countDownDate.getTime() - now;
        let hours = Math.floor((this.remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((this.remaining % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((this.remaining % (1000 * 60)) / 1000);

        this.txt = hours + "h " + minutes + "m " + seconds + "s ";

        if(this.remaining<0){
            clearInterval(this.timerHandle);
            this.status = "red";
            this.txt = "Time's Up!"
        }

    },1000);
  }
}
