package com.fbayhan.stock.controller;

import com.fbayhan.stock.dto.requestdto.ItemRequest;
import com.fbayhan.stock.dto.responsedto.ItemResponse;
import com.fbayhan.stock.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/item")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/item")
    public ResponseEntity<ItemResponse> item(@RequestBody ItemRequest request) {
        return ResponseEntity.ok(itemService.item(request));
    }

    /*
     @PostMapping("/category")
    public ResponseEntity<CategoryResponse> category(@RequestBody CategoryRequest request) {
        return ResponseEntity.ok(categoryService.category(request));
    }
     */
}
