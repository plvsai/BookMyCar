package com.example.carbooking;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Admin extends User {
    private @Id
    @GeneratedValue
    Long id;

    public Admin(int user_id, String password, String name, int age, String email_id) {
        super(user_id,password,name,age,email_id);
    }

}
