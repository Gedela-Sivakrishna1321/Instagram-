package com.instagram.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.Exceptions.StoryException;
import com.instagram.Exceptions.UserException;
import com.instagram.Models.Story;
import com.instagram.Models.User;
import com.instagram.Service.PostService;
import com.instagram.Service.StoryService;
import com.instagram.Service.UserService;

@RestController
@RequestMapping("/api/stories")
public class StoryController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private StoryService storyService;
	
	@PostMapping("/create")
	public ResponseEntity<Story> createStoryHandler(@RequestBody Story story, @RequestHeader("Authorization") String token ) throws UserException {
		
		User user = userService.findUserProfile(token);
		
		Story createdStory = storyService.createStory(story, user.getId());
		
		return new ResponseEntity<Story>(createdStory, HttpStatus.OK);
		
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<List<Story>> findAllStoryByUserIdHandler(@PathVariable Integer userId) throws UserException, StoryException {
	//	User user = userService.findUserById(userId);
		List<Story> stories = storyService.findAllStoryByUserId(userId);
		
		return new ResponseEntity<List<Story>>(stories, HttpStatus.OK);
	}

}
