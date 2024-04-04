package com.instagram.Models;

import java.time.LocalDateTime;

import org.antlr.v4.runtime.misc.NotNull;

import com.instagram.UserDto.*;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
//import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "Stories")
public class Story {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Embedded
	@AttributeOverrides({
		@AttributeOverride(name="id", column = @Column(name="user_id")),
		@AttributeOverride(name = "email", column = @Column(name = "user_email"))
	})
	private UserDto user;

	@NotNull // Because Story should not be null
	private String image;
	private String caption;
	private LocalDateTime timestamp;



	public Story() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Story(Integer id, UserDto user, String image, String caption, LocalDateTime timestamp) {
		super();
		this.id = id;
		this.user = user;
		this.image = image;
		this.caption = caption;
		this.timestamp = timestamp;
	}


	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}


	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}


	/**
	 * @return the user
	 */
	public UserDto getUser() {
		return user;
	}


	/**
	 * @param user the user to set
	 */
	public void setUser(UserDto user) {
		this.user = user;
	}


	/**
	 * @return the image
	 */
	public String getImage() {
		return image;
	}


	/**
	 * @param image the image to set
	 */
	public void setImage(String image) {
		this.image = image;
	}


	/**
	 * @return the caption
	 */
	public String getCaption() {
		return caption;
	}


	/**
	 * @param caption the caption to set
	 */
	public void setCaption(String caption) {
		this.caption = caption;
	}


	/**
	 * @return the timestamp
	 */
	public LocalDateTime getTimestamp() {
		return timestamp;
	}


	/**
	 * @param timestamp the timestamp to set
	 */
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}





}
