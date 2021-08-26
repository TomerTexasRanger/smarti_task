import { Component, OnInit } from '@angular/core';
import { Guitar } from '../guitar.model';
@Component({
  selector: 'app-guitar-list',
  templateUrl: './guitar-list.component.html',
  styleUrls: ['./guitar-list.component.css'],
})
export class GuitarListComponent implements OnInit {
  constructor() {}
  guitars: Guitar[] = [];
  ngOnInit(): void {}
}
