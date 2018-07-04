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
    questionType: any[] = [
        {value: '2301', label: '样本问题'},
        {value: '2302', label: '其他问题'}
    ];
    constructor() { }

    getStatusName(statusCode) {
        const _allStatusOfLabel = _.union(
            this.processOptions,
            this.questionType
        );
        return (_.find(_allStatusOfLabel, {value: statusCode + ''}) || {}).label;
    }
}
