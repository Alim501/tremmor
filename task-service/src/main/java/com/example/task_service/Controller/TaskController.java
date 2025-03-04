package com.example.task_service.Controller;

import com.example.task_service.Entity.Task;
import com.example.task_service.Service.TaskService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public Task createTask(@RequestBody Task taskDto,
            @RequestHeader(value = "X-User-ID", required = false) String userId) {
        return taskService.createTask(taskDto, userId);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getUserTasks(
            @RequestHeader(value = "X-User-ID", required = false) String userId) {

        if (userId == null) {
            throw new RuntimeException("X-User-ID header is missing");
        }
        System.out.println("userID: " + userId);

        List<Task> tasks = taskService.getAllTasks(userId);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable("id") Long id) {
        return taskService.getTaskById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable("id") Long id, @RequestBody Task taskDetails,
            @RequestHeader(value = "X-User-ID", required = false) String userId) {
        return taskService.updateTask(id, taskDetails, userId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable("id") Long id) {
        if (taskService.deleteTask(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
