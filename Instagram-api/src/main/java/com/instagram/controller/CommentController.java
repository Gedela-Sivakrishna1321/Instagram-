package com.instagram.controller;

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

import com.instagram.Exceptions.CommentException;
import com.instagram.Exceptions.PostException;
import com.instagram.Exceptions.UserException;
import com.instagram.Models.Comment;
import com.instagram.Models.User;
import com.instagram.Service.CommentService;
import com.instagram.Service.UserService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

	@Autowired
	private CommentService commentService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/create/{postId}")
	public ResponseEntity<Comment> createCommentHandler(@RequestBody Comment comment, @PathVariable Integer postId, @RequestHeader("Authorization") String token ) throws UserException, PostException {
		
		User user = userService.findUserProfile(token);
		
		Comment createdComment = commentService.createComment(comment, postId, user.getId());
		
		return new ResponseEntity<Comment>(createdComment, HttpStatus.OK);
	}
	
	// Doubt ??
	@GetMapping("/{commentId}")
	public ResponseEntity<Comment> findCommentById(@PathVariable Integer commentId) throws  CommentException {
		
		Comment foundComment = commentService.findCommentById(commentId);
		
		return new ResponseEntity<Comment>(foundComment, HttpStatus.OK);
	}
	
	@PutMapping("/like/{commentId}")
	public ResponseEntity<Comment> likeCommentHandler(@PathVariable Integer commentId, @RequestHeader("Authorization") String token) throws UserException, CommentException {
		
		User user = userService.findUserProfile(token);
		
		Comment likedComment = commentService.likeComment(commentId, user.getId());
		
		return new ResponseEntity<Comment>(likedComment, HttpStatus.OK);
	}
	
	@PutMapping("/unlike/{commentId}")
	public ResponseEntity<Comment> unlikeCommentHandler(@PathVariable Integer commentId, @RequestHeader("Authorization") String token) throws UserException, CommentException {
		
		User user = userService.findUserProfile(token);
		
		Comment likedComment = commentService.unlikeComment(commentId, user.getId());
		
		return new ResponseEntity<Comment>(likedComment, HttpStatus.OK);
	}
	
}
