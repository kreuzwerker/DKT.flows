import { MatSnackBar, MatSnackBarConfig  } from '@angular/material';

export const mockSnackBar = {
  open: (message: string, action?: string, config?: MatSnackBarConfig) => {},
} as MatSnackBar;
