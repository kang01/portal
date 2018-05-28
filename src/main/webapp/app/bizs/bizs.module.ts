import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { QuestionComponent } from './question/question.component';
import { BizState } from './bizs.routing';
import { NgSelectizeModule} from 'ng-selectize';
import {
    QuestionAccreditComponent,
    QuestionDetailComponent,
    QuestionAnswerComponent,
    QuestionDetailModalComponent
} from './';
import { BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
    imports: [
        DataTablesModule,
        RouterModule.forChild(BizState),
        CommonModule,
        NgSelectizeModule,
        BlockUIModule.forRoot({
            message: 'loading……'
        }),
        ToastrModule.forRoot(
            {
                timeOut: 1000,
                positionClass: 'toast-top-right',
                preventDuplicates: true,
                progressBar: true
            }
        ),
    ],
    declarations: [
        QuestionComponent,
        QuestionAccreditComponent,
        QuestionDetailComponent,
        QuestionAnswerComponent,
        QuestionDetailModalComponent
    ],
    entryComponents: [
        QuestionDetailModalComponent
    ],
})
export class  GwBbisStrangerPortalBizsModule { }
