import { Component ,PipeTransform} from '@angular/core';
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
import { DecimalPipe } from '@angular/common';

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
    private fullData: Array<any> = TableData;


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
        //this.onChangeTable(this.config);
        this.getUsers();
    }


    getUsers(){

        console.log("getting users");

        this.webAccess.getUsers().map(res => res.json()).subscribe(
            res => {
                console.log(res);
                
                this.data = res;
                this.fullData =res;
            },
            err => {
                console.log(err);
            })
    }
    
    public addNew(){
        console.log("adding new");
        this.router.navigateByUrl('/register');

    }

     public search(text: String) {
        return this.fullData.filter(userInfo => {
          const term = text.toLowerCase();
          return userInfo.name.toLowerCase().includes(term)
              || userInfo.shopName.toLowerCase().includes(term);
        });
      }

      public onSearchChange(text:String){
          console.log("value "+text);
          this.data = this.search(text);
          console.log(this.data);
      }

}
