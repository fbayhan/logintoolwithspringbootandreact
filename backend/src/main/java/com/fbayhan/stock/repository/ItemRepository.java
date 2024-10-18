package com.fbayhan.stock.repository;

import com.fbayhan.stock.model.Item;
import com.fbayhan.stock.token.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
}
