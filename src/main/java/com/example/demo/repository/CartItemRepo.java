package com.example.demo.repository;

import com.example.demo.model.Book;
import com.example.demo.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepo extends JpaRepository<Book,String> {
}
