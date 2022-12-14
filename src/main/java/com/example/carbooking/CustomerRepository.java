package com.example.carbooking;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import javax.transaction.Transactional;

@Transactional
public interface CustomerRepository extends UserRepository<Customer> {
}
