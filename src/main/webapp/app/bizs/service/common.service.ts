import { Injectable } from '@angular/core';
import * as _ from 'lodash';
@Injectable()
export class CommonService {
    processOptions: any[] = [
        {
            label: '销毁样本',
            value: '2701',
        },
        {
            label: '样本正常',
            value: '2702',
        },
        {
            label: '延迟处理',
            value: '2703',
        }
    ];
    constructor() { }

    getStatusName(statusCode) {
        const _allStatusOfLabel = _.union(
            this.processOptions
        );
        return (_.find(_allStatusOfLabel, {value: statusCode + ''}) || {}).label;
    }
}
