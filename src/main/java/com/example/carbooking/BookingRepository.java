package com.example.carbooking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.RestController;

public interface BookingRepository extends CrudRepository<Booking, Long>,BookingRepositoryCustom {

}
