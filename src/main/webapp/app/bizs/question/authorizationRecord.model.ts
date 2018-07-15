export class AuthorizationRecord {
    public questionCode?: string;
    public authorizationCode?: string;
    public strangerEmail?: string;
    public httpUrl?: string;
    public strangerName?: string;
    public sendRecordId?: any;
    public idToken?: string;

    constructor(
        questionCode?: string,
        authorizationCode?: string,
        strangerEmail?: string,
        httpUrl?: string,
        strangerName?: string,
        sendRecordId?: any,
        idToken?: string
    ) {
        this.questionCode = questionCode ? questionCode : null;
        this.authorizationCode = authorizationCode ? authorizationCode : null;
        this.strangerEmail = strangerEmail ? strangerEmail : null;
        this.httpUrl = httpUrl ? httpUrl : null;
        this.strangerName = strangerName ? strangerName : null;
        this.sendRecordId = sendRecordId ? sendRecordId : null;
        this.idToken = idToken ? idToken : null;
    }
}
