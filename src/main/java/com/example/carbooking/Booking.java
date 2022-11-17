package com.example.carbooking;

import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
@Entity
public class Booking {
    private @Id
    @GeneratedValue
    int booking_id;
    public Booking() {
    }

    private int user_id;
    private int vehicle_id;
    private String booking_start_date;
    private String booking_end_date;
    private int cost;

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getVehicle_id() {
        return vehicle_id;
    }

    public void setVehicle_id(int vehicle_id) {
        this.vehicle_id = vehicle_id;
    }

    public String getBooking_start_date() {
        return booking_start_date;
    }

    public void setBooking_start_date(String booking_start_date) {
        this.booking_start_date = booking_start_date;
    }

    public String getBooking_end_date() {
        return booking_end_date;
    }

    public void setBooking_end_date(String booking_end_date) {
        this.booking_end_date = booking_end_date;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Booking(int user_id, int vehicle_id, String booking_start_date, String booking_end_date, int cost) {
        this.user_id = user_id;
        this.vehicle_id = vehicle_id;
        this.booking_start_date = booking_start_date;
        this.booking_end_date = booking_end_date;
        this.cost = cost;
        this.status = "NOT COMPLETED";
    }

    private String status;
}
