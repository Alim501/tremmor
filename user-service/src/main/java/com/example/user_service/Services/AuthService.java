package com.example.user_service.Services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.user_service.JwtUtil;
import com.example.user_service.UserRepository;
import com.example.user_service.Entity.User;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // Регистрация пользователя
    public Mono<String> register(String email, String password) {
        return userRepository.findByEmail(email)
                .flatMap(existingUser -> Mono.error(new RuntimeException("User already exists"))) // If user exists, throw error
                .switchIfEmpty(Mono.defer(() -> { // If user not found, create new one
                    User user = new User(null, email, passwordEncoder.encode(password)); // Create new user
                    return userRepository.save(user) // Save user and return Mono<User>
                            .flatMap(savedUser -> jwtUtil.generateToken(savedUser.getId())); // Generate token for saved user
                }));
    }
    

    // Логин пользователя
    public Mono<String> login(String email, String password) {
        return userRepository.findByEmail(email)
                .switchIfEmpty(Mono.error(new RuntimeException("User not found"))) // Если пользователя нет, ошибка
                .flatMap(user -> {
                    if (!passwordEncoder.matches(password, user.getPassword())) {
                        return Mono.error(new RuntimeException("Invalid credentials")); // Если пароли не совпадают,
                                                                                        // ошибка
                    }
                    return Mono.just(jwtUtil.generateToken(user.getId())); // Генерация токена
                });
    }
}
