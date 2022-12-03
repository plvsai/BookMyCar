package com.example.carbooking;

import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

@Transactional
public interface AdminRepository  extends UserRepository<Admin> {
}
