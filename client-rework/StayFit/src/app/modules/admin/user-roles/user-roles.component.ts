import { AfterContentInit, AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { IAppState } from 'src/app/state/app.state';
import { IModifyRoleRequest } from '../models/admin-requests.model';
import { loadUsersInRole, modifyRole } from '../store/admin.actions';
import { getUsersInRole } from '../store/admin.selector';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit,AfterContentInit,OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store:Store<IAppState>,@Inject(MAT_DIALOG_DATA) private data,private dialog:MatDialog) {
    this.roleName = this.data.roleName;
   }

  unsubscribe$:Subject<void> = new Subject();


  roleName!:string;
  dataSource = new MatTableDataSource();
  displayedColumns = [
    'username',
    'actions'
  ]

  ngOnInit(): void {
    this.store.dispatch(loadUsersInRole({roleId:this.data.roleId}))
    this.store.select(getUsersInRole).subscribe(x => {
      this.dataSource.data = x;
    });
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  modifyRole(isInRole:boolean,userId:string) {
    const data:IModifyRoleRequest = {
      toAdd:isInRole,
      userId
    }
    this.store.dispatch(modifyRole({roleId:this.data.roleId,data}));
  }

  close() {
    this.dialog.closeAll();
  }
}
