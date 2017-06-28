import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

// DKT module imports
import { CoreModule } from './../core';

// Containers
import { TasksAppComponent } from './containers/tasks-app/tasks-app.component';
import { TaskCommentsComponent } from './containers/task-comments/task-comments.component';
import { TasksListComponent } from './containers/tasks-list/tasks-list.component';

// Components
import { TaskCommentItemComponent } from './components/task-comment-item/task-comment-item.component';
import { TaskControlsComponent } from './components/task-controls/task-controls.component';
import { TaskControlsApproveComponent } from './components/task-controls-approve/task-controls-approve.component';
import { TaskControlsReviewComponent } from './components/task-controls-review/task-controls-review.component';
import { TaskControlsTransitionalComponent } from './components/task-controls-transitional/task-controls-transitional.component';
import { TaskDescriptionComponent } from './components/task-description/task-description.component';
import { TasksFilterComponent } from './components/tasks-filter/tasks-filter.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskItemLabelsComponent } from './components/task-item-labels/task-item-labels.component';
import { TaskTextWidgetComponent } from './components/task-text-widget/task-text-widget.component';

// Services
import { TasksApiService, TasksAppService, TasksStateService } from './services';
import { LoginGuard } from './../core/services/user/login-guard.service';

// States
import { TasksAppActions, TasksAppEffects } from './states';

const routes: Routes = [
  { path: 'tasks', component: TasksAppComponent, canActivate: [LoginGuard] },
  { path: 'tasks/:taskId', component: TasksAppComponent, canActivate: [LoginGuard],
    children: [
      { path: 'description', component: TaskDescriptionComponent },
      { path: 'comments', component: TaskCommentsComponent },
    ]
  }
];

@NgModule({
  declarations: [
    TasksAppComponent,
    TaskCommentItemComponent,
    TaskCommentsComponent,
    TaskControlsComponent,
    TaskControlsApproveComponent,
    TaskControlsReviewComponent,
    TaskControlsTransitionalComponent,
    TaskDescriptionComponent,
    TasksFilterComponent,
    TaskItemComponent,
    TaskItemLabelsComponent,
    TasksListComponent,
    TaskTextWidgetComponent,
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
