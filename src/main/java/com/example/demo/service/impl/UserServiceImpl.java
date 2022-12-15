package com.example.demo.service.impl;

import com.example.demo.EmailSenderService;
import com.example.demo.dto.UserDto;
import com.example.demo.exceptions.ApiExceptionResponse;
import com.example.demo.model.Email;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

  PasswordEncoder passwordEncoder;
  String encodedPassword;
  public String currentEmail;
  private final EmailSenderService emailSenderService;

  public UserServiceImpl(EmailSenderService emailSenderService, UserRepo userRepo) {
    this.emailSenderService = emailSenderService;
    this.userRepo = userRepo;
    this.passwordEncoder = new BCryptPasswordEncoder();
  }

  @Autowired
  private UserRepo userRepo;

  public User registerUser(User userData) throws ApiExceptionResponse{
    encodedPassword = this.passwordEncoder.encode(userData.getPassword());
    userData.setPassword(encodedPassword);
    User user = userRepo.findByEmail(userData.getEmail());
    if (user != null) {
      throw ApiExceptionResponse.builder().errors(Collections.singletonList("Email already used!"))
        .message("Email already used!").status(HttpStatus.BAD_REQUEST).build();
    }
    userRepo.save(userData);
    return userData;
  }

  public User loginUser(UserDto userData) throws ApiExceptionResponse {
    User user = userRepo.findByEmail(userData.getEmail());
    if (!Objects.equals(user.getPassword(), encodedPassword)){
      throw ApiExceptionResponse.builder().errors(Collections.singletonList("Wrong email or password!"))
        .message("Wrong email or password").status(HttpStatus.NOT_FOUND).build();
    }
    return user;
  }

  public Email getEmail(Email email) throws ApiExceptionResponse {
    User user = userRepo.findByEmail(email.getEmail());
    if (user == null) {
      throw ApiExceptionResponse.builder().errors(Collections.singletonList("This email doesn't exist!"))
        .message("This email doesn't exist!").status(HttpStatus.NOT_FOUND).build();
    }
    currentEmail = email.getEmail();
    emailSenderService.sendEmail(email.getEmail(), "Reset password Library App","Please go to " +
      "following link to reset your password: http://localhost:4200/reset " +
      "\n Thank you!");
    return email;
  }

  public String resetPassword(String pass) throws ApiExceptionResponse {
    if(pass == null){
      throw ApiExceptionResponse.builder().errors(Collections.singletonList("No password entered"))
        .message("No password entered").status(HttpStatus.NOT_FOUND).build();
    }
    User user = userRepo.findByEmail(currentEmail);
    encodedPassword = this.passwordEncoder.encode(pass);
    user.setPassword(encodedPassword);
    user.setEmail(currentEmail);
    userRepo.save(user);
    return pass;
  }

}
