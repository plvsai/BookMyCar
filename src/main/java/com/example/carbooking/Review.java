package com.example.carbooking;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Review {
    public Review() {
    }

    private @Id
    @GeneratedValue
    Long review_id;
    int booking_id;
    private String review_text;
    private int stars;
    private int attachments;

    public Review(int booking_id, String review_text, int stars, int attachments) {
        this.booking_id = booking_id;
        this.review_text = review_text;
        this.stars = stars;
        this.attachments = attachments;
    }

    public int getBooking_id() {
        return booking_id;
    }

    public void setBooking_id(int booking_id) {
        this.booking_id = booking_id;
    }

    public String getReview_text() {
        return review_text;
    }

    public void setReview_text(String review_text) {
        this.review_text = review_text;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

    public int getAttachments() {
        return attachments;
    }

    public void setAttachments(int attachments) {
        this.attachments = attachments;
    }
}