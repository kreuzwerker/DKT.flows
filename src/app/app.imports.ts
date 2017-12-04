import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload';
import { DktMaterialModule } from './dkt-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

import { routes } from './app.routing';
import { rootReducer } from './reducers';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { StoreDevToolsModule } from './features/store-devtools.module';
import { UserEffects } from './user/user.effects';

// --- DKT vendors ---------------------------------------

import { ApolloModule } from 'apollo-angular';
import { provideClient } from './apollo-client-store';

// --- DKT modules ---------------------------------------
import { CoreModule } from './core';
import { FlowsModule } from './flows';
import { TasksModule } from './tasks';

const STORE_DEV_TOOLS_IMPORTS = [];
if (ENV === 'development' && !AOT &&
  ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
) STORE_DEV_TOOLS_IMPORTS.push(...[
  StoreDevtoolsModule.instrumentStore({
    monitor: useLogMonitor({
      visible: true,
      position: 'right'
    })
  })
]);

export const APP_IMPORTS = [
  BrowserAnimationsModule,
  EffectsModule.run(UserEffects),
  DktMaterialModule,
  FlexLayoutModule,
  FormsModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  DynamicFormsCoreModule.forRoot(),
  DynamicFormsMaterialUIModule,
  IdlePreloadModule.forRoot(), // forRoot ensures the providers are only created once
  RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: IdlePreload }),
  StoreModule.provideStore(rootReducer),
  STORE_DEV_TOOLS_IMPORTS,
  StoreDevToolsModule,

  NgReduxModule,
  NgReduxRouterModule,
  ApolloModule.withClient(provideClient),

  CoreModule,
  FlowsModule,
  TasksModule
];

