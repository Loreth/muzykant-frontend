import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<CanComponentDeactivate> {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
    if (this.authService.isLoggedIn()) {
      if (this.authService.isFullyRegistered()) {
        return true;
      } else {
        return this.router.parseUrl('/create-user');
      }
    }

    this.authService.redirectUrl = state.url;
    return this.router.parseUrl('/login');
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {
    return this.canActivate(childRoute, state);
  }

  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
    console.log('checking if component can deactivate: ' + component.canDeactivate());
    return component.canDeactivate();
  }
}
