import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit{

	@ViewChild('board_element', { static: true }) board!: ElementRef;

	menuSelection:any
	boardSelection:any
	shapes:Array<any> = []


	constructor(private _board:BoardService){

	}

	ngOnInit() {
		this.board.nativeElement.addEventListener('dragover', (event: any) => {
			event.preventDefault();

			console.log(event.clientX , ' : ',event.clientY);
			
		});

		

		this.board.nativeElement.addEventListener('drop', (event: any) => {
			event.preventDefault();
			const data = event.dataTransfer.getData('menuItem');
			debugger
			console.log('Dropou ?',event);

			this.drawDragged(event)

			// if (data === 'draggable-element') {
			// 	const x = event.clientX - this.canvas.nativeElement.getBoundingClientRect().left;
			// 	const y = event.clientY - this.canvas.nativeElement.getBoundingClientRect().top;
			// 	this.drawDragged(event)
			// }
		});

		this._board.menuSelection$.subscribe((selected)=>{
			this.menuSelection = selected
			console.log("selected from menu",selected);
		})
		
		this._board.boardSelection$.subscribe((selected)=>{
			this.boardSelection = selected
		})

		this._board.shapes$.subscribe((selected)=>{
			this.shapes = selected
		})


	}

	drawDragged(event:MouseEvent):void{
		switch(this.menuSelection){
			case ('rect') :
				this.drawRect(event)
				break
			default:
				break
		}
	}

	drawRect(event:MouseEvent){
		const startY = event.offsetY - 65/2  // height
		const startX = event.offsetX - 90/2  // widht
		// const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		
		// rect.setAttribute('x', startX.toString());
		// rect.setAttribute('y', startY.toString());
		// rect.setAttribute('width', '90');
		// rect.setAttribute('height', '65');
		// rect.setAttribute('fill', 'white');
		// rect.setAttribute('stroke', 'black');
		// rect.setAttribute('stroke-width', '2');

		let shape = {
			type:'rect',
			x:startX.toString(), //- 65/2,
			y:startY.toString(), //- 90/2,
			width:'90',
			height:'65',
			fill:'white',
			stroke:'black',
			stroke_width: 2
		}

		this._board.addShape(shape)
		
		

	}

	selectShape(shape:any){
		this._board.boardItem = shape
	}



}
