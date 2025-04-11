package com.example.user_service.Services;


import org.springframework.stereotype.Service;

import com.example.user_service.UserRepository;
import com.example.user_service.Clients.TaskClient;
import com.example.user_service.Dtos.UserResponseDto;
import com.example.user_service.Entity.Task;
import com.example.user_service.Entity.User;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserService {
    private final TaskClient taskClient;
    private final UserRepository userRepository;

    public UserResponseDto getUser(String id) {
        Mono<Task[]> tasksMono = taskClient.getUserTasks(id);
        Mono<User> userMono = userRepository.findById(id);

        Mono<String> emailMono = userMono.map(User::getEmail);
        String email = emailMono.block();
        Task[] tasks = tasksMono.block();

        return new UserResponseDto(id, email, tasks);
    }
}