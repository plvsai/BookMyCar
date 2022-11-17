package com.example.carbooking;

import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Service
public class VehicleService {
    private static Map<String, Vehicle> vehicleRepo = new HashMap<>();
    public Collection<Vehicle> retrieve_Vehicle(int vehicle_id, String vehicle_model, String vehicle_class){
        return vehicleRepo.values();
    }
    public Collection<Vehicle> retrieve_Specific(int vehicle_id){
        return vehicleRepo.values();
    }
}
