import { Component, OnInit ,Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../models';

@Component({
  selector: 'star-war-person-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit{
  @Input() data!: Person;

  ngOnInit(): void {
    if (!this.data) {
      throw new Error(`Property 'data' is required`);
    }
  }
}
