import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
//import { NavController } from 'ionic-angular';
//import { DashboardPage } from '../dashboard/dashboard';
import { MovieService } from '../services/MovieService';
import { WebAccess } from '../services/WebAccess';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Router } from '@angular/router';
import { Ng2TableModule } from 'ng2-table'
import { NgTableComponent } from 'ng2-table';
import { NG_TABLE_DIRECTIVES } from 'ng2-table'
import { TableData } from './table-data';

@Component({
    selector: 'app-root',
    templateUrl: 'dashboard.html',
    styleUrls: ['dashboard.scss'],
    providers: [MovieService, WebAccess]
})



export class DashboardPage {

    model = {
        left: true,
        middle: false,
        right: false
    };

    public rows: Array<any> = [];
    public columns: Array<any> = [
        { title: 'Name', name: 'name' },
        { title: 'Mobile', name: 'mobile', sort: false },
        { title: 'Shpp Name', name: 'shopName', sort: 'asc' },
        { title: 'Location', name: 'location', sort: '' },
        { title: 'Address', name: 'address' }
        

    ];
    public page: number = 1;
    public itemsPerPage: number = 10;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;

    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '', columnName: 'name' }
    };

    private data: Array<any> = TableData;


    constructor(sanitizer: DomSanitizer,
        private movieService: MovieService, private webAccess: WebAccess,
        private router: Router
    ) {
        this.staticAlertClosed = true;
        this.length = this.data.length;
    }




    // response : any;
    public username: string;
    public password: string;
    public instanceUrl: string;
    public access_token: string;
    public successMessage: string;
    public staticAlertClosed: boolean;
    alertMessage = '';


    isActive(currentRoute: any[], exact = true): boolean {
       
        return this.router.isActive(this.router.createUrlTree(currentRoute), exact);
    }


    public ngOnInit(): void {
        this.onChangeTable(this.config);
        this.getUsers();
    }


    getUsers(){

        console.log("getting users");

        this.webAccess.getUsers().map(res => res.json()).subscribe(
            res => {
                console.log(res);
                
                this.data = res;
                this.onChangeTable(this.config);


            },
            err => {
                console.log(err);
            })
    }

    public changePage(page: any, data: Array<any> = this.data): Array<any> {
        console.log(page);
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

    public changeSort(data: any, config: any): any {
        if (!config.sorting) {
            return data;
        }

        let columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '') {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }

        if (!columnName) {
            return data;
        }

        // simple sorting
        return data.sort((previous: any, current: any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }

    public changeFilter(data: any, config: any): any {
        if (!config.filtering) {
            return data;
        }

        let filteredData: Array<any> = data.filter((item: any) =>
            item[config.filtering.columnName].match(this.config.filtering.filterString));

        return filteredData;
    }

    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }

    public addNew(){
        console.log("adding new");
        this.router.navigateByUrl('/register');

    }

}
