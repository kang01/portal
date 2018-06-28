export class QuestionReply {
    public id?: any;
    public handleTypeCode?: string;
    public replyContent?: string;
    public questionItemDetailsId?: string;

    constructor(
        id?: any,
        handleTypeCode?: string,
        replyContent?: string,
        questionItemDetailsId?: string,
    ) {
        this.id = id ? id : null;
        this.handleTypeCode = handleTypeCode ? handleTypeCode : null;
        this.replyContent = replyContent ? replyContent : null;
        this.questionItemDetailsId = questionItemDetailsId ? questionItemDetailsId : null;
    }
}
