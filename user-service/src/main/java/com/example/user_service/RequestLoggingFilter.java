package com.example.user_service;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import org.springframework.web.util.ContentCachingRequestWrapper;

@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        if (request.getRequestURI().contains("/api/auth")) {
            ContentCachingRequestWrapper cachingRequest = new ContentCachingRequestWrapper(request);
            filterChain.doFilter(cachingRequest, response); // пропускаем дальше обертку вместо оригинала

            // После выполнения цепочки, тело можно достать из кэша
            String body = new String(cachingRequest.getContentAsByteArray(), StandardCharsets.UTF_8);
            System.out.println("Incoming request to " + request.getRequestURI() + " with body: " + body);
        } else {
            filterChain.doFilter(request, response); // обычный случай без кэширования
        }
    }

}
