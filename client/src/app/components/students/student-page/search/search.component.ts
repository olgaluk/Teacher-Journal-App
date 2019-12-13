import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/app.state';

import {
  updateSearchValue,
  getStudentsByName,
} from '../../../../redux/store/students/students-table/students-table.actions';

import { selectSearchValue }
  from '../../../../redux/store/students/students-table/students-table.selectors';

import { InputFormGroupComponent }
  from '../../../../shared/components/form/input-form-group/input-form-group.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchValue: Observable<string> = this.store.pipe(select(selectSearchValue));

  @ViewChild(InputFormGroupComponent, { static: false })
  private inputComponent: InputFormGroupComponent;

  constructor(private store: Store<IAppState>) { }

  updateSearchValue(searchValue: string): void {
    this.store.dispatch(updateSearchValue({ searchValue }));
  }

  getEnteredValue($event: string): void {
    this.updateSearchValue($event);
  }

  findStudent(): void {
    this.store.dispatch(getStudentsByName());
  }

  reset(): void {
    this.updateSearchValue('');
    this.findStudent();
    this.inputComponent.reset();
  }
}
