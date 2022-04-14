import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  title = 'InventoryApp';
  showFiller = false;


  signOut(){
    localStorage.removeItem('token');
   // location.reload()
    this.route.navigate(['/'])
  }
}
