/**
 * This module is the entry for your App.
 *
 * Make sure to use the 3 constant APP_ imports so you don't have to keep
 * track of your root app dependencies here. Only import directly in this file if
 * there is something that is specific to the environment.
 */

import { ApplicationRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouter } from '@angular-redux/router';
import { Action, combineReducers, applyMiddleware, ReducersMapObject } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { client } from './apollo-client-store';

import {
  BrowserTransferStateModule
} from '../modules/transfer-state/browser-transfer-state.module';

import { APP_DECLARATIONS } from './app.declarations';
import { APP_ENTRY_COMPONENTS } from './app.entry-components';
import { APP_IMPORTS } from './app.imports';
import { APP_PROVIDERS } from './app.providers';

import { routes } from './app.routing';

import { AppComponent } from './app.component';

import { AppState, rootReducer } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    APP_DECLARATIONS
  ],
  entryComponents: [APP_ENTRY_COMPONENTS],
  imports: [
    CommonModule,
    DEV_SERVER ? [BrowserAnimationsModule, BrowserTransferStateModule] : [],
    HttpModule,
    APP_IMPORTS,
    RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: PreloadAllModules }),
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent],
  providers: [APP_PROVIDERS]
})

export class AppModule {
  constructor(public appRef: ApplicationRef,
    private ngRedux: NgRedux<any>,
    private ngReduxRouter: NgReduxRouter,
    private devTools: DevToolsExtension,
  ) {
    let enhancers = [
      applyMiddleware(client.middleware()),
    ];

    if (devTools.isEnabled()) {
      enhancers.push(devTools.enhancer());
    }

    ngRedux.configureStore(
      // Reducers
      rootReducer,
      // TODO Initial state
      {},
      // Middleware
      [
        // createEpicMiddleware(combineEpics(...lionsEpics.epics)),
      ],
      // Enhancers
      enhancers
    );
    ngReduxRouter.initialize();
  }

  hmrOnInit(store) {
    if (!store || !store.rootState) return;

    // restore state by dispatch a SET_ROOT_STATE action
    if (store.rootState) {
      this.ngRedux.dispatch({
        type: 'SET_ROOT_STATE',
        payload: store.rootState
      });
    }

    if ('restoreInputValues' in store) { store.restoreInputValues(); }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    this.ngRedux.select().take(1).subscribe(s => store.rootState = s);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
