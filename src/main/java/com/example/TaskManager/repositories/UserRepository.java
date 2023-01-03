package com.example.TaskManager.repositories;

import com.example.TaskManager.interfaces.UserLoginData;
import com.example.TaskManager.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    UserLoginData findOneByEmailAndPassword(String email, String password);
}
