package com.example.carbooking;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@Transactional(readOnly = true)
public class BookingRepositoryImpl implements BookingRepositoryCustom {
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public String niggaMethod(String arg) {
        // here we execute query
        return "BRUHH";
    }
}
