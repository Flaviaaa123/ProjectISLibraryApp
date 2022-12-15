package com.example.demo.controller;

import com.example.demo.dto.BookDto;
import com.example.demo.repository.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class BookController {

  @Autowired
  BookRepo bookRepo;

  @GetMapping("/findAllBooks")
  public List<BookDto> getBooks() {
    return bookRepo.findAll().stream().map(BookDto::new).toList();
  }

}
