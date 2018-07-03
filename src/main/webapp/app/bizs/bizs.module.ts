import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { QuestionComponent } from './question/question.component';
import { BizState } from './bizs.routing';
import { NgSelectizeModule} from 'ng-selectize';
import { BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule  } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import {
    QuestionAccreditComponent,
    QuestionDetailComponent,
    QuestionHistoryComponent,
    QuestionDetailModalComponent,
    QuestionHistoryDescModalComponent,
    QuestionService,
    CommonService,
    PromptModalComponent
} from './';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        DataTablesModule,
        RouterModule.forChild(BizState),
        CommonModule,
        NgSelectizeModule,
        FormsModule,
        NgbAccordionModule,
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
        QuestionHistoryComponent,
        QuestionDetailModalComponent,
        QuestionHistoryDescModalComponent,
        PromptModalComponent
    ],
    entryComponents: [
        QuestionDetailModalComponent,
        QuestionHistoryDescModalComponent,
        PromptModalComponent
    ],
    providers: [
        QuestionService,
        CommonService
    ]
})
export class  GwBbisStrangerPortalBizsModule { }
