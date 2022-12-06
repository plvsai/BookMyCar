package com.example.carbooking;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Comment {
    private @Id
    @GeneratedValue
    Long comment_id;
    private int complaint_id;
    private String comment;

    public Comment() {
    }

    public Comment(int complaint_id, String comment) {
        this.complaint_id = complaint_id;
        this.comment = comment;
    }

    public int getComplaint_id() {
        return complaint_id;
    }

    public void setComplaint_id(int complaint_id) {
        this.complaint_id = complaint_id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
