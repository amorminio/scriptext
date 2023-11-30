import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type } from 'os';

@Component({
  selector: 'app-shape',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shape.component.html',
  styleUrl: './shape.component.scss'
})
export class ShapeComponent {

	private id!:number
	private type!:string
	private settings:any = {}
	

	

	

}
