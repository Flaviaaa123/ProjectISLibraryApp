package com.example.demo.controller;

import com.example.demo.repository.UserRepo;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    public UserRepo userRepo;

    @PostMapping("/user")
    public ResponseEntity<?> registerUser(@RequestBody User userData){
        User user = userRepo.findByEmail(userData.getEmail());
        if (user == null) {
            return ResponseEntity.ok(userRepo.save(userData));
        }
        return (ResponseEntity<?>) ResponseEntity.internalServerError();
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody User userData){
        User user = userRepo.findByEmail(userData.getEmail());
        if (user.getPassword().equals((userData.getPassword()))){
            return ResponseEntity.ok(user);
        }
        return (ResponseEntity<?>) ResponseEntity.internalServerError();

    }

}
