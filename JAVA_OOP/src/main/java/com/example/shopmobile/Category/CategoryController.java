package com.example.shopmobile.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        return new ResponseEntity<>(categoryService.saveCategory(category), HttpStatus.CREATED);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryId) {
        if (categoryService.existsById(categoryId)) {
            categoryService.deleteById(categoryId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> editCategory(@PathVariable Long categoryId, @RequestBody Category category) {
        if (categoryService.existsById(categoryId)) {
            category.setId(categoryId);
            return new ResponseEntity<>(categoryService.saveCategory(category), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{categoryId}")
    public ResponseEntity<Category> updateIsShowHomeStatus(@PathVariable Long categoryId, @RequestBody Category categoryData) {
        if (categoryService.existsById(categoryId)) {
            return new ResponseEntity<>(categoryService.updateIsShowHomeStatus(categoryId, categoryData.getIsShowHome()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
