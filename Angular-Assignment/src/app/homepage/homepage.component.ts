import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  imageUrl: any = '../../assets/images/home.png';

  constructor() { }

  ngOnInit() {
  }

}
