package com.fbayhan.stock.repository;

import com.fbayhan.stock.model.Category;
import com.fbayhan.stock.token.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository  extends JpaRepository<Category, Long> {

    List<Category> findCategoryByCategoryNameLike(String searchText);
}
