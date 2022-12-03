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
     Long complaint_id;

    private int user_id;
    private String Complaint;

    public String getComplaint() {
        return Complaint;
    }

    public void setComplaint(String complaint) {
        Complaint = complaint;
    }

    public Complaints(int user_id,String Complaint) {
        this.user_id = user_id;this.Complaint=Complaint;

    }

    public int getUser_id() {

        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

}
