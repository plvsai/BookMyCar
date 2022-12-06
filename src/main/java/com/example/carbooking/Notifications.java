package com.example.carbooking;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Notifications {
    private @Id
    @GeneratedValue
    Long notification_id;
    private int user_id;
    private String title;
    private String text;

    public Notifications() {
    }

    public Notifications(int user_id, String title, String text) {
        this.user_id = user_id;
        this.title = title;
        this.text = text;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
