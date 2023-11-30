import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

	private menuSelection = new BehaviorSubject<any>('');

  constructor() { }
}
