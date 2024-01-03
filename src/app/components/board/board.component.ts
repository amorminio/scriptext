import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { SHAPES } from '../../shared/shapes';
import { ShapeSelectorComponent } from '../menu/shape-selector.component';

@Component({
	selector: 'board',
	standalone: true,
	imports: [CommonModule,ShapeSelectorComponent],
	templateUrl: './board.component.html',
	styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {

	@ViewChild('board_element', { static: true }) board!: ElementRef;
	@ViewChildren('border_expander') borderExpander!: QueryList<ElementRef>;

	menuSelection: any
	boardSelection: any
	dragSelection: any
	shapes: Array<any> = []
	boardHeight: number = 500
	boardWidth: number = 500
	

	constructor(private _board: BoardService) {

	}


	ngOnInit() {
		this.board.nativeElement.addEventListener('dragover', (event: any) => {
			event.preventDefault();
		});

		this.board.nativeElement.addEventListener('drop', (event: any) => {
			this.drawDragged(event,event.dataTransfer.getData("text"))
		});

		this.board.nativeElement.addEventListener('mousedown', (event: MouseEvent) => {
			event.preventDefault();
		});
	
		this.board.nativeElement.addEventListener('mousemove', (event: MouseEvent) => {
      event.preventDefault();
			this.drag(event)
    })

		this.board.nativeElement.addEventListener('mouseup', (event: MouseEvent) => {
			event.preventDefault();
			this.enddrag(event)
		})

		this.board.nativeElement.addEventListener('mouseleave', (event: MouseEvent) => {
			event.preventDefault();
			this.enddrag(event)
		})

		// Subscriptions
		this._board.menuSelection$.subscribe((selected) => {
			this.menuSelection = selected
		})

		this._board.boardSelection$.subscribe((selected) => {
			this.boardSelection = selected
		})

		this._board.shapes$.subscribe((selected) => {
			this.shapes = selected
		})
	}

	startDrag(event:MouseEvent,shape:any){
		console.log('StartDrag ?')
		this.dragSelection = shape
	}

	drag(event:MouseEvent){
		if(this.dragSelection){
			event.preventDefault()

			if(this.dragSelection.type === 'rect'){
				this.dragSelection.x = event.offsetX - this.dragSelection.width/2
				this.dragSelection.y = event.offsetY - this.dragSelection.height/2
				this.dragSelection.selection.x = (event.offsetX - this.dragSelection.width/2) - SHAPES.rectangle_selected_border.margin
				this.dragSelection.selection.y = (event.offsetY - this.dragSelection.height/2) - SHAPES.rectangle_selected_border.margin
			}

			else if(this.dragSelection.type === 'circle'){
				this.dragSelection.x = event.offsetX 
				this.dragSelection.y = event.offsetY
				this.dragSelection.selection.x = event.offsetX - 20
				this.dragSelection.selection.y = event.offsetY - 20
			}

			else if(this.boardSelection.type === 'decision_diamond'){
				this.dragSelection.x = event.offsetX 
				this.dragSelection.y = event.offsetY
				this.dragSelection.selection.x = event.offsetX - this.dragSelection.radius -10
				this.dragSelection.selection.y = event.offsetY - this.dragSelection.radius -10
				this.dragSelection.coordinates =  `M ${event.offsetX} ${event.offsetY - this.dragSelection.radius} L ${event.offsetX + this.dragSelection.radius} ${event.offsetY } L ${event.offsetX} ${event.offsetY  + this.dragSelection.radius} L ${event.offsetX - this.dragSelection.radius} ${event.offsetY } Z `
			}
		}
	}

	enddrag(event: MouseEvent){
		this.dragSelection = null;
	}


	drawDragged(event: MouseEvent,type:string='none'): void {
		switch (this.menuSelection) {
			case ('rect'):
				this.drawRect(event)
				break
			case ('round_rect'):
				this.drawRect(event)
				break
			case ('start_point'):
				this.drawCircle(event,this.menuSelection.type)
				break
			case ('end_point'):
				this.drawCircle(event,this.menuSelection.type)
				break
			case ('circle'):
				this.drawCircle(event,this.menuSelection.type)
				break
			case ('decision_diamond'):
				this.drawDiamond(event)
				break
			default:
				break
		}
	}

	drawRect(event: MouseEvent) {
	
		let shapeBorder = {
			type: 'rect',
			x: (event.offsetX - SHAPES.rectangle_selected_border.width / 2) ,
			y: (event.offsetY - SHAPES.rectangle_selected_border.height / 2),
			width: SHAPES.rectangle_selected_border.width,
			height: SHAPES.rectangle_selected_border.height,
			fill: SHAPES.rectangle_selected_border.fill,
			stroke: SHAPES.rectangle_selected_border.stroke,
			stroke_width: SHAPES.rectangle_selected_border.stroke_width,
			fill_opacity: SHAPES.rectangle_selected_border.fill_opacity,
			stroke_opacity: SHAPES.rectangle_selected_border.stroke_opacity,
			centerX:event.offsetX,
			centerY:event.offsetY
		}

		let shape = {
			type: 'rect',
			x: event.offsetX - SHAPES.rectangle.width / 2,
			y: event.offsetY - SHAPES.rectangle.height / 2,
			width: SHAPES.rectangle.width,
			height: SHAPES.rectangle.height,
			fill: 'white',
			stroke: 'black',
			stroke_width: 1,
			centerX:event.offsetX,
			centerY:event.offsetY,
			selection: shapeBorder,
			rx:0,
			ry:0
		}

		if(this.menuSelection==='round_rect'){
			shape.rx =SHAPES.round_rectangle.rx
			shape.ry = SHAPES.round_rectangle.ry
		}

		this._board.addShape(shape)

	}

	drawCircle(event: MouseEvent,type:string) {
		console.log('tipo ?' ,type);

		let shapeBorder = {
			type: 'rect',
			x: event.offsetX - 20,
			y: event.offsetY - 20,
			width: 40,
			height: 40,
			fill: '#5EB1BF',
			stroke: '#5EB1BF',
			stroke_width: 2,
			fill_opacity: 0.2,
			stroke_opacity: 0.8,
			center: {
				x: event.offsetX,
				y: event.offsetY
			},
		}

		let shape = {
			type: 'circle',
			x: event.offsetX,
			y: event.offsetY,
			r: 15,
			fill: '#5EB1BF',
			stroke: 'black',
			stroke_width: 1,
			fill_opacity: 0.2,
			center: {
				x: event.offsetX,
				y: event.offsetY
			},
			selection: shapeBorder
		}

		if(this.menuSelection==='start_point'){
			shape.fill= SHAPES.start_point.fill,
			shape.stroke= SHAPES.start_point.stroke
		}else if (this.menuSelection==='end_point'){
			shape.fill= SHAPES.end_point.fill,
			shape.stroke= SHAPES.end_point.stroke
		}

		this._board.addShape(shape)
	}

	drawDiamond(event: MouseEvent) {
		const radius = 20

		let shapeBorder = {
			type: 'rect',
			x: event.offsetX - radius - 10,
			y: event.offsetY - radius - 10,
			radius:20,
			width: 60,
			height: 60,
			fill: '#5EB1BF',
			stroke: '#5EB1BF',
			stroke_width: 2,
			fill_opacity: 0.2,
			stroke_opacity: 0.8,
			center: {
				x: event.offsetX,
				y: event.offsetY
			}
		}

		let shape = {
			coordinates: `M ${event.offsetX} ${event.offsetY - radius} L ${event.offsetX + radius} ${event.offsetY } L ${event.offsetX} ${event.offsetY  + radius} L ${event.offsetX - radius} ${event.offsetY } Z `,
			type: 'decision_diamond',
			x: event.offsetX,
			y: event.offsetY,
			radius:20,
			width: 60,
			height: 60,
			fill: SHAPES.decision_diamond.fill,
			stroke: SHAPES.decision_diamond.stroke,
			stroke_width: 1,
			center: {
				x: event.offsetX,
				y: event.offsetY
			},
			selection: shapeBorder
		}

		this._board.addShape(shape)

	}

	selectShape(shape: any) {
		if(!this.dragSelection)
		this._board.boardItem = shape
	}
	

}
