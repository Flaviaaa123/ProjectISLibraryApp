package com.example.demo.dto;

import com.example.demo.model.Book;
import org.apache.tomcat.util.codec.binary.Base64;
import org.apache.tomcat.util.codec.binary.StringUtils;

import java.io.Serializable;

public class BookDto implements Serializable {
  private String title;
  private String author;
  private int nrOfPages;
  private int price;
  private String description;
  private String image;

  public BookDto(Book book) {
    this.title = book.getTitle();
    this.author = book.getAuthor();
    this.nrOfPages = book.getNrOfPages();
    this.price = book.getPrice();
    this.description = book.getDescription();
    var x = Base64.encodeBase64(book.getImage(), false);
    this.image = StringUtils.newStringUtf8(x);
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  public int getNrOfPages() {
    return nrOfPages;
  }

  public void setNrOfPages(int nrOfPages) {
    this.nrOfPages = nrOfPages;
  }

  public int getPrice() {
    return price;
  }

  public void setPrice(int price) {
    this.price = price;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }
}
