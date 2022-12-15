package com.example.demo.controller;

import com.example.demo.dto.UserDto;
import com.example.demo.exceptions.ApiExceptionResponse;
import com.example.demo.model.Email;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

  @Autowired
  private UserService userService;

    @PostMapping("/user")
    public ResponseEntity<?> registerUser(@RequestBody User userData) throws ApiExceptionResponse {
      return ResponseEntity.status(HttpStatus.OK).body(userService.registerUser(userData));
    }

   @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDto userData) throws ApiExceptionResponse {
      return ResponseEntity.status(HttpStatus.OK).body(userService.loginUser(userData));
    }

    @PostMapping("/email")
    public ResponseEntity<?> getEmail(@RequestBody Email email) throws ApiExceptionResponse {
      return ResponseEntity.status(HttpStatus.OK).body(userService.getEmail(email));
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestBody String pass) throws ApiExceptionResponse {
      return ResponseEntity.status(HttpStatus.OK).body(userService.resetPassword(pass));
    }
}
