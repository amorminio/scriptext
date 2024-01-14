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
	lines: Array<any> = []
	boardHeight: number = 500
	boardWidth: number = 500
	
	lineDrawing:boolean = false
	new_line:any={x1:0,	y1:0,	x2:0,	y2:0,	stroke:'black'}
	
	

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
			if(this.lineDrawing){
				this.activeLineDraw(event)
			}
			
    })

		this.board.nativeElement.addEventListener('mouseup', (event: MouseEvent) => {
			event.preventDefault();
			this.lineDrawing = false
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
		this.dragSelection = shape
	}

	drag(event:MouseEvent){
		if(this.dragSelection && !this.lineDrawing){
			event.preventDefault()
			if(this.dragSelection.type === 'rect'){
				this.dragSelection.x = event.offsetX - this.dragSelection.width/2
				this.dragSelection.y = event.offsetY - this.dragSelection.height/2
				this.dragSelection.selection.x = (event.offsetX - this.dragSelection.width/2) - SHAPES.rectangle_selected_border.margin
				this.dragSelection.selection.y = (event.offsetY - this.dragSelection.height/2) - SHAPES.rectangle_selected_border.margin
				
				// Move Connectors together
				this.dragSelection.connectors.a.cx = event.offsetX
				this.dragSelection.connectors.a.cy = event.offsetY - this.dragSelection.height/2
				this.dragSelection.connectors.b.cx = event.offsetX + this.dragSelection.width/2
				this.dragSelection.connectors.b.cy = event.offsetY
				this.dragSelection.connectors.c.cx = event.offsetX
				this.dragSelection.connectors.c.cy = event.offsetY + this.dragSelection.height/2
				this.dragSelection.connectors.d.cx = event.offsetX - this.dragSelection.width/2
				this.dragSelection.connectors.d.cy = event.offsetY 
			}

			else if(this.dragSelection.type === 'circle'){
				this.dragSelection.cx = event.offsetX 
				this.dragSelection.cy = event.offsetY
				this.dragSelection.selection.x = event.offsetX - 20
				this.dragSelection.selection.y = event.offsetY - 20

				// Move Connectors together
				this.dragSelection.connectors.a.cx = event.offsetX
				this.dragSelection.connectors.a.cy = event.offsetY - this.dragSelection.r
				this.dragSelection.connectors.b.cx = event.offsetX + this.dragSelection.r
				this.dragSelection.connectors.b.cy = event.offsetY
				this.dragSelection.connectors.c.cx = event.offsetX
				this.dragSelection.connectors.c.cy = event.offsetY + this.dragSelection.r
				this.dragSelection.connectors.d.cx = event.offsetX - this.dragSelection.r
				this.dragSelection.connectors.d.cy = event.offsetY 
			}

			else if(this.boardSelection.type === 'decision_diamond'){
				this.dragSelection.x = event.offsetX 
				this.dragSelection.y = event.offsetY
				this.dragSelection.selection.x = event.offsetX - this.dragSelection.radius -10
				this.dragSelection.selection.y = event.offsetY - this.dragSelection.radius -10
				this.dragSelection.coordinates =  `M ${event.offsetX} ${event.offsetY - this.dragSelection.radius} L ${event.offsetX + this.dragSelection.radius} ${event.offsetY } L ${event.offsetX} ${event.offsetY  + this.dragSelection.radius} L ${event.offsetX - this.dragSelection.radius} ${event.offsetY } Z `

				// Move Connectors together
				this.dragSelection.connectors.a.cx = event.offsetX
				this.dragSelection.connectors.a.cy = event.offsetY - this.dragSelection.r
				this.dragSelection.connectors.b.cx = event.offsetX + this.dragSelection.r
				this.dragSelection.connectors.b.cy = event.offsetY
				this.dragSelection.connectors.c.cx = event.offsetX
				this.dragSelection.connectors.c.cy = event.offsetY + this.dragSelection.r
				this.dragSelection.connectors.d.cx = event.offsetX - this.dragSelection.r
				this.dragSelection.connectors.d.cy = event.offsetY 
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

		let connectors = {
			fill:SHAPES.connector.fill,
			stroke_width:SHAPES.rectangle.stroke_width,
			
			a:{
					cx:event.offsetX ,
					cy:event.offsetY - SHAPES.rectangle.height/2,
					r:SHAPES.connector.radius
				},
			b:{
					cx:event.offsetX + SHAPES.rectangle.width/2,
					cy:event.offsetY,
					r:SHAPES.circle.connector_radius
				},
			c:{
					cx:event.offsetX,
					cy:event.offsetY + SHAPES.rectangle.height/2,
					r:SHAPES.circle.connector_radius
				},
			d:{
					cx:event.offsetX - SHAPES.rectangle.width/2,
					cy:event.offsetY, 
					r:SHAPES.circle.connector_radius
				}
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
			connectors,
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

		let connectors = {
			fill:SHAPES.circle.fill,
			stroke_width:SHAPES.circle.stroke_width,
			a:{
					cx:event.offsetX,
					cy:event.offsetY - SHAPES.circle.r,
					r:SHAPES.circle.connector_radius
				},
			b:{
					cx:event.offsetX + SHAPES.circle.r,
					cy:event.offsetY,
					r:SHAPES.circle.connector_radius
				},
			c:{
					cx:event.offsetX,
					cy:event.offsetY + SHAPES.circle.r,
					r:SHAPES.circle.connector_radius
				},
			d:{
					cx:event.offsetX- SHAPES.circle.r,
					cy:event.offsetY, 
					r:SHAPES.circle.connector_radius
				}
		}

		let shape = {
			type: 'circle',
			cx: event.offsetX,
			cy: event.offsetY,
			r: SHAPES.circle.r,
			fill: SHAPES.circle.fill,
			stroke: SHAPES.circle.stroke,
			stroke_width: SHAPES.circle.stroke_width,
			fill_opacity: SHAPES.circle.fill_opacity,
			selection: shapeBorder,
			connectors
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

		let connectors = {
			fill:SHAPES.connector.fill,
			stroke_width:SHAPES.rectangle.stroke_width,
			
			a:{
					cx:event.offsetX ,
					cy:event.offsetY - radius,
					r:SHAPES.connector.radius
				},
			b:{
					cx:event.offsetX + radius,
					cy:event.offsetY,
					r:SHAPES.circle.connector_radius
				},
			c:{
					cx:event.offsetX,
					cy:event.offsetY + radius,
					r:SHAPES.circle.connector_radius
				},
			d:{
					cx:event.offsetX - radius,
					cy:event.offsetY, 
					r:SHAPES.circle.connector_radius
				}
		}

		
		let shape = {
			coordinates: `M ${event.offsetX} ${event.offsetY - radius} L ${event.offsetX + radius} ${event.offsetY } L ${event.offsetX} ${event.offsetY  + radius} L ${event.offsetX - radius} ${event.offsetY } Z `,
			type: 'decision_diamond',
			x: event.offsetX,
			y: event.offsetY,
			radius:radius,
			width: 60,
			height: 60,
			fill: SHAPES.decision_diamond.fill,
			stroke: SHAPES.decision_diamond.stroke,
			stroke_width: 1,
			center: {
				x: event.offsetX,
				y: event.offsetY
			},
			selection: shapeBorder,
			connectors
		}

		this._board.addShape(shape)

	}

	selectShape(shape: any) {
		if(!this.dragSelection)
		this._board.boardItem = shape
	}

	startLineDraw(startShape:any,event:MouseEvent){
		debugger
		this.lineDrawing = true

		this.new_line.x1 = event.offsetX
		this.new_line.y1 = event.offsetY
		this.new_line.x2 = event.offsetX
		this.new_line.y2 = event.offsetY
		
	}

	stopLineDraw(targetShape:any,event:MouseEvent){
		if(this.lineDrawing){
			let line = {
				x1:this.new_line.x1,
				y1:this.new_line.y1,
				x2:this.new_line.x2,
				y2:this.new_line.y2
			}
			this.lines.push(line)
		}
		this.lineDrawing = false
		this.new_line = {x1:0,	y1:0,	x2:0,	y2:0,	stroke:'black'}

	}

	activeLineDraw(event:MouseEvent){
		this.new_line.x2 = event.offsetX
		this.new_line.y2 = event.offsetY
	}

	

}
