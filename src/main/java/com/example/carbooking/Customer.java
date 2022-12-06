package com.example.carbooking;

import org.springframework.data.repository.CrudRepository;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Customer extends User {

    private boolean verification_status;

    public boolean isVerification_status() {
        return verification_status;
    }

    public void setVerification_status(boolean verification_status) {
        this.verification_status = verification_status;
    }

    public Customer(){

    }
    public Customer( String password, String name, int age, String email_id) {
        super(password, name, age, email_id);
        verification_status = false;
    }
}
