package com.example.carbooking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final VehicleRepository repository;

    @Autowired
    public DatabaseLoader(VehicleRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Vehicle(  14442, "S","2001","Hyundai",4,7,"Elantra",false));
    }
}
