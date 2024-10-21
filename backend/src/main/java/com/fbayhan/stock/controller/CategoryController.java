package com.fbayhan.stock.controller;

import com.fbayhan.stock.dto.requestdto.CategoryRequest;
import com.fbayhan.stock.dto.responsedto.CategoryResponse;
import com.fbayhan.stock.mapper.CategoryMapper;
import com.fbayhan.stock.mapper.CategoryMapperImpl;
import com.fbayhan.stock.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;


    @PostMapping("/category")
    public ResponseEntity<CategoryResponse> category(@RequestBody CategoryRequest request) {
        return ResponseEntity.ok(categoryService.category(request));
    }

    @GetMapping("/getbyid/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Long id) {
        CategoryResponse categoryResponse = categoryService.getCategoryById(id);
        System.out.println(id);
        return ResponseEntity.ok(categoryResponse);
    }

    @GetMapping("/allcategories")
    public ResponseEntity<List<CategoryResponse>> getAllCategories(){
        List<CategoryResponse> categoryResponses=categoryService.categories();
        return ResponseEntity.ok(categoryResponses);
    }
}
