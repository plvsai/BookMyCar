package com.example.carbooking;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Vehicle {

    private @Id
    @GeneratedValue
    Long vehicle_id;
    private int v_mileage;
    private String v_class;
    private String v_model;
    private String v_manufacturer;
    private int v_capacity;
    private int v_condition;
    private String v_description;
    private boolean v_availability_status;

    public int getV_capacity() {
        return v_capacity;
    }



    public void setVehicle_id(Long vehicle_id) {
        this.vehicle_id = vehicle_id;
    }

    public int getV_condition() {
        return v_condition;
    }


    public void setV_capacity(int v_capacity) {
        this.v_capacity = v_capacity;
    }


    public Long getVehicle_id() {
        return vehicle_id;
    }

    public boolean isV_availability_status() {
        return v_availability_status;
    }


    public Vehicle(int v_mileage, String v_class, String v_model, String v_manufacturer, int v_capacity, int v_condition, String v_description, boolean v_availability_status) {
        this.vehicle_id = vehicle_id;
        this.v_mileage = v_mileage;
        this.v_class = v_class;
        this.v_model = v_model;
        this.v_manufacturer = v_manufacturer;
        this.v_capacity = v_capacity;
        this.v_condition = v_condition;
        this.v_description = v_description;
        this.v_availability_status = v_availability_status;
    }

    public void setV_condition(int v_condition) {
        this.v_condition = v_condition;
    }

    public int getV_mileage() {
        return v_mileage;
    }

    public void setV_mileage(int v_mileage) {
        this.v_mileage = v_mileage;
    }



    private Vehicle() {
    }



    public String getV_class() {
        return v_class;
    }

    public void setV_class(String v_class) {
        this.v_class = v_class;
    }

    public String getV_model() {
        return v_model;
    }

    public void setV_model(String v_model) {
        this.v_model = v_model;
    }

    public String getV_manufacturer() {
        return v_manufacturer;
    }

    public void setV_manufacturer(String v_manufacturer) {
        this.v_manufacturer = v_manufacturer;
    }

    @Override
    public String toString() {
        return "Car{" +
                "vehicle_id=" + vehicle_id +
                ", v_mileage=" + v_mileage +
                ", v_class='" + v_class + '\'' +
                ", v_model='" + v_model + '\'' +
                ", v_manufacturer='" + v_manufacturer + '\'' +
                ", v_capacity=" + v_capacity +
                ", v_condition=" + v_condition +
                ", v_description='" + v_description + '\'' +
                ", v_availability_status=" + v_availability_status +
                '}';
    }
}
