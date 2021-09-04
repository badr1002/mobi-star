import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor() {}
  arrowStatus: any = false;
  ngOnInit(): void {}
  sidbarToggler() {
    this.arrowStatus = !this.arrowStatus;
  }
}
