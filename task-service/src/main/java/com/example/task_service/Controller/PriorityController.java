package com.example.task_service.Controller;

import com.example.task_service.Entity.Priority;
import com.example.task_service.Service.PriorityService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/tasks/priority")
@RequiredArgsConstructor
public class PriorityController {
    private final PriorityService priorityService;

    @PostMapping
    public Mono<Priority> createPriority(@RequestBody Priority priority,
                                         @RequestHeader(value = "X-User-ID", required = false) String userId) {
        return priorityService.createPriority(priority, userId);
    }

    @GetMapping
    public Flux<Priority> getAllTasks(@RequestHeader(value = "X-User-ID", required = false) String userId) {
        return priorityService.getAllPriority(userId);
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Priority>> getTaskById(@PathVariable("id") Long id) {
        return priorityService.getPriorityById(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Priority>> updatePriority(
            @PathVariable("id") Long id,
            @RequestHeader(value = "X-User-ID", required = false) String userId,
            @RequestBody Priority priorityDetails) {
        return priorityService.updatePriority(id, priorityDetails)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Object>> deletePriority(
            @PathVariable("id") Long id,
            @RequestHeader(value = "X-User-ID", required = false) String userId) {
        return priorityService.deletePriority(id)
                .then(Mono.just(ResponseEntity.noContent().build()))
                .onErrorResume(_ -> Mono.just(ResponseEntity.notFound().build()));
    }
}
