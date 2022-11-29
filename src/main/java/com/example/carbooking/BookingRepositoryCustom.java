package com.example.carbooking;

import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public interface BookingRepositoryCustom {
    String niggaMethod(String arg);
}

