import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Specie } from '../../models';

@Component({
  selector: 'star-war-species-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './species-view.component.html',
  styleUrls: ['./species-view.component.scss']
})
export class SpeciesViewComponent implements OnInit{
  @Input() data!: Specie;

  ngOnInit(): void {
    if (!this.data) {
      throw new Error(`Property 'data' is required`);
    }
  }
}
