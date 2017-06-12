import { MdSnackBar, MdSnackBarConfig  } from '@angular/material';

export const mockSnackBar = {
  open: (message: string, action?: string, config?: MdSnackBarConfig) => {},
} as MdSnackBar;
