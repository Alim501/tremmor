package com.example.user_service.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.user_service.Services.AuthService;
import reactor.core.publisher.Mono;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public Mono<ResponseEntity<TokenResponse>> register(@RequestBody AuthRequest request) {
        return authService.register(request.getEmail(), request.getPassword())
                .map(token -> ResponseEntity.ok(new TokenResponse((String) token)))
                .onErrorResume(e -> Mono.just(
                        ResponseEntity.badRequest().build()));
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<TokenResponse>> login(@RequestBody AuthRequest request) {
        return authService.login(request.getEmail(), request.getPassword())
                .map(token -> ResponseEntity.ok(new TokenResponse(token)))
                .onErrorResume(e -> Mono.just(
                        ResponseEntity.badRequest().build())); // Обработка
                                                               // ошибок
    }
}

@Data
class AuthRequest {
    private String email;
    private String password;
}

class TokenResponse {
    private String token;

    public TokenResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}