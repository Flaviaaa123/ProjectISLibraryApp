package com.example.demo.controller;

import com.example.demo.EmailSenderService;
import com.example.demo.model.CartItem;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CartItemController {

  String currentUserEmail;

  private final EmailSenderService emailSenderService;

  public CartItemController(EmailSenderService emailSenderService) {
    this.emailSenderService = emailSenderService;
  }

  @PostMapping("/save")
  public void saveEmail(@RequestBody String value){
    currentUserEmail = value;
  }

  @PostMapping("/cart")
  public void checkout(@RequestBody Set<CartItem> products) {
    emailSenderService.sendEmail(
      currentUserEmail,
      "Multumim pentru comanda plasata!",
      products.toString()
    );
  }
}
