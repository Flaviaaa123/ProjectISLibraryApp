package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@EnableAutoConfiguration
public class EmailSenderService {

  @Autowired
  private JavaMailSender mailSender;

  public void sendEmail(String toEmail, String subject, String body){
    try {
      SimpleMailMessage message = new SimpleMailMessage();
      message.setFrom("flaviaadrianamoldo@gmail.com");
      message.setTo(toEmail);
      message.setText(body);
      message.setSubject(subject);
      mailSender.send(message);
    }catch (Exception e){
      System.out.println(e.getMessage());
    }
  }
}
