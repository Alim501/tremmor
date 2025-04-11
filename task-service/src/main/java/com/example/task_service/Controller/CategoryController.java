package com.example.task_service.Controller;

import com.example.task_service.Entity.Category;
import com.example.task_service.Service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/tasks/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public Mono<Category> createCategory(@RequestBody Category task,
                                         @RequestHeader(value = "X-User-ID", required = false) String userId) {
        return categoryService.createCategory(task, userId);
    }

    @GetMapping
    public Flux<Category> getAllCategories(
            @RequestHeader(value = "X-User-ID", required = false) String userId) {
        return categoryService.getAllCategories(userId);
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Category>> getCategoryById(@PathVariable("id") Long id) {
        return categoryService.getCategoryById(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Category>> updateCategory(@PathVariable("id") Long id, 
                                                         @RequestBody Category categoryDetails,
                                                         @RequestHeader(value = "X-User-ID", required = false) String userId) {
        return categoryService.updateCategory(id, categoryDetails)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteCategory(@PathVariable("id") Long id,
                                                     @RequestHeader(value = "X-User-ID", required = false) String userId) {
        return categoryService.deleteCategory(id)
                .map(aBoolean -> aBoolean ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build());
    }
}
