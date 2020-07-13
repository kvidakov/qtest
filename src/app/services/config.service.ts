import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    dialogOptions = {
        minWidth: '300px',
        closeOnNavigation: true
    };
    constructor() {}

}
