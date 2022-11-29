package com.example.carbooking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BookingController {
    @Autowired
    private BookingRepository bookingRepository;

    @RequestMapping("/booking/filter")
    public Iterable<Booking> getTest() {
        System.out.println("CALLLLED...");
        return bookingRepository.findAll();
    }
}
