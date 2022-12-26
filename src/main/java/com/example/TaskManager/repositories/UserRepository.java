package com.example.TaskManager.repositories;

import com.example.TaskManager.interfaces.UserLoginData;
import com.example.TaskManager.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    @Query("select u from Users u where u.email = ?1 and u.password = ?2")
    UserLoginData findUser(String email, String password);

}
