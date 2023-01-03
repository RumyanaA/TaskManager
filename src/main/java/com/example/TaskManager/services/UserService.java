package com.example.TaskManager.services;

import com.example.TaskManager.interfaces.UserLoginData;
import com.example.TaskManager.repositories.UserRepository;
import com.example.TaskManager.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Long addNewUser(Users user) {
        // handle exception when email exists
        userRepository.save(user);
        return user.getId();
    }

    public UserLoginData getUser(String email, String password) {
        return userRepository.findOneByEmailAndPassword(email, password);
    }

}