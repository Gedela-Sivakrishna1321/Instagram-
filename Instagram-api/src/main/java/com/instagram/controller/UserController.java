package com.instagram.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.Exceptions.*;
import com.instagram.Models.*;
import com.instagram.Response.MessageResponse;
import com.instagram.Service.*;

@RestController
@RequestMapping("/instagram/api")
public class UserController {

	@Autowired
	UserService userService;

	

	@GetMapping("users/id/{id}")
	public ResponseEntity<User> findUserByIdHandler(@PathVariable Integer id) throws UserException {
		User user = userService.findUserById(id);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@GetMapping("/users/username/{username}")
	public ResponseEntity<User> findUserByUsernameHandler(@PathVariable String username) throws UserException {
		User user = userService.findUserByUsername(username);
		System.out.println(user);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@GetMapping("/users/ids/{userIds}")
	public ResponseEntity<List<User>> findUserByIdsHandler(@PathVariable List<Integer> userIds) throws UserException {
		List<User> users = userService.findUserByIds(userIds);
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	@GetMapping("/users/search/{query}")
	public ResponseEntity<List<User>> searchUserHandler(@PathVariable String query) throws UserException {
		List<User> users = userService.searchUser(query);
		return new ResponseEntity<>(users, HttpStatus.FOUND);
	}
	
	@PutMapping("/follow/{followUserId}")
	public ResponseEntity<MessageResponse> followUserHandler(@RequestHeader("Authorization") String token, @PathVariable Integer followUserId) throws UserException {
		
		User reqUser = userService.findUserProfile(token);
		
		String message = userService.followUser(reqUser.getId(), followUserId);
		
		
		return new ResponseEntity<MessageResponse>(new MessageResponse(message), HttpStatus.OK);
	}
	
	@PutMapping("/unfollow/{unfollowUserId}")
	public ResponseEntity<MessageResponse> unfollowUserHandler(@RequestHeader("Authorization") String token, @PathVariable Integer unfollowUserId) throws UserException {
		
		User reqUser = userService.findUserProfile(token);
		
		String message = userService.unFollowUser(reqUser.getId(), unfollowUserId);
		
		
		return new ResponseEntity<MessageResponse>(new MessageResponse(message), HttpStatus.OK);
	}

	@PutMapping("/account/edit")
	public ResponseEntity<User> updateUserHandler(@RequestHeader("Authorization") String token, @RequestBody User User) throws UserException {
		
		User reqUser = userService.findUserProfile(token);
		
		User updatedUser = userService.updateUserDetails(User,reqUser);
		
		return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
	}
	
	@GetMapping("/req")
	public ResponseEntity<User> findUserProfileHandler(@RequestHeader("Authorization") String token) throws UserException {
		
		User user = userService.findUserProfile(token);
		
		return new ResponseEntity<User>(user, HttpStatus.OK);
		
	}

}
