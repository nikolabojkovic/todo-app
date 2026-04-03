import { Component, forwardRef, OnInit } from '@angular/core';

import {
  GeneralSettingsComponent,
  PaginationSettingsComponent,
  SearchSettingsComponent,
  ThemeSettingsComponent
} from '../';

@Component({
  standalone: true,
  imports: [
    forwardRef(() => GeneralSettingsComponent),
    forwardRef(() => SearchSettingsComponent),
    forwardRef(() => PaginationSettingsComponent),
    forwardRef(() => ThemeSettingsComponent)
  ],
  selector: 'app-todo-settings',
  templateUrl: './todo-settings.component.html',
  styleUrls: ['./todo-settings.component.scss']
})
export class TodoSettingsComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void { }
}
