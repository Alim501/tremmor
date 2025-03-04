package com.example.user_service;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;

    @NotNull(message = "Почта - обязательное значение")
    private String email;

    @NotNull(message = "Пароль - обязательное значение")
    private String password;
}
