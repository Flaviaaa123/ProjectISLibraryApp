package com.example.demo.service;

import com.example.demo.dto.UserDto;
import com.example.demo.exceptions.ApiExceptionResponse;
import com.example.demo.model.Email;
import com.example.demo.model.User;
import org.springframework.stereotype.Component;

@Component
public interface UserService {
  User registerUser(User userData) throws ApiExceptionResponse;
  User loginUser(UserDto userData) throws ApiExceptionResponse;
  Email getEmail(Email email) throws ApiExceptionResponse;
  String resetPassword(String pass) throws ApiExceptionResponse;
}
