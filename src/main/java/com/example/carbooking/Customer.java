package com.example.carbooking;

import org.springframework.data.repository.CrudRepository;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Customer extends User {
    private @Id
    @GeneratedValue
    int id;
    private boolean verification_status;
    public Customer(int user_id, String password, String name, int age, String email_id) {
        super(user_id, password, name, age, email_id);
        verification_status = false;
    }
}