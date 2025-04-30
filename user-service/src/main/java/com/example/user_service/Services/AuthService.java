package com.example.user_service.Services;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.user_service.JwtUtil;
import com.example.user_service.UserRepository;
import com.example.user_service.Entity.User;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public Mono<String> register(String email, String password) {
        return userRepository.findByEmail(email)
                .flatMap(existingUser -> Mono.<String>error(new RuntimeException("User already exists")))
                .switchIfEmpty(Mono.defer(() -> {
                    User user = new User(null, email, passwordEncoder.encode(password));
                    return userRepository.save(user)
                            .flatMap(savedUser -> Mono.just(jwtUtil.generateToken(savedUser.getId())));
                }));
    }
    public Mono<String> login(String email, String password) {
        return userRepository.findByEmail(email)
                .switchIfEmpty(Mono.error(new RuntimeException("User not found")))
                .flatMap(user -> {
                    if (!passwordEncoder.matches(password, user.getPassword())) {
                        return Mono.error(new RuntimeException("Invalid credentials"));
                    }
                    return Mono.just(jwtUtil.generateToken(user.getId())); 
                });
    }
    
    

}
