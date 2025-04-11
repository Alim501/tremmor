package com.example.user_service.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.user_service.Dtos.UserResponseDto;
import com.example.user_service.Services.UserService;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping("/{id}")
    public UserResponseDto getUserByID(@PathVariable("id") String id){
        return userService.getUser(id);
    }
}

