package com.example.carbooking;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class User {
    public User() {
    }
    private @Id
    @GeneratedValue
    Long id;
    int user_id;
    private String password;
    private String name;
    private int age;
    private String email_id;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail_id() {
        return email_id;
    }

    public void setEmail_id(String email_id) {
        this.email_id = email_id;
    }


    public User( String password, String name, int age, String email_id) {
        this.password = password;
        this.name = name;
        this.age = age;
        this.email_id = email_id;
    }
}
