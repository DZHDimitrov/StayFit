import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';

import { IAppState } from 'src/app/state/app.state';

import { loadRoles, removeRole } from '../store/admin.actions';

import { getRoles } from '../store/admin.selector';

import { UserRolesComponent } from '../user-roles/user-roles.component';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss']
})
export class RolesTableComponent implements OnInit {
  constructor(private store:Store<IAppState>,private dialog:MatDialog) {}

  dataSource = new MatTableDataSource();

  displayedColumns = [
    'name',
    'users',
    'actions'
  ]

  ngOnInit(): void {
    this.store.dispatch(loadRoles());
    
    this.store.select(getRoles).subscribe(roles => {
      this.dataSource.data = roles;
    });
  }

  openUserRolesDialog(roleId:string,roleName:string) {
    this.dialog.open(UserRolesComponent,{data:{roleId,roleName},width:'50rem',maxHeight:'50rem',disableClose:true})
  }

  removeRole(roleId:string) {
    if(!window.confirm('Сигурни ли сте, че искате да изтриете тази роля?')){
      return;
    }
    
    this.store.dispatch(removeRole({roleId}));
  }
}
