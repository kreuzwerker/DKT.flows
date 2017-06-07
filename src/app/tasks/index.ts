import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@ng2-dynamic-forms/core';
import { DynamicFormsMaterialUIModule } from '@ng2-dynamic-forms/ui-material';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

// DKT module imports
import { CoreModule } from './../core';

// Containers
import { TasksAppComponent } from './containers/tasks-app/tasks-app.component';
import { TasksListComponent } from './containers/tasks-list/tasks-list.component';

// Components
import { TasksFilterComponent } from './components/tasks-filter/tasks-filter.component';
import { TaskItemComponent } from './components/task-item/task-item.component';

// Services
import { TasksApiService, TasksAppService, TasksStateService } from './services';
import { LoginGuard } from './../core/services/user/login-guard.service';

// States
import { TasksAppActions, TasksAppEffects } from './states';

const routes: Routes = [
  { path: 'tasks', component: TasksAppComponent, canActivate: [LoginGuard] },
];

@NgModule({
  declarations: [
    TasksAppComponent,
    TasksFilterComponent,
    TaskItemComponent,
    TasksListComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    EffectsModule.run(TasksAppEffects),
  ],
  exports: [
  ],
  providers: [
    TasksAppService,
    TasksApiService,
    TasksStateService,
    TasksAppActions,
  ],
  entryComponents: [
  ],
})
export class TasksModule {}
