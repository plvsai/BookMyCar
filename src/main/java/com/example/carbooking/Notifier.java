package com.example.carbooking;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Notifier {
    public Notifier() {
    }

    private @Id
    @GeneratedValue
            Long notifier_id;

    int booking_id;
    private int user_id;

    public Notifier(int booking_id, int user_id) {
        this.booking_id = booking_id;
        this.user_id = user_id;
    }

    public int getBooking_id() {
        return booking_id;
    }

    public void setBooking_id(int booking_id) {
        this.booking_id = booking_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}
