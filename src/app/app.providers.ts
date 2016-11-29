import { UserActions } from './user/user.actions';
import { UserService } from './user/user.service';

// --- DKT vendors ---------------------------------------

import { MATERIAL_BROWSER_PROVIDERS } from '../../node_modules/ng2-material/src';

export const APP_PROVIDERS = [
  UserActions,
  UserService,

  MATERIAL_BROWSER_PROVIDERS
];
