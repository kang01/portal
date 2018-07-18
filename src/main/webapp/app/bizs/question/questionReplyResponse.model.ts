export class QuestionReplyResponse {
    public id?: any;
    public replyContent?: string;
    public replyDetailsDTOList?: any[];

    constructor(
        id?: any,
        replyContent?: string,
        replyDetailsDTOList?:  any[],
    ) {
        this.id = id ? id : null;
        this.replyContent = replyContent ? replyContent : null;
        this.replyDetailsDTOList = replyDetailsDTOList ? replyDetailsDTOList : null;
    }
}
