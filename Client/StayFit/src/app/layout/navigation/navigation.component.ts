import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuBag, NbMenuItem, NbMenuService } from '@nebular/theme';
import { BehaviorSubject, forkJoin, fromEvent, interval, merge, Observable, of, Subject, zip } from 'rxjs';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { debounce, debounceTime, filter, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit,OnDestroy {

  @ViewChild('menu',{static:true}) menu!: ElementRef;
  subject$ = new BehaviorSubject<boolean>(false);
  unsubscribe$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router,
    private nbMenuService: NbMenuService
  ) {}

  get isLoggedIn() {
    return this.userService.isLoggedIn;
  }
  
  ngOnInit(): void {
    this.nbMenuService.onItemClick().pipe(
      takeUntil(this.unsubscribe$),
      filter(x=> x.item.title == 'Изход')
    ).subscribe(x=> this.logout());

    this.subject$.pipe(
      debounceTime(500)
    ).subscribe(x=> {
      if (!x) {
        this.menuGuestItems[0].expanded = false;
        this.menuUserItems[0].expanded = false;
      }
    });

    this.createMouseObservable('mouseenter').subscribe({
      next: () => {this.subject$.next(true)}
    })
    this.createMouseObservable('mouseleave').subscribe({
      next: () => {this.subject$.next(false)}
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  menuGuestItems: NbMenuItem[] = [
    {
      title: 'Вход',
      children: [
        {
          title: 'Създай профил',
          link: '/auth/register',
        },
        {
          title: 'Влез в профила си',
          link: '/auth/login'
        },
      ]
    }

  ]

  menuUserItems: NbMenuItem[] = [
    {
      title: 'Меню',
      icon: 'keypad-outline',
      children: [
        {
          title:'Администрация',
          children: [
            {
              title: 'Добави статия',
            },
            {
              title: 'Добави нова храна',
              link: '/administration/add-food'
            }
          ]
        },
        {
          title:'Профил',
          icon: 'person-done-outline',
        },
        {
          title:'Изход'
        }
      ]
    }
  ]

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  //helpers
  private createMouseObservable(event: string): Observable<any> {
    return fromEvent(this.menu.nativeElement,event);
  }
}
