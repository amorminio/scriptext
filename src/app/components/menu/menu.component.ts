import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements AfterViewInit{
	@ViewChildren('shapes') shapes!: QueryList<ElementRef>;

	constructor(private _board:BoardService){

	}

	ngAfterViewInit() {
		this.shapes.forEach((element: ElementRef) => {
			element.nativeElement.addEventListener('dragstart', (event: any) => {
				event.dataTransfer.setData('menuItem', 'draggable-element');
			});

		});
	}

	public selectShape(shape:string):void{
		this._board.menuItem = shape
	}

}
