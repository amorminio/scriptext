import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit{

	@ViewChild('board_element', { static: true }) board!: ElementRef;

	ngOnInit() {
		this.board.nativeElement.addEventListener('dragover', (event: any) => {
			event.preventDefault();
		});

		this.board.nativeElement.addEventListener('drop', (event: any) => {
			event.preventDefault();
			const data = event.dataTransfer.getData('text');

			console.log('Dropou ?',event);
			
			// if (data === 'draggable-element') {
			// 	const x = event.clientX - this.canvas.nativeElement.getBoundingClientRect().left;
			// 	const y = event.clientY - this.canvas.nativeElement.getBoundingClientRect().top;
			// 	this.drawDragged(event)
			// }
		});


	}



}
