import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

	private menuSelection = new BehaviorSubject<any>('');
	public menuSelection$ = this.menuSelection.asObservable()

  constructor() { }

	set menuItem(shape:string){
		this.menuSelection.next(shape)
	}
}
