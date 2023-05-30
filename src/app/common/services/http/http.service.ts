import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    url = environment.apiUrl;

    constructor(private httpService: HttpClient) { }

    test() {
        return this.httpService.get(this.url);
    }

    appData() {
        return this.httpService.get(this.url + 'frontend');
    }
}
