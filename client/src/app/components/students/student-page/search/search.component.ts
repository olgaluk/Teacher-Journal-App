import { Component, ViewChild, OnInit } from '@angular/core';

import {
  FormBuilder, FormGroup, Validators
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/app.state';

import {
  getStudentsByName,
} from '../../../../redux/store/students/students-table/students-table.actions';

import { InputFormGroupComponent }
  from '../../../../shared/components/form/input-form-group/input-form-group.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild(InputFormGroupComponent, { static: false })
  private inputComponent: InputFormGroupComponent;

  searchForm: FormGroup;

  constructor(private store: Store<IAppState>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: this.formBuilder.group({
        inputValue: [
          null,
          [Validators.minLength(1), Validators.maxLength(20)]
        ]
      }),
    });
  }

  getStudents(searchValue: string): void {
    this.store.dispatch(getStudentsByName({ searchValue }));
  }

  findStudent(): void {
    const { searchValue } = this.searchForm.value;
    this.getStudents(searchValue.inputValue);
  }

  reset(): void {
    this.getStudents('');
    this.inputComponent.reset();
  }
}
