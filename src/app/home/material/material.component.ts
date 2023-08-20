import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/services/common/common.service';
import { HttpService } from 'src/app/common/services/http/http.service';

@Component({
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrls: ['./material.component.scss'],
})
export class MaterialComponent implements OnInit {

    materialData: any[] = [];

    constructor(private httpService: HttpService, private commonService: CommonService) { }

    ngOnInit() { 
        this.getMaterial();
    }

    getMaterial(): void {
        this.httpService.getMaterial(this.commonService.getLocalStorageData('id')).subscribe((data: any) => {
            if (data) {
                this.materialData = data.data;
            }
        });
    }

}
