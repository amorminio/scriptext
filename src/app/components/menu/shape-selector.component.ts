import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { MENU_FLOWCHART_SHAPES } from '../../shared/shapes';


@Component({
  selector: 'shape-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shape-selector.component.html',
  styleUrl: './shape-selector.component.scss'
})
export class ShapeSelectorComponent implements AfterViewInit{
	@ViewChildren('shapes') shapes!: QueryList<ElementRef>;
	
	flowchart_shapes:Array<any> = MENU_FLOWCHART_SHAPES
	selectedItem!:string

	constructor(private _board:BoardService){

		this.flowchart_shapes = MENU_FLOWCHART_SHAPES
		console.log(this.flowchart_shapes);
		
	}

	ngAfterViewInit() {
		this.shapes.forEach((element: ElementRef) => {
			element.nativeElement.addEventListener('dragstart', (event: any) => {
				event.dataTransfer.setData('text/plain', this.selectedItem);
			});
		});
	}

	public selectShape(shape:any):void{
		this._board.menuItem = shape.type
		this.selectedItem = shape.type
	}

}
