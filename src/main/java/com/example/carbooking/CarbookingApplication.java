package com.example.carbooking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@SpringBootApplication
public class CarbookingApplication {
	@CrossOrigin(origins = "http://localhost:8080")
	public static void main(String[] args) {
		SpringApplication.run(CarbookingApplication.class, args);
	}

}
