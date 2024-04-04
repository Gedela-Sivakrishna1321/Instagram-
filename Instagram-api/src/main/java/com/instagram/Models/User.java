package com.instagram.Models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.instagram.UserDto.*;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	private String username;
	private String name;
	private String password;
	private String email;
	private String mobile;
	private String bio;
	private String image;
	private String gender;
	private String website;

	@Embedded
	@ElementCollection
	private Set<UserDto> follower = new HashSet<>();

	@Embedded
	@ElementCollection
	private Set<UserDto> following = new HashSet<>();

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Story> stories = new ArrayList<>();

	@ManyToMany
	private List<Post> savedPost = new ArrayList<>();

	public User(Integer id, String username, String name, String password, String email, String mobile, String bio,
			String image, String gender, String website, Set<UserDto> follower, Set<UserDto> following,
			List<Story> stories, List<Post> savedPost) {
		super();
		this.id = id;
		this.username = username;
		this.name = name;
		this.password = password;
		this.email = email;
		this.mobile = mobile;
		this.bio = bio;
		this.image = image;
		this.gender = gender;
		this.website = website;
		this.follower = follower;
		this.following = following;
		this.stories = stories;
		this.savedPost = savedPost;
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
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}
	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * @return the mobile
	 */
	public String getMobile() {
		return mobile;
	}
	/**
	 * @param mobile the mobile to set
	 */
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	/**
	 * @return the bio
	 */
	public String getBio() {
		return bio;
	}
	/**
	 * @param bio the bio to set
	 */
	public void setBio(String bio) {
		this.bio = bio;
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
	 * @return the gender
	 */
	public String getGender() {
		return gender;
	}
	/**
	 * @param gender the gender to set
	 */
	public void setGender(String gender) {
		this.gender = gender;
	}
	/**
	 * @return the website
	 */
	public String getWebsite() {
		return website;
	}
	/**
	 * @param website the website to set
	 */
	public void setWebsite(String website) {
		this.website = website;
	}
	/**
	 * @return the follower
	 */
	public Set<UserDto> getFollower() {
		return follower;
	}
	/**
	 * @param follower the follower to set
	 */
	public void setFollower(Set<UserDto> follower) {
		this.follower = follower;
	}
	/**
	 * @return the following
	 */
	public Set<UserDto> getFollowing() {
		return following;
	}
	/**
	 * @param following the following to set
	 */
	public void setFollowing(Set<UserDto> following) {
		this.following = following;
	}
	/**
	 * @return the stories
	 */
	public List<Story> getStories() {
		return stories;
	}
	/**
	 * @param stories the stories to set
	 */
	public void setStories(List<Story> stories) {
		this.stories = stories;
	}
	/**
	 * @return the savedPost
	 */
	public List<Post> getSavedPost() {
		return savedPost;
	}
	/**
	 * @param savedPost the savedPost to set
	 */
	public void setSavedPost(List<Post> savedPost) {
		this.savedPost = savedPost;
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", name=" + name + ", password=" + password + ", email="
				+ email + ", mobile=" + mobile + ", bio=" + bio + ", image=" + image + ", gender=" + gender
				+ ", website=" + website + ", follower=" + follower + ", following=" + following + ", stories="
				+ stories + ", savedPost=" + savedPost + "]";
	}

	


}
