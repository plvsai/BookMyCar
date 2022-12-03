package com.example.carbooking;

import javax.persistence.*;

@Entity
public class Admin extends User {
    public Admin() {
    }

    public Admin( String password, String name, int age, String email_id) {
        super(password,name,age,email_id);
    }

}
