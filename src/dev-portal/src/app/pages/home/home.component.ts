import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/index';
import { User } from '../../shared';
import { ExtendedTable } from '../../shared/classes/extended-table.class';
import { TableColumn, defaultRender, emptyTableColumn } from '../../shared/interfaces';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent extends ExtendedTable implements OnInit {
    tableColumns: TableColumn[] = [];
    currentUser: User;

    constructor(private userService: UserService, private router: Router) {
        super();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    public linkEventHandler(href) {
        this.router.navigate([href]);
    }

    getTableData(): void {
        // MAKE API CALL TO GET DATA
        // ...
        // data returned
        //   - items[]
        //   - totalCount

        const fakeTotalCount = 2;
        const fakeItems: User[] = [
            {
                id: 0,
                username: 'vladmarica',
                password: 'mehpassword',
                firstName: 'Vlad',
                lastName: 'Marica'
            },
            {
                id: 1,
                username: 'carreath',
                password: 'supersecretpassword',
                firstName: 'Caleb',
                lastName: 'Reath'
            }
        ];

        this.updateTableData(fakeItems, fakeTotalCount);
        console.log(this.tableData);
    }

    ngOnInit() {
        this.tableColumns = [
            {
                column: 'id',
                header: 'ID',
                column_type: 'plainText',
                renders: [ defaultRender ]
            }, {
                column: 'username',
                header: 'Username',
                column_type: 'plainText',
                renders: [ defaultRender ]
            }, {
                column: 'password',
                header: 'Password',
                column_type: 'plainText',
                renders: [
                    function(data) {
                        return '*'.repeat(data.length);
                    }
                ]
            }, {
                column: '',
                header: 'Name',
                column_type: 'plainText',
                renders: [
                    function(data) {
                        return data.firstName + " " + data.lastName;
                    }
                ]
            }
        ];

        this.getTableData();
    }
}
