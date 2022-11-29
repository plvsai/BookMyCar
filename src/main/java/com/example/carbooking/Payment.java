package com.example.carbooking;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Payment {
    public Payment() {
    }

    private @Id
    @GeneratedValue

    Long payment_id;

    public Payment( int user_id, String banking_account, String details) {
        this.user_id = user_id;
        this.banking_account = banking_account;
        this.details = details;
    }

    private int user_id;
    private String banking_account;
    private String details;

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getBanking_account() {
        return banking_account;
    }

    public void setBanking_account(String banking_account) {
        this.banking_account = banking_account;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
