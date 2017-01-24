/* tslint:disable: no-switch-case-fall-through */
import { AppState, Action, Selector } from '../../reducers';
import { FlowsAppActions as Actions } from './flows-app.actions';
import { Step, Provider } from '../models';

export interface FlowsAppState {
  flowId: String;
  step: Step;
  provider: Provider;
  loadingFlow: boolean;
  loadingFlows: boolean;
  loadingProviders: boolean;
  savingFlow: boolean;
  savedFlow: boolean;
};

const initialState: FlowsAppState = {
  flowId: null,
  step: null,
  provider: null,
  loadingFlow: false,
  loadingFlows: false,
  loadingProviders: false,
  savingFlow: false,
  savedFlow: true,
};

export function flowsAppReducer(state = initialState, {type, payload}: Action): FlowsAppState {
  switch (type) {

    case Actions.SELECT_FLOW: {
      return Object.assign({}, state, {
        flowId: payload
      });
    }

    case Actions.SELECT_STEP: {
      return Object.assign({}, state, {
        step: payload
      });
    }

    case Actions.SET_STEP_SERVICE_STEP: {
      return Object.assign({}, state, {
        step: Object.assign({}, state.step, {
          provider: payload.provider,
          service: payload.service
        })
      });
    }

    case Actions.SELECT_PROVIDER: {
      return Object.assign({}, state, {
        provider: payload
      });
    }

    /**
     * Flags
     */

    case Actions.SET_LOADING_FLOW: {
      return Object.assign({}, state, {
        loadingFlow: payload
      });
    }

    case Actions.SET_LOADING_FLOWS: {
      return Object.assign({}, state, {
        loadingFlows: payload
      });
    }

    case Actions.SET_LOADING_PROVIDERS: {
      return Object.assign({}, state, {
        loadingProviders: payload
      });
    }

    case Actions.SET_SAVING_FLOW: {
      return Object.assign({}, state, {
        savingFlow: payload.saving,
        savedFlow: payload.saved
      });
    }

    default: {
      return state;
    }
  }
}

// Example Selector
// ----------------
// 
// NB in this trivial example a custom selector is not necessary.
// Use store.select('step') instead.
//
// export function getCurrentStep(): Selector<AppState, Step> {
//   return state$ => state$
//     .map(state => state.step.step)
//     .distinctUntilChanged();
// }
