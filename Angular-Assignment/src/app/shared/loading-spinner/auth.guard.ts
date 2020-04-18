import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.userAuth.pipe(
            take(1),
            map((auth) => {
                return (auth) ? true : false;
            }),
            tap((isAuth) => {
                if (isAuth) {
                    return true;
                }
                this.router.navigate(['/login']);
            })
        );
    }
}
