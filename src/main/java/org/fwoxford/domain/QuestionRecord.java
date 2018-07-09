package org.fwoxford.domain;

import java.time.LocalDate;

/**
 * Created by gengluying on 2018/7/5.
 */
public class QuestionRecord {
    private Long id;

    private String questionCode;

    private String projectCode;

    private String projectName;

    private Long authorId;

    private String author;

    private LocalDate occurDate;

    private String questionTypeCode;
    private String questionSummary;

    private String questionDescription;

    private String replyPerson;

    private LocalDate replyDate;

    private String relatedAgency;

    private Long relatedAgencyId;

    private String status;

    private String memo;

    private Long projectId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getQuestionCode() {
        return questionCode;
    }

    public void setQuestionCode(String questionCode) {
        this.questionCode = questionCode;
    }
    public String getProjectCode() {
        return projectCode;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }
    public String getProjectName() {
        return projectName;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
    public LocalDate getOccurDate() {
        return occurDate;
    }

    public void setOccurDate(LocalDate occurDate) {
        this.occurDate = occurDate;
    }

    public String getQuestionTypeCode() {
        return questionTypeCode;
    }

    public void setQuestionTypeCode(String questionTypeCode) {
        this.questionTypeCode = questionTypeCode;
    }

    public String getQuestionSummary() {
        return questionSummary;
    }

    public void setQuestionSummary(String questionSummary) {
        this.questionSummary = questionSummary;
    }
    public String getQuestionDescription() {
        return questionDescription;
    }

    public void setQuestionDescription(String questionDescription) {
        this.questionDescription = questionDescription;
    }
    public String getReplyPerson() {
        return replyPerson;
    }

    public void setReplyPerson(String replyPerson) {
        this.replyPerson = replyPerson;
    }
    public LocalDate getReplyDate() {
        return replyDate;
    }

    public void setReplyDate(LocalDate replyDate) {
        this.replyDate = replyDate;
    }
    public String getRelatedAgency() {
        return relatedAgency;
    }

    public void setRelatedAgency(String relatedAgency) {
        this.relatedAgency = relatedAgency;
    }
    public Long getRelatedAgencyId() {
        return relatedAgencyId;
    }

    public void setRelatedAgencyId(Long relatedAgencyId) {
        this.relatedAgencyId = relatedAgencyId;
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }
}
