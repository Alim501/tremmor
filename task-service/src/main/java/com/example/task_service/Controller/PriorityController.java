package com.example.task_service.Controller;

import com.example.task_service.Entity.Priority;
import com.example.task_service.Service.PriorityService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks/priority")
@RequiredArgsConstructor
public class PriorityController {
    private final PriorityService priorityService;

    @PostMapping
    public Priority createPriority(@RequestBody Priority priority,
            @RequestHeader(value = "X-User-ID", required = false) String userId) {
        return priorityService.createPriorityk(priority, userId);
    }

    @GetMapping
    public List<Priority> getAllTasks(@RequestHeader(value = "X-User-ID", required = false) String userId) {
        return priorityService.getAllPriority(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Priority> getTaskById(@PathVariable("id") Long id) {
        return priorityService.getPriorityById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Priority> updatePriority(
            @PathVariable("id") Long id,
            @RequestHeader(value = "X-User-ID", required = false) String userId,
            @RequestBody Priority priorityDetails) {
        return priorityService.updatePriority(id, priorityDetails)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePriority(
            @PathVariable("id") Long id,
            @RequestHeader(value = "X-User-ID", required = false) String userId) {
        if (priorityService.deletePriority(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
