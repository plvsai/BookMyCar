package com.example.carbooking;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Complaints {
    public Complaints() {
    }

    private @Id
    @GeneratedValue
     int complaint_id;

    private int user_id;

    public Complaints(int user_id, int complaint_id) {
        this.user_id = user_id;
        this.complaint_id = complaint_id;
    }

    public int getUser_id() {

        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getComplaint_id() {
        return complaint_id;
    }

    public void setComplaint_id(int complaint_id) {
        this.complaint_id = complaint_id;
    }
}
