import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

	private menuSelection = new BehaviorSubject<any>('');
	public menuSelection$ = this.menuSelection.asObservable()
	
	private boardSelection = new BehaviorSubject<any>('');
	public boardSelection$ = this.boardSelection.asObservable()
	
	private shapes = new BehaviorSubject<any>([]);
	public shapes$ = this.shapes.asObservable()

	private idCounter:number = 0

  constructor() { }

	public addShape(shape:any){

		shape.id = this.idCounter ++

		let shapes = this.shapes.getValue()
		shapes.push(shape)
		this.shapes.next(shapes)

		console.log('shapes?',shapes);
		
	}

	// Accessors
	set menuItem(shape:string){
		this.menuSelection.next(shape)
	}

	set boardItem(shape:string){
		this.boardSelection.next(shape)
	}

	
}
