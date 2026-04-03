import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import {
  IState,
  selectActiveTab,
  selectSettings,
  TodoListActions
} from './shared/state';
import { IThemeSettings } from './shared/models';
import {
  PagingComponent,
  SortingComponent,
  TabsComponent,
  TodoActionsComponent,
  TodoListComponent
} from './components';

@Component({
  standalone: true,
  imports: [
    PagingComponent,
    SortingComponent,
    TabsComponent,
    TodoActionsComponent,
    TodoListComponent,
    CommonModule,
    NgIf
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  activeTab$ = this.store.select(selectActiveTab);
  settings$ = this.store.select(selectSettings);
  private settingsSubscription!: Subscription;

  constructor(private store: Store<IState>) {}

  ngOnInit(): void {
    // this.store.dispatch(TodoListActions.fetch());
    // this.store.dispatch(TodoListActions.settingsFetch());
    // this.store.dispatch(TodoListActions.pagingFetch());
    this.store.dispatch(TodoListActions.loadApp());

    this.settingsSubscription = this.store.select(selectSettings).subscribe((settings) => {
      if (settings && settings.theme) {
        this.applyTheme(settings.theme as IThemeSettings);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
  }

  private applyTheme(theme: IThemeSettings) {
    console.log('Applying theme:', theme);
    try {
      if (theme.primaryColor) {
        document.documentElement.style.setProperty('--bs-primary', theme.primaryColor);
      }
      if (theme.bsTheme) {
        document.documentElement.setAttribute('data-bs-theme', theme.bsTheme);
      }
      // optional: map BackgroundColor to background hex values for body
      const bgMap: Record<string, string> = {
        DarkGray: '#121212',
        DarkBlue: '#0b3d91',
        DarkRed: '#3b0000',
        LightGray: '#ffffff',
        LightBlue: '#e9f4ff',
        LightRed: '#fff0f0'
      };
      const bgKey = (theme as unknown as { backgroundColor?: string }).backgroundColor;
      if (bgKey) {
        const bg = bgMap[bgKey] ?? '';
        document.body.style.background = bg;
      }
    } catch (e) {
      // ignore in non-browser environments
    }
  }
}
