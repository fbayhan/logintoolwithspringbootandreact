package com.fbayhan.stock.repository;

import com.fbayhan.stock.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    List<User> getByEmail(String email);

    List<User> getByEmailAndPassword(String email, String password);
}
