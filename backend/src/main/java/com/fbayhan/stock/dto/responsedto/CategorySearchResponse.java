package com.fbayhan.stock.dto.responsedto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategorySearchResponse {
    private Long categoryId;
    private String categoryName;
    private Long upperCategoryId;
}
