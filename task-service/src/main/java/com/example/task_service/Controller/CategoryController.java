package com.example.task_service.Controller;

import com.example.task_service.Entity.Category;
import com.example.task_service.Service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public Category createCategory(@RequestBody Category task,
            @RequestHeader(value = "X-User-ID", required = false) String userId) {
        return categoryService.createCategory(task, userId);
    }

    @GetMapping
    public List<Category> getAllCategories(
            @RequestHeader(value = "X-User-ID", required = false) String userId) {
        return categoryService.getAllCategories(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") Long id) {
        return categoryService.getCategoryById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") Long id, @RequestBody Category categoryDetails,
            @RequestHeader(value = "X-User-ID", required = false) String userId) {
        return categoryService.updateCategory(id, categoryDetails)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable("id") Long id,
            @RequestHeader(value = "X-User-ID", required = false) String userId) {
        if (categoryService.deleteTask(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
