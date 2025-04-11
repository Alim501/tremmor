package com.example.user_service.Dtos;

import com.example.user_service.Entity.Task;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponseDto {
    private String id;
    private String email;
    private Task[] tasks;
}
