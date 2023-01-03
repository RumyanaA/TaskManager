package com.example.TaskManager.controllers;

import com.example.TaskManager.services.UserService;
import com.example.TaskManager.interfaces.UserLoginData;
import com.example.TaskManager.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService studentService) {
        this.userService = studentService;
    }

    @PostMapping("registration")
    public Long addNewUser(@RequestBody Users user) {
        return userService.addNewUser(user);
    }

    @GetMapping("login")
    public UserLoginData getUser(@RequestParam String email, String password) {
        return userService.getUser(email, password);
    }
}
