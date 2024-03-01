import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

	private menuSelection = new BehaviorSubject<any>('');
	public menuSelection$ = this.menuSelection.asObservable()
	
	private boardHover = new BehaviorSubject<any>('');
	public boardSelection$ = this.boardHover.asObservable()
	
	private shapes = new BehaviorSubject<any>([]);
	public shapes$ = this.shapes.asObservable()

	private lines = new BehaviorSubject<any>([]);
	public lines$ = this.lines.asObservable()

	

	private idCounter:number = 0

  constructor() { }

	public addShape(shape:any){
		shape.id = this.idCounter ++
		shape.connectors.a.id = shape.id + 'A'
		shape.connectors.b.id = shape.id + 'B'
		shape.connectors.c.id = shape.id + 'C'
		shape.connectors.d.id = shape.id + 'D'

		let shapes = this.shapes.getValue()
		shapes.push(shape)
		this.shapes.next(shapes)
	}
	
	public addLine(line:any){
		line.id = this.idCounter ++

		let lines = this.shapes.getValue()
		lines.push(line)
		this.shapes.next(lines)
	}

	updateShape(shape:any){

	}

	// Accessors
	set menuItem(shape:string){
		this.menuSelection.next(shape)
	}

	set boardHoverShape(shape:string){
		this.boardHover.next(shape)
	}

	
}
