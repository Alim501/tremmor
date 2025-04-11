// package com.example.user_service.Clients;

// import org.springframework.cloud.openfeign.FeignClient;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestHeader;

// import com.example.user_service.Entity.Task;

// @FeignClient(name = "task-service")
// public interface TaskClient {
//     @GetMapping("/api/tasks")
//     Task[] getUserTasks(@RequestHeader("X-User-ID") String userId);
// }


package com.example.user_service.Clients;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.core.publisher.Mono;

import com.example.user_service.Entity.Task;

@Component
public class TaskClient {
    private final WebClient webClient;

    @Autowired
    public TaskClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("lb://task-service").build();  // URL для task-service
    }

    public Mono<Task[]> getUserTasks(String userId) {
        return webClient.get()
                .uri("/api/tasks")
                .header("X-User-ID", userId)
                .retrieve()
                .bodyToMono(Task[].class);
    }
}
