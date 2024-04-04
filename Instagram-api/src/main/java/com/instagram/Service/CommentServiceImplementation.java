package com.instagram.Service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagram.Exceptions.CommentException;
import com.instagram.Exceptions.PostException;
import com.instagram.Exceptions.UserException;
import com.instagram.Models.Comment;
import com.instagram.Models.Post;
import com.instagram.Models.User;
import com.instagram.Repository.CommentRepository;
import com.instagram.Repository.PostRepository;
import com.instagram.UserDto.UserDto;

@Service
public class CommentServiceImplementation implements CommentService {
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PostRepository postRepository;

	@Override
	public Comment createComment(Comment comment, Integer postId, Integer userId) throws UserException, PostException {
		
		User user = userService.findUserById(userId);
		
		Post post = postService.findPostById(postId);
		
		UserDto userDto = new UserDto();
		
		userDto.setEmail(user.getEmail());
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setUserImage(user.getImage());
		userDto.setUsername(user.getUsername());
		
		comment.setUser(userDto);
		comment.setCreatedAt(LocalDateTime.now());
		
		Comment createdComment = commentRepository.save(comment);
		
		post.getComments().add(comment);
		
		postRepository.save(post);
		
		
		
		return createdComment;
	}

	@Override
	public Comment findCommentById(Integer commentId) throws CommentException {
		
		Optional<Comment> optional = commentRepository.findById(commentId);
		
		if(optional.isPresent()) {
			return optional.get();
		}
		
		throw new CommentException("Comment doesn't exist with id : "+commentId);
	}

	@Override
	public Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException {
	
		Comment comment = findCommentById(commentId);
		User user = userService.findUserById(userId);
		
		UserDto userDto = new UserDto();
		
		userDto.setEmail(user.getEmail());
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setUserImage(user.getImage());
		userDto.setUsername(user.getUsername());
		
		comment.getLikedByUsers().add(userDto);
		
		return commentRepository.save(comment);
	}

	@Override
	public Comment unlikeComment(Integer commentId, Integer userId) throws CommentException, UserException {
		Comment comment = findCommentById(commentId);
		User user = userService.findUserById(userId);
		
		UserDto userDto = new UserDto();
		
		userDto.setEmail(user.getEmail());
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setUserImage(user.getImage());
		userDto.setUsername(user.getUsername());
		
		comment.getLikedByUsers().remove(userDto);
		
		return commentRepository.save(comment);
	}

}
