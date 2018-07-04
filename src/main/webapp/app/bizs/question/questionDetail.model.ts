export class QuestionDetail {
    public id?: any;
    public author?: any;
    public questionTypeCode?: string;
    public occurDate?: Date;
    public projectCode?: string;
    public relatedAgency?: string;
    public expirationTime?: string;
    public applyTimes?: number;
    public status?: string;
    public questionSummary?: string;
    public replyContent?: string;
    public questionDescription?: string;
    public questionItemDTOList?: any[];

    constructor(
        id?: any,
        author?: any,
        questionTypeCode?: string,
        occurDate?: Date,
        projectCode?: string,
        relatedAgency?: string,
        expirationTime?: string,
        applyTimes?: number,
        status?: string,
        questionSummary?: string,
        replyContent?: string,
        questionDescription?: string,
        questionItemDTOList?: any[]
    ) {
        this.id = id ? id : null;
        this.author = author ? author : null;
        this.questionTypeCode = questionTypeCode ? questionTypeCode : null;
        this.occurDate = occurDate ? occurDate : null;
        this.projectCode = projectCode ? projectCode : null;
        this.relatedAgency = relatedAgency ? relatedAgency : null;
        this.expirationTime = expirationTime ? expirationTime : null;
        this.applyTimes = applyTimes ? applyTimes : null;
        this.status = status ? status : null;
        this.questionSummary = questionSummary ? questionSummary : null;
        this.replyContent = replyContent ? replyContent : null;
        this.questionDescription = questionDescription ? questionDescription : null;
        this.questionItemDTOList = questionItemDTOList ? questionItemDTOList : null;
    }
}
