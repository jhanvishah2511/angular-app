import { Component } from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd,Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularApp';

  loggedIn: boolean = false;

  constructor(private router:Router,private route: ActivatedRoute){
    
    this.checkRoute();
  }

  checkRoute(){
    this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationEnd){
        const currentUrl = event.url;
        const firstPart = currentUrl.split('/')[1];
        this.loggedIn = firstPart.trim() !== '' && firstPart !== 'login' && firstPart !== 'register'
        console.log('aaaaa', )
      }
    })
  }
}
